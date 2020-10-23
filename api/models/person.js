const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const PersonSchema = new Schema(
  {
    type: { type: String, required: true },
    isManager: { type: String, required: false },
    salutation: { type: String, required: true },
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    position: { type: String, required: false },
    department: { type: String, required: false },
    phone: { type: String, required: false },
    mobileNumber: { type: String, required: false },
    fax: { type: String, required: false },
    email: { type: String, required: false },
    comments: { type: String, required: false },
    // role: { type: Array },
    isAccountManager: { type: Boolean, required: false },
    commission: { type: String, required: false },
    calculation: { type: String, required: false },

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

module.exports = mongoose.model('Person', PersonSchema);
