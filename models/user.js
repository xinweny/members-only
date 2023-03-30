const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 100 },
  email: { type: String, required: true, minLength: 1 },
  password: { type: String, required: true },
  membership_status: {
    type: String,
    required: true,
    enum: ['non_member', 'member', 'admin'],
    default: 'non_member',
  },
});

UserSchema.virtual('full_name').get(function () {
  return `${this.first_name} ${this.last_name}`;
})