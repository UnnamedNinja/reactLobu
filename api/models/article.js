const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// Client Schema
//= ===============================
const ArticleSchema = new Schema(
  {
    articleNumber: { type: String },
    description: { type: String, required: true },
    contractorPrice: { type: String },
    group: { type: String, required: true },
    purchasingPrice: { type: String },
    calculation: { type: String },
    value: { type: String },
    clientPrice: { type: String },
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

module.exports = mongoose.model('Article', ArticleSchema);
