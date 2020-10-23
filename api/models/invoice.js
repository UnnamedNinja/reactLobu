const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const InvoiceSchema = new Schema(
  {
    invoiceNumber: { type: Number },
    invoiceDate: { type: String },
    totalInvoiceAmount: { type: Number },
    invoiceFile: {},
    whenAttachedDate: { type: String },
    transferredToLexOfficeDate: { type: String },
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

module.exports = mongoose.model('Invoice', InvoiceSchema);
