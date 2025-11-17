import React, { useEffect, useState } from "react";
import ExpenseService from "./services/ExpenseService";

export default function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Load expenses
  useEffect(() => {
    loadExpenses();
  }, []);

  async function loadExpenses() {
    const data = await ExpenseService.getExpenses();
    setExpenses(data || []);
  }

  // Add Expense
  async function addExpense() {
    if (!title || !amount || !date) {
      alert("Please enter Title, Amount, and Date");
      return;
    }

    const expense = {
      title,
      amount: Number(amount),
      category,
      date,
      notes
    };

    await ExpenseService.addExpense(expense);
    loadExpenses();

    // reset
    setTitle("");
    setAmount("");
    setCategory("General");
    setDate("");
    setNotes("");
  }

  // Delete expense
  async function deleteExpense(id) {
    await ExpenseService.deleteExpense(id);
    loadExpenses();
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Expense Tracker</h1>

      <div className="bg-white shadow-md p-6 rounded-lg max-w-2xl mx-auto">

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">

          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>General</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Entertainment</option>
          </select>

          <input
            className="border p-2 rounded"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <textarea
            className="border p-2 rounded col-span-2"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>

        </div>

        <button
          onClick={addExpense}
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded font-semibold"
        >
          + Add Expense
        </button>

        {/* Total */}
        <h2 className="text-xl font-bold mt-6">Total: ₹{total}</h2>

        {/* Table */}
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Title</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Category</th>
              <th className="p-2">Date</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="text-center border-t">
                <td className="p-2">{exp.title}</td>
                <td className="p-2">₹{exp.amount}</td>
                <td className="p-2">{exp.category}</td>
                <td className="p-2">{exp.date || "-"}</td>
                <td className="p-2">{exp.notes || "-"}</td>
                <td className="p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => deleteExpense(exp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
