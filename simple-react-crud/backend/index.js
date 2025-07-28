// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// 👇 Fake in-memory item data
let items = [];
let currentId = 1;

// ✅ Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'Ahmad12354%#@#') {
    res.status(200).json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// ✅ CRUD routes for /items

// Get all items
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// Create new item
app.post('/items', (req, res) => {
  const { name, email, role } = req.body;

  // Validate required fields
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Name, email, and role are required' });
  }

  const newItem = { id: currentId++, name, email, role };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, role } = req.body;

  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  // Optional: update only if fields are provided
  if (name) item.name = name;
  if (email) item.email = email;
  if (role) item.role = role;

  res.status(200).json(item);
});

// Delete item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  items.splice(index, 1);
  res.status(200).json({ message: 'Item deleted' });
});

// ✅ Add user routes (if you have any in routes/userRoutes.js)
app.use('/api/users', userRoutes);

// ✅ Root sanity route
app.get('/', (req, res) => {
  res.send('Backend is up and running');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
