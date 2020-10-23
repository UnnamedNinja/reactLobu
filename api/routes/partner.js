const Router = require('koa-router');
const PartnerControllers = require('../controllers/partner');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postPartner,
  getPartners,
  getPartner,
  editPartner,
  deletePartner
} = PartnerControllers;

const router = new Router({ prefix: '/partners' });
router.get('/', getPartners);
router.delete('/:id',jwtAuth, deletePartner);
router.put('/:id',  editPartner);
router.get('/:id', getPartner);
router.post('/add', postPartner);




module.exports = router;
