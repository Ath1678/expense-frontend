import React, { useEffect, useState } from "react";
import { getExpenses, addExpense } from "./ExpenseService";
import Analytics from "./Analytics";
import "./App.css";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
  });
useEffect(() => {
  console.log("expenses:", expenses);
}, [expenses]);

const totalExpense = Array.isArray(expenses)
  ? expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0)
  : 0;

const categoryTotals = Array.isArray(expenses)
  ? expenses.reduce((acc, expense) => {
      const cat = expense.category || "Other";
      acc[cat] = (acc[cat] || 0) + (expense.amount || 0);
      return acc;
    }, {})
  : {};

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data || []);
    } catch (err) {
      console.error("Failed loading expenses:", err);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;

    await addExpense(form);
    setForm({ title: "", amount: "", category: "" });
    loadExpenses();
  };

  return (
    <div className="container">
      <h1 className="heading"> Expense Tracker</h1>

      {/* Add Expense Form */}
      <form className="form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button type="submit">Add</button>
      </form>

      {/* Expense List */}
      <h2>Expenses</h2>
      <ul className="list">
        {expenses.length === 0 && <p>No expenses found</p>}

        {expenses.map((exp) => (
          <li key={exp.id}>
            <span>{exp.title}</span>
            <span>₹{exp.amount}</span>
            <span>{exp.category || "-"}</span>
          </li>
        ))}
      </ul>

      <Analytics expenses={expenses} />
    </div>
  );
}
