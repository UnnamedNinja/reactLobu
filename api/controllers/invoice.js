const Invoice = require('../models/invoice');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

// todo
const invoiceFields = [];
const invoiceDbids = [];

/**
 * postInvoice - Adds a "Invoice"
 * @returns {Array} - Array of users
 */
exports.postInvoice = async (ctx, next) => {
  console.log('HERE AT LEAST');
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    invoiceFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      console.log(ctx.request.body);
      const invoiceCount = await Invoice.count({});
      const invoice = new Invoice({
        fieldAgent: ctx.request.body['Field Agent'],
        invoiceNumber: invoiceCount + 1,
        invoiceDate: ctx.request.body['Invoice date'],
        totalInvoiceAmount: ctx.request.body,
        invoiceFile: '',
        whenAttachedDate: ctx.request.body['When Attached'],
        transferredToLexOfficeDate: ctx.request.body['Transferred to LexOffice Date'],
      });
      await invoice.save();
      ctx.status = 200;
      ctx.body = { invoice: invoice };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + invoiceFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid invoice:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + invoiceFields[i],
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
exports.getInvoices = async (ctx, next) => {
  try {
    const invoices = await Invoice.find({});
    ctx.status = 200;
    ctx.body = { allInvoices: invoices };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getInvoice = async (ctx, next) => {
  try {
    const invoice = await Invoice.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { InvoiceFound: invoice };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editInvoice = async (ctx, next) => {
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    invoiceDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      console.log(ctx.request.body);
      console.log(ctx.params.id);

      await Invoice.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { InvoiceUpdated: 'Updated Invoice Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + invoiceDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid invoice:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + invoiceFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteInvoice = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Invoice.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
