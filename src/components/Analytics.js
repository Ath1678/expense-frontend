import React from "react";

export default function Analytics({ expenses }) {
  if (!expenses || expenses.length === 0)
    return <h3>No analytics available</h3>;

  const total = expenses.reduce(
    (sum, e) => sum + (parseFloat(e.amount) || 0),
    0
  );
  const avg = (total / expenses.length).toFixed(2);

  return (
    <div>
      <h2>Analytics</h2>
      <p>Total expenses: ₹{total}</p>
      <p>Average expense: ₹{avg}</p>
      <p>Count: {expenses.length}</p>
    </div>
  );
}
