const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 1 },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  body: { type: String, required: true, minLength: 1 },
  createdAt: { type: Date, required: true },
});

MessageSchema.virtual('date_formatted').get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('Message', MessageSchema);