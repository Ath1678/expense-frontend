const API_URL = "https://expense-tracker-backend-kqge.onrender.com";

export async function getExpenses() {
  try {
    const res = await fetch(`${API_URL}/api/expenses`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

export async function addExpense(expense) {
  try {
    await fetch(`${API_URL}/api/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
  } catch (err) {
    console.error("Add Error:", err);
  }
}
