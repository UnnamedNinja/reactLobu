const Carrier = require('../models/carrier');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');
var IBAN = require('iban');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

// NOTE: these must be parallel arrays
const carrierFields = [
  'Email',
  'Name1',
  'Phone 1',
  'Phone 2',
  'City',
  'State',
  'House number',
  'Zipcode',
  'Mobile',
  'Fax',
  'IBAN',
  'BIC',
  'Tax Identification Number',
  'National Tax Number',
  'Vendor number',
  'Debitor Number',
  'Currency',
  'VAT Ex. 19%',
  'Efact Nr',
];
const carrierDbids = [
  'email',
  'name1',
  'phone1',
  'phone2',
  'city',
  'state',
  'houseNumber',
  'zipcode',
  'mobile',
  'fax',
  'iban',
  'bic',
  'taxID',
  'nationalTaxID',
  'vendorNumber',
  'debitorNumber',
  'currency',
  'vat',
  'eFact',
];
/**
 * postCarrier - Adds a "Carrier"
 * @returns {Array} - Array of users
 */
exports.postCarrier = async (ctx, next) => {
  console.log('HERE AT LEAST');
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    carrierFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    if (ctx.request.body['IBAN'] != undefined && IBAN.isValid(ctx.request.body['IBAN'])) {
      try {
        console.log(ctx.request.body);
        const carrierNumber = await Carrier.count({});
        const carrier = new Carrier({
          email: ctx.request.body.Email,
          company: ctx.request.body.Company,
          name1: ctx.request.body['Name1'],
          name2: ctx.request.body['Name2'],
          phone1: ctx.request.body['Phone 1'],
          phone2: ctx.request.body['Phone 2'],
          street: ctx.request.body.Street,
          carrierNumber: carrierNumber + 1,
          houseNumber: ctx.request.body['House number'],
          zipcode: ctx.request.body.Zipcode,
          city: ctx.request.body.city,
          mobile: ctx.request.body.Mobile,
          fax: ctx.request.body.Fax,
          'Account Manager': ctx.request.body['Account Manager Name'],
          accountManagerNumber: ctx.request.body['Account Manager Number'],
          alternateInvoiceRecipient: ctx.request.body.AlternateInvoiceRecipient,
          billingCycle: ctx.request.body.billingCycle,
          paymentTerms: ctx.request.body['Payment Terms'],
          terminationTime: ctx.request.body.terminationTime,
          InvoiceDeliveryMethod: ctx.request.body.InvoiceDeliveryMethod,
          iban: ctx.request.body.IBAN,
          bic: ctx.request.body.BIC,
          taxID: ctx.request.body['Tax Identification Number'],
          nationalTaxID: ctx.request.body['National Tax Number'],
          vendorNumber: ctx.request.body['Vendor number'],
          costCenter: ctx.request.body['Cost Center'],
          debitorNumber: ctx.request.body['Debitor Number'],
          currency: ctx.request.body['Currency'],
          companyBank: ctx.request.body['Company Bank'],
          vat: ctx.request.body['VAT Ex. 19%'],
          LastBilled: 'Not Billed Yet',
        });
        await carrier.save();
        ctx.status = 200;
        ctx.body = { carrier: carrier };
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
    //     (i, index) => '\n' + carrierFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid Carrier:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + carrierFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * getUsers  - Returns JSON for all users
 * @returns {Array} - Array of users
 */
exports.getCarriers = async (ctx, next) => {
  try {
    const carriers = await Carrier.find({});
    ctx.status = 200;
    ctx.body = { allCarriers: carriers };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getCarrier = async (ctx, next) => {
  try {
    const carrier = await Carrier.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { CarrierFound: carrier };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editCarrier = async (ctx, next) => {
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    carrierDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      console.log(ctx.request.body);
      await Carrier.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { CarrierUpdated: 'Updated Carrier Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + carrierDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid Carrier:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + carrierFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteCarrier = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Carrier.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
