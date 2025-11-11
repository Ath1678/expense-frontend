const BASE_URL = "https://expense-tracker-backend-kqge.onrender.com";

export async function getExpenses() {
  try {
    const res = await fetch(`${BASE_URL}/api/expenses`);
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("❌ BAD DATA", data);
      return [];
    }
    return data;
  } catch (err) {
    console.error("❌ API ERROR:", err);
    return [];
  }
}
