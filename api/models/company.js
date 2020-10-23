const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Company Schema
//= ===============================
const CompanySchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    companyNumber: { type: String, required: true },
    companyCode: { type: String, required: true },
    name1: { type: String, required: true },
    name2: { type: String, required: false },
    phone1: { type: String, required: true },
    phone2: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    zipcode: { type: Number, required: true },
    state: { type: String, required: true },
    houseNumber: { type: String, required: true },
    fax: { type: String, required: true },
    executiveDirector: { type: String, required: true },
    commercialRegisterNumber: { type: Number, required: true },
    commercialRegister: { type: String, required: true },
    complementary: { type: String, required: true },
    hra: { type: String, required: true },
    ustID: { type: String, required: true },
    taxNumber: { type: String, required: true },
    bank: { type: String, required: false },
    dtausNumber: { type: String, required: true },
    dtausPath: { type: String, required: true },
    sepaPath: { type: String, required: true },
    sepaNumber: { type: String, required: true },
    sepa: { type: String, required: true },
    pinColor: { type: String, required: false },
    usage: { type: String, required: true },
    converter: { type: String, required: true },
    receiptNumber: { type: String, required: true },
    vat:{ type: Number, required: true },
    vatMandatory:{ type: Boolean, required: false },
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

module.exports = mongoose.model('Company', CompanySchema);
