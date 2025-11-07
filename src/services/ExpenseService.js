import axios from "axios";

const API_URL = "https://expense-tracker-backend-kqge.onrender.com/api/expenses";

export const getExpenses = () => axios.get(API_URL);

export const createExpense = (expense) => axios.post(API_URL, expense);

export const deleteExpense = (id) => axios.delete(`${API_URL}/${id}`);

export const updateExpense = (id, expense) => axios.put(`${API_URL}/${id}`, expense);

// optional helper for category filter (Phase-3)
export const getByCategory = (category) =>
  axios.get(`${API_URL}/category`, { params: { category } });
