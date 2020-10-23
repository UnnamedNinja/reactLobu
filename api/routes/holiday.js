const Router = require('koa-router');
const HolidayControllers = require('../controllers/holiday');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postHoliday,
  getHoliday,
  getHolidays,
  editHoliday,
  deleteHoliday
} = HolidayControllers;

const router = new Router({ prefix: '/holidays' });
router.get('/', getHolidays);
router.delete('/:id',jwtAuth, deleteHoliday);
router.put('/:id',  editHoliday);
router.get('/:id', getHoliday);
router.post('/add', postHoliday);




module.exports = router;
