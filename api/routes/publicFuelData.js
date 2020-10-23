const Router = require('koa-router');
const PublicFuelDataControllers = require('../controllers/publicFuelData');
const authControllers = require('../controllers/auth');

const { jwtAuth } = authControllers;
const {

  getPublicFuelData,

} = PublicFuelDataControllers;

const router = new Router({ prefix: '/publicfueldata' });
router.get('/', getPublicFuelData);

module.exports = router;
