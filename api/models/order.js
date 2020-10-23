const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true },
    orderType: { type: String, required: true },
    orderName: { type: String, required: true },
    company: { type: String, required: true },
    invoiceType: { type: String, required: false },
    priceBasis: { type: String, required: true },
    isOncePerBilling: { type: Boolean, required: false },
    noCustomerInvoice: { type: Boolean, required: false },
    isFuelFee: { type: String, required: false },
    validFrom: { type: String, required: true },
    dateOfExpiry: { type: Date, required: false },
    start: { type: String, required: false },
    duration: { type: String, required: false },
    kmPerDay: { type: Number, required: false },
    fuelType: { type: String, required: false },
    vehicleSize: { type: String, required: false },
    numberOfDepartures: { type: String, required: false },
    departureTimes: { type: String, required: false },
    client: { type: String, required: false },
    clientId: { type: String, required: false },
    clientPriceWeekend: { type: Array, required: false },
    isOncePerBilling:{ type: Boolean, required: false },
    noCustomerInvoice:{ type: Boolean, required: false },
    clientPriceWeek: { type: Array, required: true },
    contractorPriceWeek: { type: Array, required: false },
    contractorPriceWeekend: { type: Array, required: true },
    contractor: { type: Object, required: false },
    article: { type: String, required: false },
    contractorValidFrom: { type: Date, required: false },
    contractorDateOfExpiry: { type: Date, required: false },
    personComponentIds: { type: Array, required: false },
    contractor: { type: String, required: false },
    contractorId: { type: String, required: false },
    assignmentNoticeId:{},
    assignmentNotice:{},
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

module.exports = mongoose.model('Order', OrderSchema);
