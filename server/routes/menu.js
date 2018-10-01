import express from 'express';
import mockMenu from '../mockData/menu.json';

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    res.json(mockMenu);
  } catch (err) {
    res.send(err);
  }
});

export default router;
