const validator = require('validator');
const ERRORS = require('../constants').ERRORS;
const IBAN = require('iban');

/**
 * responseValidator - Validate responses and return corresponding errors
 *
 * @param  {Object} req     the Koa request body
 * @param  {Array}  fields  an array of fields on the req to validate
 * @return {Object}         validated/sanitized request body
 */
const responseValidator = function responseValidator(req, fields) {
  const errors = [];
  const props = Object.keys(req);

  for (let i = 0; i < fields.length; i += 1) {
    const isPresent = props.indexOf(fields[i].name) !== -1;
    const isRequired = fields[i].required;

    if (!isPresent && isRequired) {
      switch (fields[i].name) {
        case 'email':
          errors.push({ error: ERRORS.INVALID_EMAIL });
          break;
        case 'name':
          if (!req.name || !req.name.first || !req.name.last) {
            errors.push({ error: ERRORS.INVALID_NAME });
          }
          break;
        case 'password':
          errors.push({ error: ERRORS.INVALID_PASSWORD });
          break;
        case 'passwordConfirm':
          errors.push({ error: ERRORS.PASSWORD_MUST_MATCH });
          break;
        default:
          errors.push({ error: ERRORS.INVALID_ENTRY });
          break;
      }
    } else {
      // Escape and sanitize inputs for security (validator only works on strings)
      if (typeof req[fields[i].name] === 'string') {
        req[fields[i].name] = validator.trim(req[fields[i].name]);
        // Evidently, React already escapes strings
        // req[fields[i].name] = validator.escape(req[fields[i].name]);
      }

      if (fields[i].name === 'email') {
        if (!validator.isEmail(req.email)) {
          errors.push({ error: ERRORS.INVALID_EMAIL });
        }
      }
      if (fields[i].name === 'password') {
        if (req.password && req.password.length < 8) {
          errors.push({ error: ERRORS.PASSWORD_TOO_SHORT });
        }
      }
      if (fields[i].name === 'passwordConfirm') {
        if (req.passwordConfirm !== req.password) {
          errors.push({ error: ERRORS.PASSWORD_MUST_MATCH });
        }
      }
    }
  }

  // If there are errors, return them, otherwise return the modified request body.
  if (errors && errors.length) {
    return errors;
  }
  return req;
};

/**
 * filterSensitiveData  - Filters out sensitive data from a request body
 *
 * @param  {Object} req     the Koa request body
 * @return {Object}         Body without sensitive fields
 */
const filterSensitiveData = (req) => {
  const newBody = {};
  const sensitiveKeys = ['password', 'billing'];

  Object.keys(req).forEach((item) => {
    if (sensitiveKeys.indexOf(item) === -1) {
      newBody[item] = req[item];
    }
  });

  return newBody;
};

const findMissingRequiredFields = (requestBody, fields, invalidValues) => {
  let missingFieldIndexes = [];

  fields.forEach((field, index) => {
    for (let i = 0; i < invalidValues.length; i++) {
      // console.log(requestBody, invalidValues[i], requestBody[field] === invalidValues[i]);
      if (requestBody[field] === invalidValues[i]) {
        missingFieldIndexes.push(index);
      }
    }
  });
  return missingFieldIndexes;
};

const validateIban = (iban) => {
  return iban !== undefined && IBAN.isValid(iban);
};

const validateEntitiesIbans = (entities, ibanVar) => {
  return entities.every((obj) => {
    return validateIban(obj[ibanVar]);
  });
};

const validateGermanPhoneNumber = (phoneNumber) => {
  /*
  German telephone numbers have no fixed length for area code and subscriber number (an open numbering plan).

  There are many ways to format a telephone number in Germany. The most prominent is DIN 5008 but the international format E.123 and Microsoft's canonical address format are also very common.

  Trunk access code is 0 and international call prefix code is 00.
  
  Form 	                  | Example
  --------------------------------------------
  DIN 5008 	              | 0AAAA BBBBBB
  DIN 5008 with Extension |	0AAAA BBBBBB-XX
  DIN 5008 international 	| +49 AAAA BBBBBB
  E.123 local 	          | (0AAAA) BBBBBB
  E.123 international 	  | +49 AAAA BBBBBB
  Microsoft 	            | +49 (AAAA) BBBBBB
  Old                     | 0AAAA-BBBBBB
  Very old                | 0AAAA/BBBBBB-XX

  Numbers are often written in blocks of two. Example: +49 (A AA) B BB BB (Note the blocks go from right to left)

  The very old format and E.123 local form are often used by older people but also for technical reasons. 
  */
  let validGerman = typeof phoneNumber === 'string' && phoneNumber.length >= 10;
  console.log(validGerman, phoneNumber);
  // [...phoneNumber].forEach((ch) => {
  //   console.log(ch === '(');
  //   console.log(ch === ')');
  //   console.log(!isNaN(ch));
  // });
  return validGerman && [...phoneNumber].every((ch) => ch === '(' || ch === ')' || !isNaN(ch));
};

const validateArray = (arr, validateContent) => {
  console.log('arr', arr);
  return arr.length >= 1 && arr.every((content) => validateContent(content));
};

const invalidPutValues = [null, ''];
const invalidPostValues = [undefined, ''];
const mobileErrorMessage =
  'Invalid mobile phone number(s).\nEnsure that mobile phone numbers entered are at least 10 numbers long.';

module.exports = {
  responseValidator,
  filterSensitiveData,
  findMissingRequiredFields,
  validateIban,
  validateEntitiesIbans,
  validateGermanPhoneNumber,
  validateArray,
  invalidPutValues,
  invalidPostValues,
  mobileErrorMessage,
};
