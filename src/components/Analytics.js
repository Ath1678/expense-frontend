import { useEffect, useState } from "react";
import { getExpenses } from "../services/ExpenseService";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FF0000", "#AF19FF", "#F5A623"];

export default function Analytics() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getExpenses().then((res) => {
      const rows = res.data ?? [];

      // --- Monthly totals ---
      const monthMap = {};
      rows.forEach((e) => {
        if (!e.date) return;
        const month = e.date.substring(0, 7); // YYYY-MM
        monthMap[month] = (monthMap[month] || 0) + Number(e.amount);
      });
      setMonthlyData(
        Object.keys(monthMap).map((m) => ({ month: m, amount: monthMap[m] }))
      );

      // --- Category totals ---
      const catMap = {};
      rows.forEach((e) => {
        const cat = e.category || "Unknown";
        catMap[cat] = (catMap[cat] || 0) + Number(e.amount);
      });
      setCategoryData(
        Object.keys(catMap).map((c) => ({ name: c, value: catMap[c] }))
      );
    });
  }, []);

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Analytics</h2>

      <h3>Monthly Expense</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Category Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            nameKey="name"
            dataKey="value"
            outerRadius={120}
            label
          >
            {categoryData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
