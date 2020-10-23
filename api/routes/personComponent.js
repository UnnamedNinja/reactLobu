const Router = require('koa-router');
const PersonComponentControllers = require('../controllers/personComponent');
const authControllers = require('../controllers/auth');

const { jwtAuth } = authControllers;
const {
  postPersonComponent,
  getPersonComponents,
  getPersonComponent,
  editPersonComponent,
  deletePersonComponent,
} = PersonComponentControllers;

const router = new Router({ prefix: '/personComponents' });
router.get('/', getPersonComponents);
router.delete('/:id', jwtAuth, deletePersonComponent);
router.put('/:id', editPersonComponent);
router.get('/:id', getPersonComponent);
router.post('/add', postPersonComponent);

module.exports = router;
