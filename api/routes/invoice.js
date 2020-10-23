const Router = require('koa-router');
const InvoiceControllers = require('../controllers/invoice');
const authControllers = require('../controllers/auth');

const { jwtAuth } = authControllers;
const { postInvoice, getInvoices, getInvoice, editInvoice, deleteInvoice } = InvoiceControllers;

const router = new Router({ prefix: '/Invoices' });
router.get('/', getInvoices);
router.delete('/:id', jwtAuth, deleteInvoice);
router.put('/:id', editInvoice);
router.get('/:id', getInvoice);
router.post('/add', postInvoice);

module.exports = router;
