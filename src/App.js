import React, { useEffect, useState } from "react";
import ExpenseService from "./ExpenseService";
import Analytics from "./Analytics";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = await ExpenseService.getExpenses();
    setExpenses(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1> Expense Tracker</h1>
      <Analytics expenses={expenses} />

      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.title} — ₹{e.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
