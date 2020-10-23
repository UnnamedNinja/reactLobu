const userUtils = require('../utils/user-utils');
const validationUtils = require('../utils/validation-utils');
const request = require("request-promise");
const cheerio = require("cheerio");

const { standardizeUser } = userUtils;
const { filterSensitiveData } = validationUtils;



/**
 * getUser  - Returns JSON for specified user
 * @returns {Object}  - Single user object
 */
exports.getPublicFuelData = async (ctx, next) => {
  try {
    console.log("WHOOPIE!");
    //const result = await request.get("http://codingwithstefan.com/table-example");
    const result = await request.get("https://www.mwv.de/statistiken/verbraucherpreise/");
    const $ = cheerio.load(result);
    let allFuelData =[];
    $('#table_1 > tbody > tr > td ').each((index, element) => {
      console.log($(element).text());
      allFuelData.push($(element).text());
    });
    ctx.status = 200;
    ctx.body = { fuelData: allFuelData };

    await next();
  } catch (err) {
    ctx.throw(500, err);
  }
};
