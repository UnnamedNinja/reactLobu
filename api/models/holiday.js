const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const HolidaySchema = new Schema(
  {
    holidayDate: { type: Date, required: true },
    description: { type: String, required: true },
    berlin: { type: Boolean, required: false },
    bavaria: { type: Boolean, required: false },
    bremen: { type: Boolean, required: false },
    hesse: { type: Boolean, required: false },
    mecklenburgVorpommern: { type: Boolean, required: false },
    rhinelandPalatinate: { type: Boolean, required: false },
    saxony: { type: Boolean, required: false },
    schleswigHolstein: { type: Boolean, required: false },
    foreign: { type: Boolean, required: false },
    badenWurttemberg: { type: Boolean, required: false },
    bradenburg: { type: Boolean, required: false },
    hamburg: { type: Boolean, required: false },
    lowerSaxony: { type: Boolean, required: false },
    northRhineWestphalia: { type: Boolean, required: false },
    saarland: { type: Boolean, required: false },
    saxonyAnhalt: { type: Boolean, required: false },
    thuringia: { type: Boolean, required: false },
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

module.exports = mongoose.model('Holiday', HolidaySchema);
