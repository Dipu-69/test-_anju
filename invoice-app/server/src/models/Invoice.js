const mongoose = require('mongoose');

const LineItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    unitPrice: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0 } // percent
  },
  { _id: false }
);

const InvoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true },
    currency: { type: String, default: 'USD' },
    client: {
      name: String,
      email: String,
      address: String
    },
    company: {
      name: String,
      email: String,
      address: String
    },
    project: {
      title: String,
      description: String
    },
    items: [LineItemSchema],
    subTotal: Number,
    taxTotal: Number,
    total: Number,
    status: { type: String, enum: ['Paid', 'Unpaid', 'Overdue'], default: 'Unpaid' },
    notes: String,
    issueDate: Date,
    dueDate: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);