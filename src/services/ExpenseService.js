const API_URL = "https://expense-tracker-backend-kqge.onrender.com/api/expenses";

export async function getExpenses() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch expenses");
    return await res.json();
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    return [];
  }
}

export async function addExpense(expense) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error("Failed to add expense");
  } catch (err) {
    console.error("❌ Add Error:", err);
  }
}

export async function deleteExpense(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete expense");
  } catch (err) {
    console.error("❌ Delete Error:", err);
  }
}
