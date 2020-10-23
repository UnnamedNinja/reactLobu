const Router = require('koa-router');
const BillRunControllers = require('../controllers/billrun');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postBillRun,
  getBillRuns,
  getBillRun,
  editBillRun,
  deleteBillRun
} = BillRunControllers;

const router = new Router({ prefix: '/billruns' });
router.get('/', getBillRuns);
router.delete('/:id',jwtAuth, deleteBillRun);
router.put('/:id',  editBillRun);
router.get('/:id', getBillRun);
router.post('/add', postBillRun);




module.exports = router;
