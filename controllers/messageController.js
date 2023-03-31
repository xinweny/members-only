const { body, validationResult } = require('express-validator');

const Message = require('../models/message');

exports.list = async (req, res) => {
  const messages = await Message.find({}).populate('author');

  res.render('index', {
    messages,
  });
};

exports.getForm = (req, res) => { res.render('message_form'); };

exports.createMessage = [
  body('title').trim().escape(),
  body('body').trim().escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const message = new Message({
        title: req.body.title,
        body: req.body.body,
        author: req.user.id,
        createdAt: new Date(),
      });
  
      if (!errors.isEmpty()) {
        res.render('message_form', {
          message,
          errors: errors.array(),
        });
      }

      await message.save();
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },
];

exports.deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.redirect('/');
  } catch (err) {
    return next(err);
  }
};