import express from 'express';
import fetch from 'node-fetch';
import config from '../config';

const router = express.Router();

router.route('/id/:id').get(async (req, res) => {
  try {
    const pageId = req.params.id;
    const wpFetch = await fetch(`${config.WP_CONTENT_URL}/${pageId}`);
    const wpPage = await wpFetch.json();
    res.json(wpPage);
  } catch (err) {
    res.send(err);
  }
});

router.route('/name/:slug').get(async (req, res) => {
  try {
    const pageSlug = req.params.slug;
    const wpFetch = await fetch(`${config.WP_CONTENT_URL}?slug=${pageSlug}`);
    const wpPage = await wpFetch.json();
    res.json(wpPage[0]);
  } catch (err) {
    res.send(err);
  }
});

export default router;
