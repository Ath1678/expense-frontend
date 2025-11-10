import React from "react";

const Analytics = ({ expenses }) => {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return <></>;
  }

  let total = 0;
  try {
    total = expenses.reduce((sum, item) => {
      const amt = Number(item.amount) || 0;
      return sum + amt;
    }, 0);
  } catch (err) {
    console.error("Analytics calculation error", err);
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Analytics</h2>
      <h3>Total Spent: ₹{total}</h3>
    </div>
  );
};

export default Analytics;
