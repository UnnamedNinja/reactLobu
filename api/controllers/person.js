const Person = require('../models/person');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

const personFields = [
  'Type',
  // 'role',
  // 'Account Manager', // for now
  'Salutation',
  'First Name',
  'Surname',
  'Position',
  'Department',
  'Phone',
  'Mobile Number',
  'Fax',
  'E-mail',
  'Comments',
];
const personDbids = [
  'type',
  // 'role',
  // 'isAccountManager',
  'salutation',
  'firstName',
  'surname',
  'position',
  'department',
  'phone',
  'mobileNumber',
  'fax',
  'email',
  'comments',
];

/**
 * postPerson - Adds a "Person"
 * @returns {Array} - Array of users
 */
exports.postPerson = async (ctx, next) => {
  console.log('HERE AT LEAST');
  console.log(ctx.request.body);
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    personFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      const person = new Person({
        type: ctx.request.body['Type'],
        isAccountManager: ctx.request.body['Account Manager'],
        salutation: ctx.request.body['Salutation'],
        firstName: ctx.request.body['First Name'],
        surname: ctx.request.body['Surname'],
        position: ctx.request.body['Position'],
        department: ctx.request.body['Department'],
        phone: ctx.request.body['Phone'],
        mobileNumber: ctx.request.body['Mobile Number'],
        fax: ctx.request.body['Fax'],
        email: ctx.request.body['E-mail'],
        provision: ctx.request.body['Provision'],
        value: ctx.request.body['Value'],
        comments: ctx.request.body['Comments'],
        commission: ctx.request.body['Commission'],
        calculation: ctx.request.body['Calculation'],

        // role: ctx.request.body['role'],
      });
      await person.save();
      ctx.status = 200;
      ctx.body = { person: person };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + personFields[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid person:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + personFields[i],
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
exports.getPersons = async (ctx, next) => {
  try {
    const persons = await Person.find({});
    ctx.status = 200;
    ctx.body = { allPersons: persons };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUsers  - Returns JSON for all users
 * @returns {Array} - Array of users
 */
exports.getFieldAgents = async (ctx, next) => {
  try {
    await Person.find({ isFieldAgent: true })
      .lean()
      .exec(async (err, docs) => {
        console.log(docs);

        ctx.status = 200;
        ctx.body = { allFieldAgents: docs };
        await next();
      });
  } catch (err) {
    ctx.throw(500, err);
  }
};

exports.getAccountManagers = async (ctx, next) => {
  try {
    const persons = await Person.find({});
    const managers = persons.filter((person) => {
      return person.isAccountManager;
    });
    console.log('managers:\n', managers);
    ctx.status = 200;
    ctx.body = { allPersons: managers };
    await next();
  } catch (err) {
    //ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getPerson = async (ctx, next) => {
  try {
    const person = await Person.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { PersonFound: person };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editPerson = async (ctx, next) => {
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    personDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      console.log(ctx.request.body);
      await Person.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { PersonUpdated: 'Updated Person Successfully' };
      await next();
    } catch (err) {
      ctx.throw(500, err);
    }
  } else {
    // console.log(
    //   `Post required the following fields but did not find them.${missingFieldIndexes.map(
    //     (i, index) => '\n' + personDbids[i],
    //   )}`,
    // );
    ctx.body = {
      error: `Invalid Person:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + personFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deletePerson = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Person.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
