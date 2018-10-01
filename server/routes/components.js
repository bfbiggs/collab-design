import express from 'express';
import Component from '../models/component';
import fetch from 'node-fetch';
import addOrUpdateComponent from '../tools/addOrUpdateComponent';
import combineComponentData from '../tools/combineComponentData';
import config from '../config';

// import mockComponent from '../mockData/component.json';
// import mockCodeComponent from '../mockData/codeComponent.json';
// import mockWpComponent from '../mockData/wpComponent.json';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      let components = await Component.find();
      res.json(components);
    } catch (err) {
      res.send(err);
    }
  })
  .post(async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        let responses = [];
        for (const component of req.body) {
          const response = await addOrUpdateComponent(component);
          responses.push(response);
        }
        res.json(responses);
      } else {
        const response = await addOrUpdateComponent(req.body);
        res.json(response);
      }
    } catch (err) {
      res.send(err);
    }
  });

router.route('/:component_id').get(async (req, res) => {
  try {
    const componentId = req.params.component_id;
    const wpFetch = await fetch(`${config.WP_CONTENT_URL}/${componentId}`);
    const wpComponent = await wpFetch.json();
    const codeComponent = await Component.findOne({ id: componentId });
    // const codeComponent = mockCodeComponent;
    // const wpComponent = mockWpComponent;
    const component = await combineComponentData(wpComponent, codeComponent);

    res.json(component);
  } catch (err) {
    res.send(err);
  }
});

export default router;
