import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

const ExpenseService = {
  getExpenses: async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/expenses`);
      return res.data;
    } catch (err) {
      console.error("Error fetching expenses:", err);
      return [];
    }
  },

  addExpense: async (expense) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/expenses`, expense);
      return res.data;
    } catch (err) {
      console.error("Error adding expense:", err);
      throw err;
    }
  },
};

export default ExpenseService;
