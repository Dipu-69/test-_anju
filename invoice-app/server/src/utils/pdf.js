const puppeteer = require('puppeteer');

function currency(amount, code = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).format(amount || 0);
  } catch {
    return `${code} ${Number(amount || 0).toFixed(2)}`;
  }
}

function invoiceHtml(inv) {
  const rows = (inv.items || [])
    .map(
      (it, idx) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${idx + 1}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${it.description || ''}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${it.quantity || 0}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${currency(it.unitPrice, inv.currency)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${(it.taxRate || 0)}%</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${currency(
          (it.quantity || 0) * (it.unitPrice || 0) * (1 + (it.taxRate || 0) / 100),
          inv.currency
        )}</td>
      </tr>`
    )
    .join('');
  const issue = inv.issueDate ? new Date(inv.issueDate).toLocaleDateString() : '';
  const due = inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '';
  const status = inv.status || 'Unpaid';
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; margin: 24px; color: #222; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .brand h1 { margin: 0; font-size: 24px; }
        .muted { color: #666; font-size: 12px; }
        .badge { padding: 4px 8px; border-radius: 6px; font-size: 12px; text-transform: uppercase; letter-spacing: .5px; }
        .badge.paid { background: #e6f7ef; color: #0b7a4b; }
        .badge.unpaid { background: #fff4e5; color: #a05a00; }
        .badge.overdue { background: #ffe6e6; color: #a30000; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 8px; border-bottom: 2px solid #ddd; background: #fafafa; }
        .totals { margin-top: 8px; width: 40%; margin-left: auto; }
        .totals td { padding: 6px; }
        .right { text-align: right; }
        .small { font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="brand">
          <h1>Invoice ${inv.invoiceNumber || ''}</h1>
          <div class="muted">${inv.company?.name || ''}<br/>${inv.company?.address || ''}<br/>${inv.company?.email || ''}</div>
        </div>
        <div style="text-align:right">
          <div class="muted">Issue: ${issue}</div>
          <div class="muted">Due: ${due}</div>
          <div class="muted">Currency: ${inv.currency || 'USD'}</div>
          <div class="badge ${status.toLowerCase()}">${status}</div>
        </div>
      </div>

      <div style="display:flex; gap: 24px; margin-bottom: 12px">
        <div style="flex:1">
          <strong>Bill To</strong>
          <div class="muted">${inv.client?.name || ''}<br/>${inv.client?.address || ''}<br/>${inv.client?.email || ''}</div>
        </div>
        <div style="flex:1">
          <strong>Project</strong>
          <div class="muted">${inv.project?.title || ''}<br/>${inv.project?.description || ''}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr><th>#</th><th>Description</th><th class="right">Qty</th><th class="right">Rate</th><th class="right">Tax</th><th class="right">Amount</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <table class="totals">
        <tr><td class="right">Subtotal</td><td class="right">${currency(inv.subTotal, inv.currency)}</td></tr>
        <tr><td class="right">Tax</td><td class="right">${currency(inv.taxTotal, inv.currency)}</td></tr>
        <tr><td class="right"><strong>Total</strong></td><td class="right"><strong>${currency(inv.total, inv.currency)}</strong></td></tr>
      </table>

      <p class="small">Notes: ${inv.notes || ''}</p>
    </body>
  </html>
  `;
}

async function generatePdfBuffer(inv) {
  let browser;
  try {
    const html = invoiceHtml(inv);
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '16mm', right: '16mm' }
    });
    await page.close();
    await browser.close();
    return buffer;
  } catch (e) {
    if (browser) await browser.close();
    throw e;
  }
}

module.exports = { generatePdfBuffer };