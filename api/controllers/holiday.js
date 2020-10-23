const Holiday = require('../models/holiday');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

const holidayFields = ['Date', 'Description'];
const holidayDbids = ['holidayDate', 'description'];

/**
 * postHoliday - Adds a "Holiday"
 * @returns {Array} - Array of users
 */
exports.postHoliday = async (ctx, next) => {
  console.log('HERE AT LEAST');
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    holidayFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      console.log(ctx.request.body);
      const holiday = new Holiday({
        holidayDate: ctx.request.body['Date'],
        description: ctx.request.body['Description'],
        berlin: ctx.request.body['Berlin'],
        bavaria: ctx.request.body['Bavaria'],
        bremen: ctx.request.body['Bremen'],
        hesse: ctx.request.body['Hesse'],
        mecklenburgVorpommern: ctx.request.body['Mecklenburg-Vorpommern'],
        rhinelandPalatinate: ctx.request.body['Rhineland-Palatinate'],
        saxony: ctx.request.body['Saxony'],
        schleswigHolstein: ctx.request.body['Schleswig-Holstein'],
        foreign: ctx.request.body['Foreign'],
        badenWurttemberg: ctx.request.body['Baden Wurttemberg'],
        bradenburg: ctx.request.body['Bradenburg'],
        hamburg: ctx.request.body['Hamburg'],
        lowerSaxony: ctx.request.body['Lower Saxony'],
        northRhineWestphalia: ctx.request.body['North Rhine-Westphalia'],
        saarland: ctx.request.body['Saarland'],
        saxonyAnhalt: ctx.request.body['Saxony-Anhalt'],
        thuringia: ctx.request.body['Thuringia'],
      });
      await holiday.save();
      ctx.status = 200;
      ctx.body = { holiday: holiday };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + holidayFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid holiday:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + holidayFields[i],
      )}`,
    };
    console.log(ctx.body);
    await next();
  }
};

/**
 * getUsers  - Returns JSON for all users
 * @returns {Array} - Array of users
 */
exports.getHolidays = async (ctx, next) => {
  try {
    const holidays = await Holiday.find({});
    ctx.status = 200;
    ctx.body = { allHolidays: holidays };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getHoliday = async (ctx, next) => {
  try {
    const holiday = await Holiday.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { HolidayFound: holiday };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editHoliday = async (ctx, next) => {
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    holidayDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      await Holiday.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { HolidayUpdated: 'Updated Holiday Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + holidayDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid holiday:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + holidayFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteHoliday = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Holiday.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
