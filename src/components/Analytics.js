const Analytics = ({ expenses }) => {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return <></>;
  }

  let total = 0;
  try {
    total = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
  } catch (err) {
    console.error("Analytics calc error", err);
  }

  return (
    <div>
      <h3>Total Spent: ₹{total}</h3>
    </div>
  );
};

export default Analytics;
