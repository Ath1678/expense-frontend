import React from "react";

export default function Analytics({ expenses }) {
  if (!expenses || expenses.length === 0) return <p>No analytics</p>;

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount || 0), 0);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Analytics</h2>
      <h3>Total Expense: ₹{total}</h3>
    </div>
  );
}
