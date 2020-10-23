const Router = require('koa-router');
const ArticleControllers = require('../controllers/article');
const authControllers = require('../controllers/auth');

const {
  jwtAuth,
} = authControllers;
const {
  postArticle,
  getArticles,
  getArticle,
  editArticle,
  deleteArticle
} = ArticleControllers;

const router = new Router({ prefix: '/Articles' });
router.get('/', getArticles);
router.delete('/:id',jwtAuth, deleteArticle);
router.put('/:id',  editArticle);
router.get('/:id', getArticle);
router.post('/add', postArticle);




module.exports = router;
