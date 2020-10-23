const Router = require('koa-router');
const CarrierControllers = require('../controllers/carrier');
const authControllers = require('../controllers/auth');

const { jwtAuth } = authControllers;
const { postCarrier, getCarriers, getCarrier, editCarrier, deleteCarrier } = CarrierControllers;

const router = new Router({ prefix: '/Carriers' });
router.get('/', getCarriers);
router.delete('/:id', jwtAuth, deleteCarrier);
router.put('/:id', editCarrier);
router.get('/:id', getCarrier);
router.post('/add', postCarrier);

module.exports = router;
