import React, { useState, useEffect } from "react";
import { getExpenses, addExpense } from "./ExpenseService";
import Analytics from "./Analytics";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getExpenses();
    setExpenses(Array.isArray(res) ? res : []);
  }

  async function handleAdd() {
    if (!title || !amount) return;
    await addExpense({ title, amount });
    setTitle("");
    setAmount("");
    load();
  }

  const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);

  return (
    <div>
      <h1>Expense Tracker</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>

      <h2>Total: {total}</h2>

      {expenses.map((e) => (
        <p key={e.id}>
           {e.title} — ₹{e.amount}
        </p>
      ))}

      <Analytics expenses={expenses} />
    </div>
  );
}

export default App;
