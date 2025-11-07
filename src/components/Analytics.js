// src/components/Analytics.js
import { useEffect, useState } from "react";
import { Paper, Typography, Stack, Chip } from "@mui/material";
import { getExpenses } from "../services/ExpenseService";

export default function Analytics() {
  const [rows, setRows] = useState([]);

  const loadData = () =>
    getExpenses().then((res) => {
      const list = Array.isArray(res.data) ? res.data : [];
      setRows(list);
    });

  useEffect(() => {
    loadData();
  }, []);

  const totalSpent = rows.reduce(
    (sum, r) => sum + (Number(r.amount) || 0),
    0
  );

  const categoryTotals = {};
  rows.forEach((r) => {
    const cat = r.category || "Other";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(r.amount || 0);
  });

  const highestCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  return (
    <Paper sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6">Analytics</Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Chip label={`Total: ₹${totalSpent}`} />
        <Chip label={`Top Category: ${highestCategory}`} />
      </Stack>
    </Paper>
  );
}
