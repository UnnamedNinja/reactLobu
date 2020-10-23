const Router = require('koa-router');
const ContractorControllers = require('../controllers/contractor');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postContractor,
  getContractors,
  getContractor,
  editContractor,
  deleteContractor
} = ContractorControllers;

const router = new Router({ prefix: '/Contractors' });
router.get('/', getContractors);
router.delete('/:id',jwtAuth, deleteContractor);
router.put('/:id',  editContractor);
router.get('/:id', getContractor);
router.post('/add', postContractor);




module.exports = router;
