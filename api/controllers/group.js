const Group = require('../models/group');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');
const _ = require('lodash');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

// Note, these must be parallel arrays and are only the required attributes of Group
const groupFields = ['Name'];
const groupDbids = ['groupName'];

/**
 * postGroup - Adds a "Group"
 * @returns {Array} - Array of users
 */
exports.postGroup = async (ctx, next) => {
  console.log('HERE AT LEAST');
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    groupFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      console.log(ctx.request.body);
      const groupCount = await Group.count({});

      const group = new Group({
        groupNumber: groupCount + 1,
        groupName: ctx.request.body['Name'],
        company: ctx.request.body['Company'],
      });
      await group.save();
      ctx.status = 200;
      ctx.body = { group: group };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + groupFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid group:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + groupFields[i],
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
exports.getGroups = async (ctx, next) => {
  try {
    const groups = await Group.find({});
    ctx.status = 200;
    ctx.body = { allGroups: groups };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getGroup = async (ctx, next) => {
  try {
    const group = await Group.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { GroupFound: group };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editGroup = async (ctx, next) => {
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    groupDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      await Group.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { GroupUpdated: 'Updated Group Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + groupDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid group:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + groupFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteGroup = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Group.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
