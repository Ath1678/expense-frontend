import React, { useEffect, useState } from "react";
import { getExpenses, addExpense, deleteExpense } from "./services/ExpenseService";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    const data = await getExpenses();
    setExpenses(data);
  }

  async function handleAdd() {
    if (!title || !amount) return alert("Please fill all fields!");
    const newExpense = { title, amount: parseFloat(amount), category };
    await addExpense(newExpense);
    setTitle("");
    setAmount("");
    setCategory("General");
    fetchExpenses();
  }

  async function handleDelete(id) {
    await deleteExpense(id);
    fetchExpenses();
  }

  const total = expenses.reduce((sum, exp) => sum + (parseFloat(exp.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Expense Tracker
        </h1>

        {/* Form */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>General</option>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Entertainment</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-5 py-2 w-full sm:w-auto transition"
          >
            + Add Expense
          </button>
        </div>

        <hr className="my-4" />

        {/* Total */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Total: <span className="text-green-600 font-bold">₹{total}</span>
        </h2>

        {/* Expense List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50 text-gray-700 uppercase text-sm">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-gray-400">
                    No expenses added yet.
                  </td>
                </tr>
              ) : (
                expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{exp.title}</td>
                    <td className="px-4 py-3 text-blue-600 font-semibold">₹{exp.amount}</td>
                    <td className="px-4 py-3">{exp.category}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
