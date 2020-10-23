const Bank = require('../models/bank');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');
var IBAN = require('iban');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

// NOTE: these must be parallel arrays
const bankFields = [
  'Bank Name',
  'Bank Description',
  'Account Number',
  'Bank Code',
  'IBAN',
  'BIC',
  'company', // DO NOT CAPITALIZE
];
const bankDbids = [
  'bankName',
  'bankDescription',
  'accountNumber',
  'bankCode',
  'iban',
  'bic',
  'company',
];

/**
 * postBank - Adds a "Bank"
 * @returns {Array} - Array of users
 */
exports.postBank = async (ctx, next) => {
  console.log('HERE AT LEAST');
  console.log("____________________________")
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    bankFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    console.log(typeof ctx.request.body['IBAN']);
    if (ctx.request.body['IBAN'] != undefined && IBAN.isValid(ctx.request.body['IBAN'])) {
      try {
        console.log(ctx.request.body);
        let bankCount = await Bank.count({});
        // await Bank.count({}, function (err, count) {
        //   if (err) {
        //     console.log('there are %d banks', count);
        //   } else {
        //     bankCount = count;
        //   }
        // });

        // // guard clause
        // if (bankCount === -1) {
        //   ctx.body = {
        //     error: 'Failed to create a bank. This is a problem with the server and not you.',
        //   };
        //   await next();
        //   return;
        // }

        const bank = new Bank({
          bankNumber: bankCount + 1,
          bankName: ctx.request.body['Bank Name'],
          bankDescription: ctx.request.body['Bank Description'],
          accountNumber: ctx.request.body['Account Number'],
          bankCode: ctx.request.body['Bank Code'],
          iban: ctx.request.body['IBAN'].trim(),
          bic: ctx.request.body['BIC'],
          company: ctx.request.body['Company'],
          companyId: ctx.request.body['CompanyId'],

        });
        await bank.save();
        ctx.status = 200;
        ctx.body = { bank: bank };
        await next();
      } catch (err) {
        ctx.throw(500, err);
      }
    } else {
      console.log(ctx.request.body['IBAN']);
      ctx.body = { error: 'Invalid IBAN' };
      await next();
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + bankFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid bank:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + bankFields[i],
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
exports.getBanks = async (ctx, next) => {
  try {
    const banks = await Bank.find({});
    ctx.status = 200;
    ctx.body = { allBanks: banks };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getBank = async (ctx, next) => {
  try {
    const bank = await Bank.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { BankFound: bank };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editBank = async (ctx, next) => {
  console.log("____________________________")
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    bankDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    if (ctx.request.body['iban'] != undefined && IBAN.isValid(ctx.request.body['iban'])) {
      try {
        // Allow users to edit all of their own information, but limited information
        // on other users. This could be controlled in other ways as well.

        await Bank.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
        ctx.body = { BankUpdated: 'Updated Bank Successfully' };
        await next();
      } catch (err) {
        ctx.throw(500, err);
      }
    } else {
      console.log(ctx.request.body['iban']);
      ctx.body = { error: 'Invalid IBAN' };
      await next();
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + bankDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid bank:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + bankFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteBank = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Bank.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
