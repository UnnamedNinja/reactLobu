const Router = require('koa-router');
const FuelPriceControllers = require('../controllers/fuelpricedata');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postFuelPrice,
  getFuelPrices,
  getFuelPrice,
  editFuelPrice,
  deleteFuelPrice
} = FuelPriceControllers;

const router = new Router({ prefix: '/fuelprice' });
router.get('/', getFuelPrices);
router.delete('/:id',jwtAuth, deleteFuelPrice);
router.put('/:id',  editFuelPrice);
router.get('/:id', getFuelPrice);
router.post('/add', postFuelPrice);




module.exports = router;
