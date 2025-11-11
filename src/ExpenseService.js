const BASE_URL = "https://expense-tracker-backend-kqge.onrender.com";

export async function getExpenses() {
  try {
    const res = await fetch(`${BASE_URL}/api/expenses`);
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("BAD API FORMAT:", data);
      return [];
    }

    return data;
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

export async function addExpense(expense) {
  try {
    const res = await fetch(`${BASE_URL}/api/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    console.log("SAVE RESULT", await res.json());
  } catch (err) {
    console.error("Add Error:", err);
  }
}
