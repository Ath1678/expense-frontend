import axios from "axios";

// ✅ Correct Base URL
const API_URL = process.env.REACT_APP_API_URL || "https://expense-tracker-backend-kqge.onrender.com";

// ✅ Main endpoint
const EXPENSES_URL = `${API_URL}/api/expenses`;

// ✅ CRUD
export const getExpenses = () => axios.get(EXPENSES_URL);

export const createExpense = (expense) => axios.post(EXPENSES_URL, expense);

export const deleteExpense = (id) => axios.delete(`${EXPENSES_URL}/${id}`);

export const updateExpense = (id, expense) => axios.put(`${EXPENSES_URL}/${id}`, expense);

// ✅ Optional helper
export const getByCategory = (category) =>
  axios.get(`${EXPENSES_URL}/category`, { params: { category } });
