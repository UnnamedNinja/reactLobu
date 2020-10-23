const PersonComponent = require('../models/personComponent');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

/**
 * postPersonComponent - Adds a "PersonComponent"
 * @returns {Array} - Array of users
 */
exports.postPersonComponent = async (ctx, next) => {
  console.log('HERE AT LEAST');
  try {
    console.log(ctx.request.body);
    const personComponent = new PersonComponent({
      person: ctx.request.body['Person'],
      calculation: ctx.request.body['Calculation'],
      value: ctx.request.body['Value'],
    });
    let dbObj = await personComponent.save();
    ctx.status = 200;
    ctx.body = { personComponent: personComponent };
    await next();
    return dbObj;
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUsers  - Returns JSON for all users
 * @returns {Array} - Array of users
 */
exports.getPersonComponents = async (ctx, next) => {
  try {
    const personComponents = await PersonComponent.find({});
    ctx.status = 200;
    ctx.body = { allPersonComponents: personComponents };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getPersonComponent = async (ctx, next) => {
  try {
    const personComponent = await PersonComponent.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { PersonComponentFound: personComponent };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editPersonComponent = async (ctx, next) => {
  try {
    // Allow users to edit all of their own information, but limited information
    // on other users. This could be controlled in other ways as well.

    console.log(ctx.request.body);
    console.log(ctx.params.id);

    await PersonComponent.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
    ctx.body = { PersonComponentUpdated: 'Updated PersonComponent Successfully' };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deletePersonComponent = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await PersonComponent.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
