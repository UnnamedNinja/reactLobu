const Router = require('koa-router');
const clientControllers = require('../controllers/client');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postClient,
  getClients,
  getClient,
  editClient,
  deleteClient
} = clientControllers;

const router = new Router({ prefix: '/clients' });
router.get('/', getClients);
router.delete('/:id',jwtAuth, deleteClient);
router.put('/:id',  editClient);
router.get('/:id', getClient);
router.post('/add', postClient);




module.exports = router;
