const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const TourSchema = new Schema(
  {
    tourNumber: { type: String, required: false },
    tourName: { type: String, required: false },
    tourStopName: { type: String, required: false },
    tourStartDate: { type: Date, required: false },
    tourEndDate: { type: Date, required: false },
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

module.exports = mongoose.model('Tour', TourSchema);
