const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const PartnerSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    partnerNumber: { type: String },
    company: { type: String },
    group: { type: String },
    address: { type: String },
    name1: { type: String },
    name2: { type: String },
    phone1: { type: String },
    phone2: { type: String },
    city: { type: String },
    street: { type: String },
    state: { type: String },
    houseNumber: { type: String },
    mobile: { type: Number },
    fax: { type: String },
    accountManagerName: { type: String },
    accountManagerNumber: { type: Number },
    alternateInvoiceRecipient: { type: String },
    zipcode: { type: Number },
    billingCycle: { type: String },
    paymentTerms: { type: String },
    terminationTime: { type: String },
    invoiceDeliveryMethod: { type: String },
    invoiceEmail: { type: String },
    iban: { type: String },
    bic: { type: String },
    clientNumberAtClient: { type: Number },
    taxID: { type: String },
    nationalTaxID: { type: String },
    vendorNumber: { type: Number },
    costCenter: { type: String },
    debitorNumber: { type: Number },
    currency: { type: String },
    companyBank: { type: String },
    vat: { type: Number },
    LastBilled: { type: String },
    documentLanguage: { type: String },
    basisForInvoice: { type: String },
    certifiedRecoveryOptions: { type: String },
    partnerType: {},
    eFact: { type: String },
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

module.exports = mongoose.model('Partner', PartnerSchema);
