const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const ContractorSchema = new Schema(
  {
    paymentStop: { type: String, required: true },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    contractorNumber: { type: String },
    company: { type: String, required: false },
    address: { type: String, required: true },
    days: {},
    alias: { type: String, required: true },
    name1: { type: String, required: true },
    name2: { type: String, required: false },
    phone1: { type: String },
    city: { type: String, required: true },
    street: { type: String, required: true },
    state: { type: String, required: true },
    houseNumber: { type: String, required: true },
    mobile: { type: Array, required: false },
    terminationDays: { type: String, required: false },
    terminationTime: { type: String, required: true },
    contactPersons: {},
    fax: { type: String, required: false },
    invoiceType: { type: String, required: true },
    zipcode: { type: Number, required: true },
    billingCycle: { type: String, required: true },
    paymentCycle: { type: String, required: true },
    invoiceDeliveryMethod: { type: String, required: false },
    invoiceEmail: { type: String, required: false },
    iban: { type: String, required: false },
    bic: { type: String, required: false },
    clientNumberAtContractor: { type: String, required: false },
    taxID: { type: String, required: false },
    nationalTaxID: { type: String, required: false },
    commercialDate: { type: Date, required: false },
    debitorNumber: { type: String, required: false },
    creditorNumber: { type: String, required: false },
    currency: { type: String, required: true },
    companyBank: { type: String, required: false },
    vatMandatory: { type: Boolean, required: true },
    contractOK: { type: Boolean, required: false },
    vat: { type: Number, required: true },
    lastBilled: { type: String, required: false },
    assignmentNotice: { type: Array, required: false },
    bank: { type: String, required: false },
    comments: { type: String, required: false },
    bankingDetails: { type: Array, required: false },
    bankruptcyBankaccountLiquidator: { type: String, required: false },
    bankruptcyAccountHolder: { type: String, required: false },
    bankruptcyBankName: { type: String, required: false },
    bankruptcyIban: { type: String, required: false },
    contactStartDate: { type: Date, required: false },
    contactEndDate: { type: Date, required: false },
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

module.exports = mongoose.model('Contractor', ContractorSchema);
