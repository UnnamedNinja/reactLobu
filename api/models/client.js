const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const ClientSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    clientNumber: { type: String, required: false },
    company: { type: String, required: true },
    group: { type: String, required: true },
    address: { type: String, required: true },
    days: { type: String, required: false },
    terminationDays: { type: String, required: false },
    Name1: { type: String, required: true },
    Name2: { type: String, required: false },
    phone1: { type: String, required: false },
    phone2: { type: String, required: false },
    city: { type: String, required: true },
    street: { type: String, required: true },
    state: { type: String, required: true },
    houseNumber: { type: String, required: true },
    mobile: { type: Array, required: false },
    contactPersons: {},
    fax: { type: String, required: false },
    accountManagerNames: { type: Array, required: true },
    accountManagerNumbers: { type: Array, required: true },
    alternateInvoiceRecipient: { type: String, required: false },
    zipcode: { type: Number, required: true },
    billingCycle: { type: String, required: false },
    paymentCycle: { type: String, required: false },
    terminationTime: { type: String, required: false },
    invoiceDeliveryMethod: { type: String, required: false },
    invoiceEmail: { type: String, required: false },
    contractStartDate: { type: Date, required: false },
    contractEndDate: { type: Date, required: false },
    iban: { type: String, required: false },
    bic: { type: String, required: false },
    clientNumberAtClient: { type: Number, required: false },
    taxID: { type: String, required: false },
    nationalTaxID: { type: String, required: false },
    vendorNumber: { type: String, required: false },
    costCenter: { type: String, required: false },
    debitorNumber: { type: String, required: false },
    currency: { type: String, required: false },
    companyBank: { type: String, required: false },
    vat: { type: Number, required: false },
    vatMandatory: { type: Boolean, required: false },
    lastBilled: { type: String, required: false },
    comment: { type: String, required: false },
    contactPeople: {},
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

module.exports = mongoose.model('Client', ClientSchema);
