const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.get('/', async (req, res) => {
  const messages = await Message.find({}, 'title text');

  res.render('index', {
    messages,
  });
});

module.exports = router;