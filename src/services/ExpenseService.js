const API_URL = process.env.REACT_APP_API_URL;

const getExpenses = async () => {
  const res = await fetch(`${API_URL}/api/expenses`);
  return await res.json();
};

const addExpense = async (data) => {
  await fetch(`${API_URL}/api/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export default {
  getExpenses,
  addExpense,
};
