import React, { useEffect, useState } from "react";
import ExpenseService from "./ExpenseService";
import Analytics from "./Analytics";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await ExpenseService.getExpenses();
      if (Array.isArray(data)) {
        setExpenses(data);
      } else {
        console.error("Invalid expense format", data);
        setExpenses([]);
      }
    } catch (err) {
      console.error("Error loading expenses", err);
      setExpenses([]);
    }
    setLoading(false);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      {/* ✅ Safe analytics */}
      {Array.isArray(expenses) && expenses.length > 0 && (
        <Analytics expenses={expenses} />
      )}

      <h3>All Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul>
          {expenses.map((exp) => (
            <li key={exp.id}>
              {exp.title} — ₹{exp.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
