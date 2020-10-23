const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// PersonComponent Schema
//= ===============================
const PersonComponentSchema = new Schema(
  {
    person: { type: String, required: false },
    calculation: { type: String, required: false },
    value: { type: String, required: false },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

module.exports = mongoose.model('PersonComponent', PersonComponentSchema);
