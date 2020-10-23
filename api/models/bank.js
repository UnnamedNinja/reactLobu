const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const BankSchema = new Schema(
  {
    bankNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    bankDescription: { type: String },
    accountNumber: { type: String, required: true },
    bankCode: { type: String, required: true },
    iban: { type: String, required: true },
    bic: { type: String, required: true },
    company: { type: String, required: true },
    companyId: { type: String, required: true },

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

module.exports = mongoose.model('Bank', BankSchema);
