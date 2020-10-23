const ContractorSpecialOrder = require('../models/contractorSpecialOrder');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

/**
 * postContractorSpecialOrder - Adds a "ContractorSpecialOrder"
 * @returns {Array} - Array of users
 */
exports.postContractorSpecialOrder = async (ctx, next) => {
  console.log('HERE AT LEAST');
  try {
    console.log(ctx.request.body);
    const order = new ContractorSpecialOrder({
      orderNumber: ctx.request.body['Order Number'],
      orderType: ctx.request.body['Order Type'],
      orderName: ctx.request.body['Order Name'],
      company: ctx.request.body['Company'],
      assignmentNotice: ctx.request.body['Assignment Notice'],
      client: ctx.request.body['Client'],
      contractor: ctx.request.body['Contractor'],
      article: ctx.request.body['Articles'],
      creditNoteNumber: ctx.request.body['Credit Note Number'],
      contractorValidFrom: ctx.request.body['Contractor Valid From'],
      contractorDateOfExpiry: ctx.request.body['Contractor Date of Expiry'],
    });
    await order.save();
    ctx.status = 200;
    ctx.body = { order: order };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUsers  - Returns JSON for all users
 * @returns {Array} - Array of users
 */
exports.getContractorSpecialOrders = async (ctx, next) => {
  try {
    const orders = await ContractorSpecialOrder.find({});
    ctx.status = 200;
    ctx.body = { allSpecialOrders: orders };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getContractorSpecialOrder = async (ctx, next) => {
  try {
    const order = await ContractorSpecialOrder.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { SpecialOrderFound: order };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editContractorSpecialOrder = async (ctx, next) => {
  try {
    // Allow users to edit all of their own information, but limited information
    // on other users. This could be controlled in other ways as well.

    await ContractorSpecialOrder.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
    ctx.body = { SpecialOrderUpdated: 'Updated SpecialOrder Successfully' };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteContractorSpecialOrder = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await ContractorSpecialOrder.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
