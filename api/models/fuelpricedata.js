const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const FuelPriceDataSchema = new Schema(
  {
    corridorsTop: { type: Array, required: false },
    corridorsBottom: { type: Array, required: false },
    content: {},
    clientId: { type: String, required: false },
    contractorId: { type: String, required: false },
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

module.exports = mongoose.model('FuelPrice', FuelPriceDataSchema);
