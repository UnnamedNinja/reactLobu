const Router = require('koa-router');
const ClientSpecialOrderControllers = require('../controllers/clientSpecialOrder');
const authControllers = require('../controllers/auth');

const { jwtAuth } = authControllers;
const {
  postClientSpecialOrder,
  getClientSpecialOrders,
  getClientSpecialOrder,
  editClientSpecialOrder,
  deleteClientSpecialOrder,
} = ClientSpecialOrderControllers;

const router = new Router({ prefix: '/clientSpecialOrders' });
router.get('/', getClientSpecialOrders);
router.delete('/:id', jwtAuth, deleteClientSpecialOrder);
router.put('/:id', editClientSpecialOrder);
router.get('/:id', getClientSpecialOrder);
router.post('/add', postClientSpecialOrder);

module.exports = router;
