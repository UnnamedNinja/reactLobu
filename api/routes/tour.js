const Router = require('koa-router');
const TourControllers = require('../controllers/tour');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postTour,
  getTours,
  getTour,
  editTour,
  deleteTour
} = TourControllers;

const router = new Router({ prefix: '/tours' });
router.get('/', getTours);
router.delete('/:id',jwtAuth, deleteTour);
router.put('/:id',  editTour);
router.get('/:id', getTour);
router.post('/add', postTour);




module.exports = router;
