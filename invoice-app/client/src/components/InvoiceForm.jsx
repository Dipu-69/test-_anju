import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const emptyInvoice = {
  invoiceNumber: 'INV-0001',
  currency: 'USD',
  client: { name: '', email: '', address: '' },
  company: { name: 'My Company', email: 'billing@company.com', address: '123 Street, City' },
  project: { title: '', description: '' },
  items: [{ description: '', quantity: 1, unitPrice: 0, taxRate: 0 }],
  notes: '',
  issueDate: dayjs().format('YYYY-MM-DD'),
  dueDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
  status: 'Unpaid'
};

function calcTotals(inv) {
  const subTotal = inv.items.reduce((s, it) => s + Number(it.quantity || 0) * Number(it.unitPrice || 0), 0);
  const taxTotal = inv.items.reduce((s, it) => {
    const line = Number(it.quantity || 0) * Number(it.unitPrice || 0);
    return s + line * (Number(it.taxRate || 0) / 100);
  }, 0);
  const total = subTotal + taxTotal;
  return { subTotal, taxTotal, total };
}

function downloadClientPdf(inv, totals) {
  const doc = new jsPDF();
  const y = 10;
  doc.setFontSize(16);
  doc.text(`Invoice ${inv.invoiceNumber}`, 14, y);
  doc.setFontSize(10);
  doc.text(`Issue: ${inv.issueDate}  Due: ${inv.dueDate}`, 14, y + 6);

  doc.text(`From:\n${inv.company.name}\n${inv.company.address}\n${inv.company.email}`, 14, y + 16);
  doc.text(`Bill To:\n${inv.client.name}\n${inv.client.address}\n${inv.client.email}`, 120, y + 16);

  const head = [['#', 'Description', 'Qty', 'Rate', 'Tax %', 'Amount']];
  const body = inv.items.map((it, i) => [
    i + 1,
    it.description || '',
    Number(it.quantity || 0),
    Number(it.unitPrice || 0).toFixed(2),
    Number(it.taxRate || 0),
    (Number(it.quantity || 0) * Number(it.unitPrice || 0) * (1 + Number(it.taxRate || 0) / 100)).toFixed(2)
  ]);

  doc.autoTable({
    startY: 60,
    head,
    body,
    theme: 'grid',
    headStyles: { fillColor: [240, 240, 240], textColor: 0 },
    styles: { fontSize: 9 }
  });

  const endY = doc.lastAutoTable.finalY || 60;
  doc.text(`Subtotal: ${totals.subTotal.toFixed(2)} ${inv.currency}`, 140, endY + 8);
  doc.text(`Tax: ${totals.taxTotal.toFixed(2)} ${inv.currency}`, 140, endY + 14);
  doc.setFont(undefined, 'bold');
  doc.text(`Total: ${totals.total.toFixed(2)} ${inv.currency}`, 140, endY + 20);
  doc.setFont(undefined, 'normal');

  doc.save(`invoice-${inv.invoiceNumber}.pdf`);
}

export default function InvoiceForm({ onSaved }) {
  const [inv, setInv] = useState(emptyInvoice);

  const totals = useMemo(() => calcTotals(inv), [inv]);

  const setField = (path, value) => {
    setInv((prev) => {
      const copy = structuredClone(prev);
      const parts = path.split('.');
      let cur = copy;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  const setItemField = (idx, key, value) => {
    setInv((prev) => {
      const copy = structuredClone(prev);
      copy.items[idx][key] = value;
      return copy;
    });
  };

  const addItem = () =>
    setInv((prev) => ({ ...prev, items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, taxRate: 0 }] }));

  const removeItem = (idx) =>
    setInv((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));

  const save = async () => {
    const payload = { ...inv, ...totals };
    const res = await (await import('../api')).saveInvoice(payload);
    onSaved?.(res);
    alert('Invoice saved');
  };

  const status =
    inv.status === 'Paid'
      ? 'Paid'
      : new Date(inv.dueDate) < new Date()
      ? 'Overdue'
      : 'Unpaid';

  return (
    <div className="card">
      <h2>Create Invoice</h2>

      <div className="grid">
        <label>
          Invoice #
          <input value={inv.invoiceNumber} onChange={(e) => setField('invoiceNumber', e.target.value)} />
        </label>
        <label>
          Currency
          <input value={inv.currency} onChange={(e) => setField('currency', e.target.value)} />
        </label>
        <label>
          Issue Date
          <input type="date" value={inv.issueDate} onChange={(e) => setField('issueDate', e.target.value)} />
        </label>
        <label>
          Due Date
          <input type="date" value={inv.dueDate} onChange={(e) => setField('dueDate', e.target.value)} />
        </label>
        <label>
          Status
          <select value={inv.status} onChange={(e) => setField('status', e.target.value)}>
            <option>Unpaid</option>
            <option>Paid</option>
          </select>
        </label>
        <div className={`status ${status.toLowerCase()}`}>Current: {status}</div>
      </div>

      <h3>Company</h3>
      <div className="grid">
        <label>
          Name
          <input value={inv.company.name} onChange={(e) => setField('company.name', e.target.value)} />
        </label>
        <label>
          Email
          <input value={inv.company.email} onChange={(e) => setField('company.email', e.target.value)} />
        </label>
        <label className="col-span-2">
          Address
          <input value={inv.company.address} onChange={(e) => setField('company.address', e.target.value)} />
        </label>
      </div>

      <h3>Client</h3>
      <div className="grid">
        <label>
          Name
          <input value={inv.client.name} onChange={(e) => setField('client.name', e.target.value)} />
        </label>
        <label>
          Email
          <input value={inv.client.email} onChange={(e) => setField('client.email', e.target.value)} />
        </label>
        <label className="col-span-2">
          Address
          <input value={inv.client.address} onChange={(e) => setField('client.address', e.target.value)} />
        </label>
      </div>

      <h3>Project</h3>
      <div className="grid">
        <label>
          Title
          <input value={inv.project.title} onChange={(e) => setField('project.title', e.target.value)} />
        </label>
        <label className="col-span-2">
          Description
          <input value={inv.project.description} onChange={(e) => setField('project.description', e.target.value)} />
        </label>
      </div>

      <h3>Items</h3>
      <div className="items">
        <div className="item header">
          <div>Description</div>
          <div>Qty</div>
          <div>Rate</div>
          <div>Tax %</div>
          <div></div>
        </div>
        {inv.items.map((it, idx) => (
          <div className="item" key={idx}>
            <input
              placeholder="Description"
              value={it.description}
              onChange={(e) => setItemField(idx, 'description', e.target.value)}
            />
            <input
              type="number"
              min="0"
              value={it.quantity}
              onChange={(e) => setItemField(idx, 'quantity', Number(e.target.value))}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={it.unitPrice}
              onChange={(e) => setItemField(idx, 'unitPrice', Number(e.target.value))}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={it.taxRate}
              onChange={(e) => setItemField(idx, 'taxRate', Number(e.target.value))}
            />
            <button className="danger" onClick={() => removeItem(idx)}>
              ✕
            </button>
          </div>
        ))}
        <button onClick={addItem}>+ Add Item</button>
      </div>

      <label className="col-span-2">
        Notes
        <textarea value={inv.notes} onChange={(e) => setField('notes', e.target.value)} />
      </label>

      <div className="totals">
        <div>Subtotal: {totals.subTotal.toFixed(2)} {inv.currency}</div>
        <div>Tax: {totals.taxTotal.toFixed(2)} {inv.currency}</div>
        <div className="grand">Total: {totals.total.toFixed(2)} {inv.currency}</div>
      </div>

      <div className="actions">
        <button onClick={() => downloadClientPdf(inv, totals)}>Download PDF (Browser)</button>
        <button className="primary" onClick={save}>Save Invoice</button>
      </div>
    </div>
  );
}