import React, { useEffect, useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import { fetchInvoices, getPdfUrl, emailInvoice } from './api';

export default function App() {
  const [invoices, setInvoices] = useState([]);
  const [sendingId, setSendingId] = useState(null);

  const load = async () => {
    try {
      const list = await fetchInvoices();
      setInvoices(list);
    } catch (e) {
      console.error(e);
      alert('Failed to load invoices');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const sendEmail = async (id, to) => {
    if (!to) return alert('Enter recipient email');
    try {
      setSendingId(id);
      await emailInvoice(id, { to });
      alert('Email sent!');
    } catch (e) {
      console.error(e);
      alert('Email failed');
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="container">
      <h1>🧾 Invoice Builder</h1>
      <InvoiceForm onSaved={load} />

      <h2 style={{ marginTop: 32 }}>Saved Invoices</h2>
      {invoices.length === 0 && <div>No invoices yet.</div>}
      <div className="list">
        {invoices.map((inv) => (
          <div className="list-item" key={inv._id}>
            <div>
              <strong>{inv.invoiceNumber}</strong> — {inv.client?.name || 'No client'} — {inv.total?.toFixed?.(2)} {inv.currency} — <em>{inv.status}</em>
            </div>
            <div className="row">
              <a className="btn" href={getPdfUrl(inv._id)} target="_blank" rel="noreferrer">Download PDF (Server)</a>
              <input id={`email-${inv._id}`} placeholder="client@example.com" defaultValue={inv.client?.email || ''} />
              <button
                className="btn primary"
                disabled={sendingId === inv._id}
                onClick={() => sendEmail(inv._id, document.getElementById(`email-${inv._id}`).value)}
              >
                {sendingId === inv._id ? 'Sending…' : 'Email Invoice'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}