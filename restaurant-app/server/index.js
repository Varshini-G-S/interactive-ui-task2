const express = require('express');
const cors = require('cors');
const { Low, JSONFile } = require('lowdb');
const { nanoid } = require('nanoid');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initDB(){
  await db.read();
  db.data = db.data || { menu: [], orders: [] };
  await db.write();
}
initDB();

// Public endpoints

// GET /api/menu - list menu items
app.get('/api/menu', async (req, res) => {
  await db.read();
  const q = (req.query.q || '').toLowerCase();
  let items = db.data.menu;
  if(q) items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  res.json(items);
});

// GET /api/menu/:id
app.get('/api/menu/:id', async (req, res) => {
  await db.read();
  const item = db.data.menu.find(i => i.id === req.params.id);
  if(!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST /api/orders - place order
app.post('/api/orders', async (req, res) => {
  await db.read();
  const { items, name, phone, address, total } = req.body;
  if(!items || items.length === 0) return res.status(400).json({ error: 'No items' });
  const order = {
    id: nanoid(),
    items,
    name,
    phone,
    address,
    total,
    status: 'received',
    createdAt: new Date().toISOString()
  };
  db.data.orders.push(order);
  await db.write();
  res.json({ success: true, orderId: order.id });
});

// Admin endpoints (simple password check via header x-admin-pass)
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

// middleware
function adminAuth(req,res,next){
  const pass = req.headers['x-admin-pass'];
  if(pass !== ADMIN_PASS) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// CRUD menu for admin
app.post('/api/admin/menu', adminAuth, async (req,res) => {
  await db.read();
  const { name, description, price, image } = req.body;
  const item = { id: nanoid(), name, description, price: Number(price), image: image || '' };
  db.data.menu.push(item);
  await db.write();
  res.json(item);
});

app.put('/api/admin/menu/:id', adminAuth, async (req,res) => {
  await db.read();
  const idx = db.data.menu.findIndex(i => i.id === req.params.id);
  if(idx === -1) return res.status(404).json({ error: 'Not found' });
  const { name, description, price, image } = req.body;
  db.data.menu[idx] = { ...db.data.menu[idx], name, description, price: Number(price), image: image || '' };
  await db.write();
  res.json(db.data.menu[idx]);
});

app.delete('/api/admin/menu/:id', adminAuth, async (req,res) => {
  await db.read();
  db.data.menu = db.data.menu.filter(i => i.id !== req.params.id);
  await db.write();
  res.json({ success: true });
});

// Admin: list orders
app.get('/api/admin/orders', adminAuth, async (req,res) => {
  await db.read();
  res.json(db.data.orders.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
