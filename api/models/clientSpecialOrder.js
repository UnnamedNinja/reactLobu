const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Special Order Schema
//= ===============================
const ClientSpecialOrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true },
    orderType: { type: String, required: true },
    company: { type: String, required: true },
    assignmentNotice: { type: String, required: false },
    orderName: { type: String, required: true },
    contractor: { type: String }, // either will be supplied
    client: { type: String }, // either will be supplied
    creditNoteNumber: { type: String, required: true },
    article: { type: String },
    contractorValidFrom: { type: Date },
    contractorDateOfExpiry: { type: Date },
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

module.exports = mongoose.model('ClientSpecialOrder', ClientSpecialOrderSchema);
