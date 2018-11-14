import express from 'express';
import config from '../config';
import request from 'request-promise-native';
import formidable from 'formidable';
import fs from 'fs';

const router = express.Router();

router.route('/').post(async (req, res) => {
  let hasAttachment = false;
  try {
    const tokenOptions = {
      method: 'POST',
      url: `${config.WP_OAUTH_URL}`,
      qs: { oauth: 'token' },
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        grant_type: 'client_credentials',
        client_id: process.env.WP_CLIENT_ID,
        client_secret: process.env.WP_CLIENT_SECRET,
      },
      json: true,
    };

    const oAuth = await request(tokenOptions);
    const token = oAuth.access_token;

    const incomingForm = new formidable.IncomingForm();
    const imageForm = {};
    const feedbackBody = {};
    let fileName;

    incomingForm
      .parse(req)
      .on('field', (name, field) => {
        feedbackBody[name] = field;
      })
      .on('file', (name, file) => {
        fileName = file.name;
        imageForm.file = {
          value: fs.createReadStream(file.path),
          options: {
              filename: fileName,
              contentType: file.type
          }
        };

        hasAttachment = true;
      })
      .on('end', async () => {
        try {
          if (hasAttachment) {
            const imageUploadOptions = {
              method: 'POST',
              url: `${config.WP_URL}/wp-json/wp/v2/media`,
              headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
                processData: false,
                'Content-Disposition': `attachment; filename=${fileName}`,
              },
              formData: imageForm,
              json: true,
            };

            const uploadedImage = await request(imageUploadOptions);
            const imageUrl = uploadedImage.source_url;
            feedbackBody['9'] = imageUrl;
          }

          const formOptions = {
            method: 'POST',
            url: `${config.WP_FORMS_URL}/entries`,
            headers: {
              'Cache-Control': 'no-cache',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: feedbackBody,
            json: true,
          };

          const postForm = await request(formOptions);
          res.json(postForm);
        } catch (err) {
          res.send(err.message);
        }
      });
  } catch (err) {
    res.send(err.message);
  }
});

export default router;
