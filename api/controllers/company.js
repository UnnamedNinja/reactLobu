const Company = require('../models/company');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

const companyFields = [
  'Company Code',
  'Name1',
  'Street',
  'House number',
  'Zipcode',
  'City',
  'State',
  // 'Phone 1',
  // 'Phone 2',
  // 'Fax',
  // 'Email',
  // 'Pin Color',
  // 'Executive Director',
  // 'Commercial Register Number',
  // 'Commercial Register',
  // 'Complementary',
  // 'HRA',
  // 'Ust-ID',
  // 'Tax Number',
  // 'Website',
  // 'Logo',
  // 'Bank',
  // 'Dtaus No.',
  // 'Dtaus Path',
  // 'SEPA No.',
  // 'SEPA',
  // 'SEPA Path',
  // 'Usage',
  // 'Converter',
];
const companyDbids = [
  'companyCode',
  'name1',
  'street',
  'houseNumber',
  'zipcode',
  'city',
  'state',
  // 'phone1',
  // 'phone2',
  // 'fax',
  // 'email',
  // 'pinColor',
  // 'executiveDirector',
  // 'commercialRegisterNumber',
  // 'commercialRegister',
  // 'complementary',
  // 'hra',
  // 'ustID',
  // 'taxNumber',
  // 'website',
  // 'logo',
  // 'bank',
  // 'dtausNumber',
  // 'dtausPath',
  // 'sepaNumber',
  // 'sepa',
  // 'sepaPath',
  // 'usage',
  // 'converter',
];

/**
 * postCompany - Adds a "Company"
 * @returns {Array} - Array of users
 */
exports.postCompany = async (ctx, next) => {
  console.log('HERE AT LEAST');
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    companyFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      console.log(ctx.request.body);

      const companyCount = await Company.count({});

      const company = new Company({
        email: ctx.request.body.Email,
        company: ctx.request.body.Company,
        companyCode: ctx.request.body['Company Code'],
        group: ctx.request.body.Group,
        name1: ctx.request.body['Name1'],
        name2: ctx.request.body['Name2'],
        phone1: ctx.request.body['Phone 1'],
        phone2: ctx.request.body['Phone 2'],
        street: ctx.request.body.Street,
        state: ctx.request.body['State'],
        companyNumber: companyCount + 1,
        houseNumber: ctx.request.body['House number'],
        zipcode: ctx.request.body['Zipcode'],
        city: ctx.request.body['City'],
        fax: ctx.request.body.Fax,
        executiveDirector: ctx.request.body['Executive Director'],
        commercialRegisterNumber: ctx.request.body['Commercial Register Number'],
        commercialRegister: ctx.request.body['Commercial Register'],
        complementary: ctx.request.body['Complementary'],
        hra: ctx.request.body['HRA'],
        ustID: ctx.request.body['Ust-ID'],
        taxNumber: ctx.request.body['Tax Number'],
        bank: ctx.request.body['Bank'],
        dtausPath: ctx.request.body['Dtaus Path'],
        dtausNumber: ctx.request.body['Dtaus No.'],
        sepaNumber: ctx.request.body['SEPA No.'],
        sepaPath: ctx.request.body['SEPA Path'],
        sepa: ctx.request.body['SEPA'],
        usage: ctx.request.body['Usage'],
        converter: ctx.request.body['Converter'],
        receiptNumber: ctx.request.body['Receipt Number'],
        vat: ctx.request.body['VAT Ex. 19%'],
        vatMandatory: ctx.request.body['Vat Mandatory']
          ? ctx.request.body['Vat Mandatory']
          : false,
      });
      await company.save();
      ctx.status = 200;
      ctx.body = { Company: Company };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + companyFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid company:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + companyFields[i],
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
exports.getCompanys = async (ctx, next) => {
  try {
    const companys = await Company.find({});
    ctx.status = 200;
    ctx.body = { allCompanys: companys };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getCompany = async (ctx, next) => {
  try {
    const company = await Company.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { CompanyFound: company };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editCompany = async (ctx, next) => {
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    companyDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      await Company.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { CompanyUpdated: 'Updated Company Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + companyDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid company:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + companyFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteCompany = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Company.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
