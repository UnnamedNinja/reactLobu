const Router = require('koa-router');
const PersonControllers = require('../controllers/person');
const authControllers = require('../controllers/auth');

const { jwtAuth } = authControllers;
const {
  postPerson,
  getPersons,
  getPerson,
  editPerson,
  deletePerson,
  getFieldAgents,
  getAccountManagers,
} = PersonControllers;

const router = new Router({ prefix: '/persons' });
router.get('/fieldAgents', getFieldAgents);
router.get('/accountManagers', getAccountManagers);
router.get('/', getPersons);
router.delete('/:id', jwtAuth, deletePerson);
router.put('/:id', editPerson);
router.get('/:id', getPerson);

router.post('/add', postPerson);

module.exports = router;
