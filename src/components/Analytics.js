import React from "react";

const Analytics = ({ expenses }) => {
  if (!Array.isArray(expenses)) return null;

  const total = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  return (
    <div>
      <h3>Total Spent: ₹{total.toFixed(2)}</h3>
    </div>
  );
};

export default Analytics;
