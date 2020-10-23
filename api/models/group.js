const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const GroupSchema = new Schema(
  {
    groupNumber: { type: Number, required: true },
    groupName: { type: String, required: true },
    company: { type: String, required: true },
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

module.exports = mongoose.model('Group', GroupSchema);
