const FuelPrice = require('../models/fuelpricedata');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');
const _ = require('lodash');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

// Note, these must be parallel arrays and are only the required attributes of FuelPrice


/**
 * postFuelPrice - Adds a "FuelPrice"
 * @returns {Array} - Array of users
 */
exports.postFuelPrice = async (ctx, next) => {
  console.log('Creating a new Fuel Table/');
  console.log(ctx.request.body);

    try {
      const fuelPriceCount = await FuelPrice.count({});

      const fuelPrice = new FuelPrice({
        fuelPriceNumber: fuelPriceCount + 1,
        clientId: ctx.request.body['clientId'],
        contractorId: ctx.request.body['contractorId'],
        corridorsTop:ctx.request.body['corridorsTop'],
        corridorsBottom:ctx.request.body['corridorsBottom'],
        content:ctx.request.body['content']
      });
      await fuelPrice.save();
      ctx.status = 200;
      ctx.body = { fuelPrice: fuelPrice };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }

};

/**
 * getUsers  - Returns JSON for all users
 * @returns {Array} - Array of users
 */
exports.getFuelPrices = async (ctx, next) => {
  try {
    const fuelPrices = await FuelPrice.find({});
    ctx.status = 200;
    ctx.body = { allFuelPrices: fuelPrices };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getFuelPrice = async (ctx, next) => {
  console.log("HERO");
  console.log(ctx.params.id);
  try {
    const fuelPrice = await FuelPrice.find({clientId:ctx.params.id});
    ctx.status = 200;
    ctx.body = { FuelPriceFound: fuelPrice };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editFuelPrice = async (ctx, next) => {
  console.log("EDITING FUEL PRICE")
  console.log(ctx.request.body);
  console.log(ctx.params);

  try {
    // Allow users to edit all of their own information, but limited information
    // on other users. This could be controlled in other ways as well.
    await FuelPrice.findOneAndUpdate({ clientId: ctx.params.id }, ctx.request.body);

    ctx.body = { FuelPriceUpdated: 'Updated Person Successfully' };
    await next();
  } catch (err) {
  ctx.throw(500, err);
};
}

/**
 * deleteUser  - Deletes single user
 */
exports.deleteFuelPrice = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await FuelPrice.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
