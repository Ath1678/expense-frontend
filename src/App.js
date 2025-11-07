import { useEffect, useMemo, useState } from "react";
import {
  AppBar, Toolbar, Typography, Container, Paper,
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, Stack, MenuItem, Box, Chip, Divider,
  Card, CardContent, Grid
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Analytics from "./components/Analytics";
import dayjs from "dayjs";

import {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  getByCategory
} from "./services/ExpenseService";

const CATEGORIES = ["Food", "Travel", "Utilities", "Entertainment", "Shopping", "Other"];

export default function App() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const [filterCat, setFilterCat] = useState("");

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setCategory("");
    setAmount("");
    setDate("");
    setNotes("");
  };

  const loadAll = () =>
    getExpenses().then((res) => {
      const list = Array.isArray(res.data) ? res.data : [];
      setRows(list);
    });

  const loadByCategory = (cat) => {
    if (!cat) return loadAll();
    return getByCategory(cat).then((res) => {
      const list = Array.isArray(res.data) ? res.data : [];
      setRows(list);
    });
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      title,
      category,
      amount: Number(amount),
      date: date || null,
      notes: notes || null,
    };

    if (editingId) {
      await updateExpense(editingId, payload);
    } else {
      await createExpense(payload);
    }

    await (filterCat ? loadByCategory(filterCat) : loadAll());
    setOpen(false);
    resetForm();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    await (filterCat ? loadByCategory(filterCat) : loadAll());
  };

  const onFilterChange = async (cat) => {
    setFilterCat(cat);
    await loadByCategory(cat);
  };

  const currency = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(n || 0));

  const totalSpent = rows.reduce(
    (sum, r) => sum + (Number(r.amount) || 0),
    0
  );

  const avgSpent = rows.length ? totalSpent / rows.length : 0;

  const currentMonth = dayjs().format("YYYY-MM");
  const monthlySpent = rows.reduce((sum, r) => {
    return r.date?.startsWith(currentMonth)
      ? sum + Number(r.amount || 0)
      : sum;
  }, 0);

  const categoryTotals = {};
  rows.forEach((r) => {
    const cat = r.category || "Other";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(r.amount || 0);
  });

  const highestCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  const openCreate = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (exp) => {
    setEditingId(exp.id);
    setTitle(exp.title ?? "");
    setCategory(exp.category ?? "");
    setAmount(exp.amount ?? "");
    setDate(exp.date ?? "");
    setNotes(exp.notes ?? "");
    setOpen(true);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Expense Tracker</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 6 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
            Add Expense
          </Button>

          <TextField
            select
            size="small"
            label="Filter by Category"
            value={filterCat}
            onChange={(e) => onFilterChange(e.target.value)}
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="">All</MenuItem>
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <Chip label={`Total: ${currency(totalSpent)}`} />
        </Stack>

        {/* ✅ summary cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card><CardContent> Total ₹{totalSpent.toFixed(0)}</CardContent></Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card><CardContent> Monthly ₹{monthlySpent.toFixed(0)}</CardContent></Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card><CardContent> Avg ₹{avgSpent.toFixed(0)}</CardContent></Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card><CardContent>{highestCategory}</CardContent></Card>
          </Grid>
        </Grid>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.title}</TableCell>
                  <TableCell>{r.category}</TableCell>
                  <TableCell align="right">{currency(r.amount)}</TableCell>
                  <TableCell>{r.date || "-"}</TableCell>
                  <TableCell>{r.notes || "-"}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => openEdit(r)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(r.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>{editingId ? "Edit Expense" : "Add Expense"}</DialogTitle>

          <DialogContent dividers>
            <Stack spacing={2}>
              <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </TextField>

              <TextField type="number" label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

              <TextField type="date" label="Date" value={date} InputLabelProps={{ shrink: true }}
                onChange={(e) => setDate(e.target.value)} />

              <TextField label="Notes" multiline rows={3}
                value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {editingId ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ✅ analytics placed outside dialog */}
        <Analytics />
      </Container>
    </Box>
  );
}
