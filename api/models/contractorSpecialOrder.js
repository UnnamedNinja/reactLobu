const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Special Order Schema
//= ===============================
const ContractorSpecialOrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true },
    orderType: { type: String, required: true },
    company: { type: String, required: true },
    orderName: { type: String, required: true },
    contractor: { type: String, required: false },
    client: { type: String, required: false },
    assignmentNotice: { type: String, required: false },
    creditNoteNumber: { type: String, required: false },

    articles: {},

    article: { type: String, required: false },
    comments: { type: String, required: false },
    amount: { type: Number, required: false },
    unit: { type: String, required: false },
    person: { type: String, required: false },
    provision: { type: String, required: false },
    clientPrice: { type: String, required: false },
    contractorPrice: { type: String, required: false },
    // contractorValidFrom: { type: Date },
    // contractorDateOfExpiry: { type: Date },
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

module.exports = mongoose.model('ContractorSpecialOrder', ContractorSpecialOrderSchema);
