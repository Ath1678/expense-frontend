import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { getExpenses, addExpense } from "./services/api";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);

  async function load() {
    const res = await getExpenses();
    setData(res);
  }

  async function handleAdd(x) {
    await addExpense(x);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  const total = data.reduce((s, x) => s + Number(x.amount), 0);

  return (
    <div>
      <Navbar />

      <div className="container">
        <SummaryCard total={total} />
        <ExpenseForm onAdd={handleAdd} />
        <ExpenseList items={data} />
      </div>
    </div>
  );
}
