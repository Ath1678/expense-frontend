const API_URL = "https://expense-tracker-backend-1-jsb7.onrender.com/api/expenses";

const ExpenseService = {
  getExpenses: async () => {
    const res = await fetch(API_URL);
    return res.json();
  },

  addExpense: async (expense) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
  },

  deleteExpense: async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};

export default ExpenseService;
