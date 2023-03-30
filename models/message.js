const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 1 },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, minLength: 1 },
  createdAt: { type: Date, required: true },
});

module.exports = mongoose.model('Message', MessageSchema);