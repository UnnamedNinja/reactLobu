const ClientSpecialOrder = require('../models/clientSpecialOrder');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

const clientSpecialOrderFields = [
  'Order Name',
  'Order Type',
  'Company',
  'Client',
  // 'Assignment Notice', // temp for testing
  'Credit Note Number',
];
const clientSpecialOrderDbids = [
  'orderName',
  'orderType',
  'company',
  'client',
  // 'assignmentNotice', // temp for testing
  'creditNoteNumber',
];

/**
 * postClientSpecialOrder - Adds a "ClientSpecialOrder"
 * @returns {Array} - Array of users
 */
exports.postClientSpecialOrder = async (ctx, next) => {
  console.log('HERE AT LEAST');
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    clientSpecialOrderFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      console.log(ctx.request.body);
      const cSOCount = await ClientSpecialOrder.count({});
      const order = new ClientSpecialOrder({
        orderNumber: cSOCount + 1,
        orderType: ctx.request.body['Order Type'],
        orderName: ctx.request.body['Order Name'],
        company: ctx.request.body['Company'],
        assignmentNotice: ctx.request.body['Assignment Notice'],
        client: ctx.request.body['Client'],
        contractor: ctx.request.body['Contractor'],
        article: ctx.request.body['Articles'],
        creditNoteNumber: ctx.request.body['Credit Note Number'],
      });
      await order.save();
      ctx.status = 200;
      ctx.body = { order: order };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + clientSpecialOrderFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid clientSpecialOrder:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + clientSpecialOrderFields[i],
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
exports.getClientSpecialOrders = async (ctx, next) => {
  try {
    const orders = await ClientSpecialOrder.find({});
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
exports.getClientSpecialOrder = async (ctx, next) => {
  try {
    const order = await ClientSpecialOrder.findById(ctx.params.id);
    console.log('phili', order);
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
exports.editClientSpecialOrder = async (ctx, next) => {
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    clientSpecialOrderDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      await ClientSpecialOrder.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { SpecialOrderUpdated: 'Updated SpecialOrder Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + clientSpecialOrderDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid clientSpecialOrder:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + clientSpecialOrderFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteClientSpecialOrder = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await ClientSpecialOrder.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
