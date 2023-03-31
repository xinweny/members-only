const Message = require('../models/message');

exports.list = async (req, res) => {
  const messages = await Message.find({}, 'title text');

  res.render('index', {
    messages,
  });
}