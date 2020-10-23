const Router = require('koa-router');
const CompanyControllers = require('../controllers/company');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postCompany,
  getCompanys,
  getCompany,
  editCompany,
  deleteCompany
} = CompanyControllers;

const router = new Router({ prefix: '/companys' });
router.get('/', getCompanys);
router.delete('/:id',jwtAuth, deleteCompany);
router.put('/:id',  editCompany);
router.get('/:id', getCompany);
router.post('/add', postCompany);




module.exports = router;
