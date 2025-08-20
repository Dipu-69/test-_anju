const router = require('express').Router();
const ctrl = require('../controllers/invoiceController');

router.get('/', ctrl.getInvoices);
router.post('/', ctrl.createInvoice);
router.get('/:id', ctrl.getInvoice);
router.put('/:id', ctrl.updateInvoice);
router.delete('/:id', ctrl.deleteInvoice);
router.get('/:id/pdf', ctrl.getInvoicePdf);
router.post('/:id/email', ctrl.emailInvoice);

module.exports = router;