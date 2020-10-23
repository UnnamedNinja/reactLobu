const Router = require('koa-router');
const ContractorSpecialOrderControllers = require('../controllers/contractorSpecialOrder');
const authControllers = require('../controllers/auth');

const { jwtAuth } = authControllers;
const {
  postContractorSpecialOrder,
  getContractorSpecialOrders,
  getContractorSpecialOrder,
  editContractorSpecialOrder,
  deleteContractorSpecialOrder,
} = ContractorSpecialOrderControllers;

const router = new Router({ prefix: '/contractorSpecialOrders' });
router.get('/', getContractorSpecialOrders);
router.delete('/:id', jwtAuth, deleteContractorSpecialOrder);
router.put('/:id', editContractorSpecialOrder);
router.get('/:id', getContractorSpecialOrder);
router.post('/add', postContractorSpecialOrder);

module.exports = router;
