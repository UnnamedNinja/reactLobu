const Client = require('../models/client');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');
var IBAN = require('iban');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

const clientFields = [
  'Company',
  'Group',
  'Name1',
  'Street',
  'House number',
  'Zipcode',
  'City',
  'State',
  'Phone 1',
  'Phone 2',
  // 'Mobile',
  'Fax',
  'Email',
  'Account Manager Names',
  'Account Manager Phone Numbers',
  'Billing Cycle',
  'Payment Cycle',
  'Termination Time',
  'Invoice Delivery Method',
  'Contract Start Date',
  'Contract End Date',
  'Debitor Number',
  'Currency',
  'Company Bank',
  'IBAN',
  'BIC',
  'Client number at client',
  'Tax Identification Number',
  'National Tax Number',
  'Vendor number',
  'Cost Center',
  'VAT Ex. 19%',
];
const clientDbids = [
  'company',
  'group',
  'Name1',
  'street',
  'houseNumber',
  'zipcode',
  'city',
  'state',
  'phone1',
  'phone2',
  // 'mobile',
  'fax',
  'email',
  'accountManagerNames',
  'accountManagerNumbers',
  'billingCycle',
  'paymentCycle',
  'terminationTime',
  'InvoiceDeliveryMethod',
  'contractStartDate',
  'contractEndDate',
  'debitorNumber',
  'currency',
  'companyBank',
  'iban',
  'bic',
  'clientNumberAtClient',
  'taxID',
  'nationalTaxID',
  'vendorNumber',
  'costCenter',
  'vat',
];

/**
 * postClient - Adds a "Client"
 * @returns {Array} - Array of users
 */
exports.postClient = async (ctx, next) => {
  console.log('HERE AT LEAST', ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    clientFields,
    [undefined, ''],
  );
  if (missingFieldIndexes.length === 0) {
    if (ctx.request.body['IBAN'] != undefined && IBAN.isValid(ctx.request.body['IBAN'])) {
      // validate mobile if not undefined
      if (ctx.request.body.Mobile !== undefined) {
        // if invalid mobile phone numbers, err
        if (
          !validationUtils.validateArray(
            ctx.request.body.Mobile,
            validationUtils.validateGermanPhoneNumber,
          )
        ) {
          console.log('\nmobile::', ctx.request.body.Mobile, '\n');
          ctx.body = { error: validationUtils.mobileErrorMessage };
          await next();
          return;
        }
      }
      try {
        var clientCount = await Client.count({});
        clientCount+=1

        const client = new Client({
          email: ctx.request.body.Email,
          company: ctx.request.body.Company,
          group: ctx.request.body.Group,
          Name1: ctx.request.body['Name1'],
          Name2: ctx.request.body['Name2'],
          phone1: ctx.request.body['Phone 1'],
          phone2: ctx.request.body['Phone 2'],
          street: ctx.request.body.Street,
          clientNumber: ""+"01"+"0000"+clientCount,
          address: ctx.request.body['Address'],
          days: ctx.request.body['Days'],
          terminationDays: ctx.request.body['Termination Days'],
          houseNumber: ctx.request.body['House number'],
          zipcode: ctx.request.body.Zipcode,
          city: ctx.request.body['City'],
          state: ctx.request.body['State'],
          mobile: ctx.request.body.Mobile,
          fax: ctx.request.body.Fax,
          accountManagerNames: ctx.request.body['Account Manager Names'],
          accountManagerNumbers: ctx.request.body['Account Manager Phone Numbers'],
          alternateInvoiceRecipient: ctx.request.body['Alternate Invoice Recipient'],
          billingCycle: ctx.request.body['Billing Cycle'],
          paymentCycle: ctx.request.body['Payment Cycle'],
          terminationTime: ctx.request.body['Termination Time'],
          invoiceDeliveryMethod: ctx.request.body['Invoice Delivery Method'],
          invoiceEmail: ctx.request.body['Invoice Email'],
          contractStartDate: ctx.request.body['Contract Start Date'],
          contractEndDate: ctx.request.body['Contract End Date'],
          iban: ctx.request.body.IBAN,
          bic: ctx.request.body.BIC,
          clientNumberAtClient: ctx.request.body['Client number at client'],
          taxID: ctx.request.body['Tax Identification Number'],
          nationalTaxID: ctx.request.body['National Tax Number'],
          vendorNumber: ctx.request.body['Vendor number'],
          costCenter: ctx.request.body['Cost Center'],
          debitorNumber: ctx.request.body['Debitor Number'],
          currency: ctx.request.body['Currency'],
          companyBank: ctx.request.body['Company Bank'],
          lastBilled: ctx.request.body['Last billed']
            ? ctx.request.body['Last billed']
            : 'Not Billed Yet',
          vat: ctx.request.body['VAT Ex. 19%'],
          vatMandatory: ctx.request.body['Vat Mandatory']
            ? ctx.request.body['Vat Mandatory']
            : false,
          comment: ctx.request.body['Comments'],
        });

        // ensure that there is at least one set of: account manager name and account manager phone number
        // ensure that the phone numbers are all valid for germany
        if (
          validationUtils.validateArray(
            client.accountManagerNumbers,
            validationUtils.validateGermanPhoneNumber,
          ) &&
          client.accountManagerNames.length >= 1
        ) {
          console.log(client.accountManagerNumbers);
          ctx.body = { error: 'Incomplete Phone Number for Account Manager' };
          await next();
        } else {
          await client.save();
          ctx.status = 200;
          ctx.body = { client: client };
          await next();
        }
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
    //     (i, index) => '\n' + clientFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid client:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + clientFields[i],
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
exports.getClients = async (ctx, next) => {
  try {
    const clients = await Client.find({});
    ctx.status = 200;
    ctx.body = { allClients: clients };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getClient = async (ctx, next) => {
  try {
    const client = await Client.findById(ctx.params.id);
    console.log(client);
    ctx.status = 200;
    ctx.body = { ClientFound: client };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editClient = async (ctx, next) => {
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    clientDbids,
    [null, ''],
  );
  if (missingFieldIndexes.length === 0) {
    console.log(ctx.request.body);
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      await Client.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { ClientUpdated: 'Updated Client Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + clientDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid client:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + clientFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteClient = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Client.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
