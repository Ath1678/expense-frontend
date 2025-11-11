const BASE_URL = "https://expense-tracker-backend-kqge.onrender.com";

export async function getExpenses() {
  try {
    const res = await fetch(`${BASE_URL}/api/expenses`);
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

export async function addExpense(expense) {
  try {
    await fetch(`${BASE_URL}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
  } catch (err) {
    console.error("Add Error:", err);
  }
}
