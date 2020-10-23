const Partner = require('../models/partner');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');
var IBAN = require('iban');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

const partnerFields = [
  'Partner Type',
  'Name1',
  'address', // DO NOT CAPITALIZE
  'Street',
  'House number',
  'Zipcode',
  'City',
  'State',
  'Phone 1',
  'Phone 2',
  'Mobile',
  'Fax',
  'Email',
  'Account Manager Name',
  'Account Manager Number',
  'Payment Terms',
  'Invoice Delivery Method',
  'Choose Document Language',
  'Basis For Invoice',
  'Certified Recovery Options',
  'Efact Nr',
  'Debitor Number',
  'Currency',
  'VAT Ex. 19%',
  'IBAN',
  'BIC',
  'Client number at client',
  'Tax Identification Number',
  'National Tax Number',
  'Vendor number',
];
const partnerDbids = [
  'partnerType',
  'name1',
  'address',
  'street',
  'houseNumber',
  'zipcode',
  'city',
  'state',
  'phone1',
  'phone2',
  'mobile',
  'fax',
  'email',
  'accountManagerName',
  'accountManagerNumber',
  'paymentTerms',
  'invoiceDeliveryMethod',
  'documentLanguage',
  'basisForInvoice',
  'certifiedRecoveryOptions',
  'eFact',
  'debitorNumber',
  'currency',
  'vat',
  'iban',
  'bic',
  'clientNumberAtClient',
  'taxID',
  'nationalTaxID',
  'vendorNumber',
];

/**
 * postPartner - Adds a "Partner"
 * @returns {Array} - Array of users
 */
exports.postPartner = async (ctx, next) => {
  console.log('HERE AT LEAST');
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    partnerFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    if (ctx.request.body['IBAN'] != undefined && IBAN.isValid(ctx.request.body['IBAN'])) {
      try {
        console.log(ctx.request.body);

        let partnerCount = await Partner.count({});

        const partner = new Partner({
          email: ctx.request.body.Email,
          invoiceEmail: ctx.request.body['Invoice Email'],
          company: ctx.request.body.Company,
          group: ctx.request.body.Group,
          Name1: ctx.request.body['Name1'],
          Name2: ctx.request.body['Name2'],
          phone1: ctx.request.body['Phone 1'],
          phone2: ctx.request.body['Phone 2'],
          address: ctx.request.body['address'],
          state: ctx.request.body['State'],
          partnerType: ctx.request.body['Partner Type'],
          street: ctx.request.body.Street,
          partnerNumber: partnerCount + 1,
          houseNumber: ctx.request.body['House number'],
          zipcode: ctx.request.body.Zipcode,
          city: ctx.request.body.City,
          mobile: ctx.request.body.Mobile,
          fax: ctx.request.body.Fax,
          'Account Manager': ctx.request.body['Account Manager Name'],
          accountManagerNumber: ctx.request.body['Account Manager Number'],
          alternateInvoiceRecipient: ctx.request.body.AlternateInvoiceRecipient,
          billingCycle: ctx.request.body['Billing Cycle'],
          paymentTerms: ctx.request.body['Payment Terms'],
          terminationTime: ctx.request.body['Termination Time'],
          invoiceDeliveryMethod: ctx.request.body['Invoice Delivery Method'],
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
          certifiedRecoveryOptions: ctx.request.body['Certified Recovery Options'],
        });
        await partner.save();
        ctx.status = 200;
        ctx.body = { Partner: Partner };
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
    //     (i, index) => '\n' + partnerFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid partner:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + partnerFields[i],
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
exports.getPartners = async (ctx, next) => {
  try {
    const partners = await Partner.find({});
    ctx.status = 200;
    ctx.body = { allPartners: partners };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getPartner = async (ctx, next) => {
  try {
    const partner = await Partner.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { PartnerFound: partner };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editPartner = async (ctx, next) => {
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    partnerDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    if (ctx.request.body['iban'] != undefined && IBAN.isValid(ctx.request.body['iban'])) {
      try {
        // Allow users to edit all of their own information, but limited information
        // on other users. This could be controlled in other ways as well.

        await Partner.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
        ctx.body = { PartnerUpdated: 'Updated Partner Successfully' };
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
    //     (i, index) => '\n' + partnerDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid partner:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + partnerFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deletePartner = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Partner.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
