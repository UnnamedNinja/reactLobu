const Router = require('koa-router');
const GroupControllers = require('../controllers/group');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postGroup,
  getGroups,
  getGroup,
  editGroup,
  deleteGroup
} = GroupControllers;

const router = new Router({ prefix: '/groups' });
router.get('/', getGroups);
router.delete('/:id',jwtAuth, deleteGroup);
router.put('/:id',  editGroup);
router.get('/:id', getGroup);
router.post('/add', postGroup);




module.exports = router;
