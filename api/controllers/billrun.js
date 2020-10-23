const BillRun = require('../models/billrun');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

// NOTE: these must be parallel arrays
const billRunFields = [

];
const billRunDbids = [
  'orders'
];

/**
 * postBillRun - Adds a "BillRun"
 * @returns {Array} - Array of users
 */
exports.postBillRun = async (ctx, next) => {
  console.log('HERE AT LEAST');
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    billRunFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      console.log(ctx.request.body['orders']);
      const billRun = new BillRun({
        orders: ctx.request.body['orders'],
      });
      await billRun.save();
      ctx.status = 200;
      ctx.body = { billRun: billRun };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + billRunFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid BillRun:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + billRunFields[i],
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
exports.getBillRuns = async (ctx, next) => {
  try {
    const billRuns = await BillRun.find({});
    ctx.status = 200;
    ctx.body = { allBillRuns: billRuns };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getBillRun = async (ctx, next) => {
  try {
    const billRun = await BillRun.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { BillRunFound: billRun };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editBillRun = async (ctx, next) => {
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    billRunDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      await BillRun.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { BillRunUpdated: 'Updated BillRun Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + billRunDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid BillRun:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + billRunFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteBillRun = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await BillRun.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
