import axios from 'axios';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const baseURL = API_BASE ? `${API_BASE}/api` : '/api';

const api = axios.create({ baseURL });

export const fetchInvoices = () => api.get('/invoices').then((r) => r.data);
export const saveInvoice  = (data) => api.post('/invoices', data).then((r) => r.data);
export const emailInvoice = (id, payload) => api.post(`/invoices/${id}/email`, payload).then((r) => r.data);
export const getPdfUrl    = (id) => (API_BASE ? `${API_BASE}/api/invoices/${id}/pdf` : `/api/invoices/${id}/pdf`);

export default api;