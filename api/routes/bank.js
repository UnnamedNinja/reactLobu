const Router = require('koa-router');
const BankControllers = require('../controllers/bank');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postBank,
  getBanks,
  getBank,
  editBank,
  deleteBank
} = BankControllers;

const router = new Router({ prefix: '/banks' });
router.get('/', getBanks);
router.delete('/:id',jwtAuth, deleteBank);
router.put('/:id',  editBank);
router.get('/:id', getBank);
router.post('/add', postBank);




module.exports = router;
