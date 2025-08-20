const Invoice = require('../models/Invoice');
const { generatePdfBuffer } = require('../utils/pdf');
const { sendInvoiceEmail } = require('../utils/email');

function computeTotals(inv) {
  const subTotal = (inv.items || []).reduce(
    (sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0),
    0
  );
  const taxTotal = (inv.items || []).reduce((sum, it) => {
    const line = (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0);
    return sum + line * ((Number(it.taxRate) || 0) / 100);
  }, 0);
  const total = subTotal + taxTotal;
  return { subTotal, taxTotal, total };
}

function computeStatus(status, dueDate) {
  if (status === 'Paid') return 'Paid';
  const due = dueDate ? new Date(dueDate) : null;
  if (due && due < new Date()) return 'Overdue';
  return status || 'Unpaid';
}

exports.createInvoice = async (req, res) => {
  try {
    const data = req.body;
    const totals = computeTotals(data);
    data.subTotal = totals.subTotal;
    data.taxTotal = totals.taxTotal;
    data.total = totals.total;
    data.status = computeStatus(data.status, data.dueDate);
    const inv = await Invoice.create(data);
    res.status(201).json(inv);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
};

exports.getInvoices = async (_req, res) => {
  try {
    const list = await Invoice.find().sort({ createdAt: -1 });
    const mapped = list.map((doc) => {
      const obj = doc.toObject();
      obj.status = computeStatus(obj.status, obj.dueDate);
      return obj;
    });
    res.json(mapped);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const inv = await Invoice.findById(req.params.id);
    if (!inv) return res.status(404).json({ error: 'Not found' });
    const obj = inv.toObject();
    obj.status = computeStatus(obj.status, obj.dueDate);
    res.json(obj);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const data = req.body;
    const totals = computeTotals(data);
    data.subTotal = totals.subTotal;
    data.taxTotal = totals.taxTotal;
    data.total = totals.total;
    data.status = computeStatus(data.status, data.dueDate);
    const inv = await Invoice.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(inv);
  } catch (e) {
    res.status(500).json({ error: 'Failed to update invoice' });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
};

exports.getInvoicePdf = async (req, res) => {
  try {
    const inv = await Invoice.findById(req.params.id);
    if (!inv) return res.status(404).json({ error: 'Not found' });
    const pdfBuffer = await generatePdfBuffer(inv.toObject());
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${inv.invoiceNumber}.pdf`,
      'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);
  } catch (e) {
    console.error('PDF error:', e);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};

exports.emailInvoice = async (req, res) => {
  try {
    const inv = await Invoice.findById(req.params.id);
    if (!inv) return res.status(404).json({ error: 'Not found' });
    const to = req.body.to || inv.client?.email;
    if (!to) return res.status(400).json({ error: 'Recipient email missing' });

    const pdfBuffer = await generatePdfBuffer(inv.toObject());
    await sendInvoiceEmail({
      to,
      subject: req.body.subject || `Invoice ${inv.invoiceNumber}`,
      text: req.body.text || 'Please find your invoice attached.',
      invoice: inv.toObject(),
      pdfBuffer
    });

    res.json({ ok: true });
  } catch (e) {
    console.error('Email error:', e);
    res.status(500).json({ error: 'Failed to email invoice' });
  }
};