import React, { useEffect, useState } from "react";
import ExpenseService from "./ExpenseService";
import Analytics from "./Analytics";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await ExpenseService.getExpenses();
      setExpenses(res);
    } catch (e) {
      console.log("Fetch error", e);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await ExpenseService.addExpense(form);
      setForm({ title: "", amount: "" });
      loadData();
    } catch (e) {
      console.log("Save error", e);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>

      {/* Add Form */}
      <form onSubmit={onSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      {/* List */}
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            {e.title} — ₹{e.amount}
          </li>
        ))}
      </ul>

      <Analytics expenses={expenses} />
    </div>
  );
}

export default App;
