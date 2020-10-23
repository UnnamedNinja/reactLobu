const Article = require('../models/article');
const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;

// NOTE: these must be parallel arrays
const articleFields = [
  'Article-No',
  'Description',
  'Contractor Price',
  'Group',
  'Purchasing Price',
  'Calculation',
  'Value',
];
const articleDbids = [
  'articleNumber',
  'description',
  'contractorPrice',
  'group',
  'purchasingPrice',
  'calculation',
  'value',
];

/**
 * postArticle - Adds a "Article"
 * @returns {Array} - Array of users
 */
exports.postArticle = async (ctx, next) => {
  console.log('HERE AT LEAST');
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    articleFields,
    validationUtils.invalidPostValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      var articleCount = await Article.count({});
      articleCount+=1
      console.log(ctx.request.body);
      const article = new Article({
        articleNumber: articleCount,
        description: ctx.request.body.Description,
        contractorPrice: ctx.request.body['Contractor Price'],
        group: ctx.request.body.Group,
        purchasingPrice: ctx.request.body['Purchasing Price'],
        calculation: ctx.request.body['Calculation'],
        value: ctx.request.body.Value,
        clientPrice: ctx.request.body['Client Price'],
      });
      await article.save();
      ctx.status = 200;
      ctx.body = { article: article };
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
      error: `Invalid Article:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + articleFields[i],
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
exports.getArticles = async (ctx, next) => {
  try {
    const articles = await Article.find({});
    ctx.status = 200;
    ctx.body = { allArticles: articles };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getArticle = async (ctx, next) => {
  try {
    const article = await Article.findById(ctx.params.id);
    ctx.status = 200;
    ctx.body = { ArticleFound: article };
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};

/**
 * editUser  - Edits single user
 */
exports.editArticle = async (ctx, next) => {
  let missingFieldIndexes = validationUtils.findMissingRequiredFields(
    ctx.request.body,
    articleDbids,
    validationUtils.invalidPutValues,
  );
  if (missingFieldIndexes.length === 0) {
    try {
      // Allow users to edit all of their own information, but limited information
      // on other users. This could be controlled in other ways as well.

      await Article.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
      ctx.body = { ArticleUpdated: 'Updated Article Successfully' };
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
      error: `Invalid Article:\n\nMissing the following requried fields:\n ${missingFieldIndexes.map(
        (i, index) => '\n' + articleFields[i],
      )}`,
    };
    await next();
  }
};

/**
 * deleteUser  - Deletes single user
 */
exports.deleteArticle = async (ctx, next) => {
  console.log('SERVER DELETE CALLED');
  try {
    await Article.findOneAndRemove({ _id: ctx.params.id });
    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
