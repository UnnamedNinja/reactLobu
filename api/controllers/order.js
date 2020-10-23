const Order = require('../models/order');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

/**
 * postOrder - Adds a "Order"
 * @returns {Array} - Array of users
 */
exports.postOrder = async (ctx, next) => {
  console.log('HERE AT LEAST');
  try {
    console.log(ctx.request.body);
    console.log("boo");
    console.log(ctx.request.body['clientNumber']);
    console.log(typeof ctx.request.body['Contractor']);
    var orderCount = await Order.count({});
    orderCount+=1
    const order = new Order({
      orderNumber: ctx.request.body['clientNumber']+"0000"+orderCount,
      orderType: ctx.request.body['Order Type'],
      orderName: ctx.request.body['Order Name'],
      company: ctx.request.body['Company'],
      invoiceType: ctx.request.body['Invoice Type'],
      priceBasis: ctx.request.body['Price Basis'],
      isOncePerBilling: ctx.request.body['Once per billing'],
      noCustomerInvoice: ctx.request.body['No customer invoice'],
      isFuelFee: ctx.request.body['Fuel Fee'],
      validFrom: ctx.request.body['Valid From']
        ? ctx.request.body['Valid From']
        : ctx.request.body['Contractor Valid From'],
      dateOfExpiry: ctx.request.body['Date of Expiry']
        ? ctx.request.body['Date of Expiry']
        : ctx.request.body['Contractor Date of Expiry'],
      start: ctx.request.body['Start'],
      duration: ctx.request.body['Duration'],
      kmPerDay: ctx.request.body['Km/day'],
      fuelType: ctx.request.body['Fuel Type'],
      vehicleSize: ctx.request.body['Vehicle Size'],
      numberOfDepartures: ctx.request.body['Number Of Departures'],
      assignmentNoticeId:ctx.request.body['assignmentNoticeId'],
      assignmentNotice:ctx.request.body['assignmentNotice'],

      departureTimes: ctx.request.body['Departure Times'],
      client: ctx.request.body['Client'],
      clientId: ctx.request.body.ClientId,
      clientPriceWeekend: ctx.request.body['Client Price Weekend'],
      clientPriceWeek: ctx.request.body['Client Price Week'],
      contractorPriceWeek: ctx.request.body['Contractor Price Week'],
      contractorPriceWeekend: ctx.request.body['Contractor Price Weekend'],
      article: ctx.request.body['Article'],
      contractorValidFrom: ctx.request.body['Contractor Valid From'],
      contractorDateOfExpiry: ctx.request.body['Contractor Date of Expiry'],
      personComponentIds: ctx.request.body['personComponentIds'],
      contractor: JSON.stringify(ctx.request.body['Contractor']),
      contractorId: ctx.request.body.ContractorId,
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
exports.getOrders = async (ctx, next) => {
  try {
    const orders = await Order.find({});
    ctx.status = 200;
    ctx.body = { allOrders: orders };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getOrder = async (ctx, next) => {
  try {
    const order = await Order.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { OrderFound: order };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editOrder = async (ctx, next) => {
  try {
    // Allow users to edit all of their own information, but limited information
    // on other users. This could be controlled in other ways as well.

    await Order.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
    ctx.body = { OrderUpdated: 'Updated Order Successfully' };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteOrder = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Order.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
