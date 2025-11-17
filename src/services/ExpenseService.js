const API_URL = "https://expense-tracker-backend-1-jsb7.onrender.com/api/expenses";

export async function getExpenses() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addExpense(expense) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
}

export async function deleteExpense(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
