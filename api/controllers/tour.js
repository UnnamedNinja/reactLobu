const Tour = require('../models/tour');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

// NOTE: these must be parallel arrays
const tourFields = [
  'Tour Number',
  'Tour Name',
  'Stop Name',
  'Start Date',
  'End Date',
];
const tourDbids = [
  'tourNumber',
  'tourName',
  'tourStopName',
  'tourStartDate',
  'tourEndDate',
];

/**
 * postTour - Adds a "Tour"
 * @returns {Array} - Array of tours
 */
exports.postTour = async (ctx, next) => {
  console.log('HERE AT LEAST');
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    tourFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      console.log(ctx.request.body);
      const tour = new Tour({
        tourNumber: ctx.request.body['Tour Number'],
        tourName: ctx.request.body['Tour Name'],
        tourStopName: ctx.request.body['Stop Name'],
        tourStartDate: ctx.request.body['Start Date'],
        tourEndDate: ctx.request.body['End Date'],
      });
      await tour.save();
      ctx.status = 200;
      ctx.body = { tour: tour };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + articleFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid Tour:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + tourFields[i],
      )}`,
    };
    console.log(ctx.body);
    await next();
  }
};

/**
 * getTOURS  - Returns JSON for all TOURS
 * @returns {Array} - Array of TOURS
 */
exports.getTours = async (ctx, next) => {
  try {
    const tours = await Tour.find({});
    ctx.status = 200;
    ctx.body = { allTours: tours };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getTour  - Returns JSON for specified tour
 * @returns {Object}  - Single tour object
 */
exports.getTour = async (ctx, next) => {
  try {
    const tour = await Tour.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { TourFound: tour };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editTour  - Edits single tour
 */
exports.editTour = async (ctx, next) => {
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    tourDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      await Tour.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { TourUpdated: 'Updated Tour Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + articleDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid Tour:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + tourFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteTour  - Deletes single user
 */
exports.deleteTour = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    console.log(ctx);
    await Tour.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
