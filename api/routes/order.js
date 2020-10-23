const Router = require('koa-router');
const OrderControllers = require('../controllers/order');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postOrder,
  getOrders,
  getOrder,
  editOrder,
  deleteOrder
} = OrderControllers;

const router = new Router({ prefix: '/Orders' });
router.get('/', getOrders);
router.delete('/:id',jwtAuth, deleteOrder);
router.put('/:id',  editOrder);
router.get('/:id', getOrder);
router.post('/add', postOrder);




module.exports = router;
