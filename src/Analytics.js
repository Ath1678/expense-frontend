export default function Analytics({ expenses }) {
  if (!Array.isArray(expenses)) {
    console.warn("Analytics: not array", expenses);
    return null;
  }

  return (
    <div>
      <h2>Analytics</h2>
      {expenses.length === 0 ? (
        <p>No data</p>
      ) : (
        expenses.map((e) => <div key={e.id}>{e.title}</div>)
      )}
    </div>
  );
}
