const Contractor = require('../models/contractor');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');
const IBAN = require('iban');
const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

const contractorFields = [
  'Payment Stop',
  'Alias',
  'Name1',
  'Street',
  'House number',
  'Zipcode',
  'City',
  'State',
  'Phone 1',
  // 'Mobile',
  'Fax',
  'Email',
  'Invoice Type',
  'VAT Ex. 19%',
  'Billing Cycle',
  'Payment Cycle',
  'Tax Identification Number',
  'National Tax Number',
  'Commercial Date',
  'Currency',
  'Termination Time',
  // 'Company',
  // 'Assignment notice',
  // 'Company Bank',
  // 'Debitor Number',
  // 'Creditor Number',
  // 'Client number at contractor',
  // 'IBAN',
  // 'BIC',
  // 'Bank',
  // 'Contract file',
  // 'Contract Start Date',
  // 'Contract End Date',
  'Invoice Delivery Method',
];
const contractorDbids = [
  'Payment Stop',
  'alias',
  'name1',
  'street',
  'houseNumber',
  'zipcode',
  'city',
  'state',
  'phone1',
  // 'mobile',
  'fax',
  'email',
  'invoiceType',
  'vat',
  'billingCycle',
  'paymentCycle',
  'taxID',
  'nationalTaxID',
  'commercialDate',
  'currency',
  'terminationTime',
  // 'company',
  // 'assignmentNotice',
  // 'companyBank',
  // 'debitorNumber',
  // 'creditorNumber',
  // 'clientNumberAtContractor',
  // 'iban',
  // 'bic',
  // 'bank',
  // 'contractFile',
  // 'contractStartDate',
  // 'contractEndDate',
  'invoiceDeliveryMethod',
];

/**
 * postContractor - Adds a "Contractor"
 * @returns {Array} - Array of users
 */
exports.postContractor = async (ctx, next) => {
  console.log('HERE AT LEAST');
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    contractorFields,
    [undefined, ''],
  );
  console.log(ctx.request.body.Mobile);
  if (missingFieldIndexes.length === 0) {
    // dont check for IBAN directly on contractors now,
    // we ned to check it within the bankingDetails array
    if (validationUtils.validateEntitiesIbans(ctx.request.body['Banking Details'], 'iban')) {
      // validate mobile if not undefined
      if (ctx.request.body.Mobile !== undefined) {
        // if invalid mobile phone numbers, err
        if (
          !validationUtils.validateArray(
            ctx.request.body.Mobile,
            validationUtils.validateGermanPhoneNumber,
          )
        ) {
          console.log(ctx.request.body.Mobile);
          ctx.body = { error: validationUtils.mobileErrorMessage };
          await next();
          return;
        }
      }
      try {
        console.log("showing where i am kid",ctx);
        var contractorCount = await Contractor.count({});
        contractorCount+=1
        const contractor = new Contractor({
          paymentStop: ctx.request.body['Payment Stop'],
          alias: ctx.request.body['Alias'],
          email: ctx.request.body.Email,
          contractorNumber: "70000"+contractorCount,
          company: ctx.request.body.Company,
          name1: ctx.request.body['Name1'],
          name2: ctx.request.body['Name2'],
          phone1: ctx.request.body['Phone 1'],
          street: ctx.request.body.Street,
          state: ctx.request.body.State,
          address: ctx.request.body['Address'],
          houseNumber: ctx.request.body['House number'],
          days: ctx.request.body['Days'],
          terminationDays: ctx.request.body['Termination Days'],
          zipcode: ctx.request.body.Zipcode,
          city: ctx.request.body.City,
          mobile: ctx.request.body.Mobile,
          fax: ctx.request.body.Fax,
          billingCycle: ctx.request.body['Billing Cycle'],
          paymentCycle: ctx.request.body['Payment Cycle'],
          terminationTime: ctx.request.body['Termination Time'],
          invoiceDeliveryMethod: ctx.request.body['Invoice Delivery Method'],
          contractStartDate: ctx.request.body['Contract Start Date'],
          contractEndDate: ctx.request.body['Contract End Date'],
          iban: ctx.request.body.IBAN,
          bic: ctx.request.body.BIC,
          clientNumberAtContractor: ctx.request.body['Client number at contractor'],
          taxID: ctx.request.body['Tax Identification Number'],
          nationalTaxID: ctx.request.body['National Tax Number'],
          vendorNumber: ctx.request.body['Vendor number'],
          costCenter: ctx.request.body['Cost Center'],
          debitorNumber: ctx.request.body['Debitor Number'],
          creditorNumber: ctx.request.body['Creditor Number'],
          commercialDate: ctx.request.body['Commercial Date'],
          currency: ctx.request.body['Currency'],
          companyBank: ctx.request.body['Company Bank'],
          bank: ctx.request.body['Bank'],
          vat: ctx.request.body['VAT Ex. 19%'],
          invoiceType: ctx.request.body['Invoice Type'],
          vatMandatory: ctx.request.body['Vat Mandatory']
            ? ctx.request.body['Vat Mandatory']
            : false,
          lastBilled: 'Not Billed',
          comment: ctx.request.body['Comments'],
          invoiceEmail: ctx.request.body['Invoice Email'],
          bankingDetails: ctx.request.body['Banking Details'],
          bankruptcyBankaccountLiquidator: ctx.request.body['Bankaccount liquidator'],
          bankruptcyAccountHolder: ctx.request.body['Account holder'],
          bankruptcyBankName: ctx.request.body['Bank Name'],
          bankruptcyIban: ctx.request.body['Bankruptcy IBAN'],
        });

        await contractor.save();
        ctx.status = 200;
        ctx.body = { contractor: contractor };
        await next();
      } catch (err) {
        ctx.throw(500, err);
      }
    } else {
      console.log(ctx.request.body['Banking Details']);
      ctx.body = { error: 'Invalid IBAN' };
      await next();
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + contractorFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid contractor:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + contractorFields[i],
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
exports.getContractors = async (ctx, next) => {
  try {
    const contractors = await Contractor.find({});
    ctx.status = 200;
    ctx.body = { allContractors: contractors };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getContractor = async (ctx, next) => {
  try {
    const contractor = await Contractor.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { ContractorFound: contractor };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editContractor = async (ctx, next) => {
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    contractorDbids,
    [null, ''],
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      await Contractor.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { ContractorUpdated: 'Updated Contractor Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + contractorDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid contractor:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + contractorFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteContractor = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Contractor.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
