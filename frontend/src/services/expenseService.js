import api from './api';

export const expenseService = {
  getExpenses: async () => {
    const response = await api.get('/expenses');
    return response.data;
  },

  getExpense: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  createExpense: async (expenseData) => {
    const response = await api.post('/expenses', expenseData);
    return response.data;
  },

  updateExpense: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  deleteExpense: async (id) => {
    await api.delete(`/expenses/${id}`);
  },

  getSummary: async () => {
    const response = await api.get('/expenses/stats/summary');
    return response.data;
  },
};
