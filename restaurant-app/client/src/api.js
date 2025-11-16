const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function fetchMenu(q=''){
  const res = await fetch(`${BASE}/api/menu${q?`?q=${encodeURIComponent(q)}`:''}`);
  return res.json();
}
export async function fetchItem(id){
  const res = await fetch(`${BASE}/api/menu/${id}`);
  if(!res.ok) throw new Error('Not found');
  return res.json();
}
export async function placeOrder(payload){
  const res = await fetch(`${BASE}/api/orders`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}
// Admin helpers (pass header x-admin-pass)
export async function adminAddItem(body, pass){
  const res = await fetch(`${BASE}/api/admin/menu`, {
    method:'POST', headers:{'Content-Type':'application/json','x-admin-pass':pass}, body: JSON.stringify(body)
  });
  return res.json();
}
export async function adminUpdateItem(id, body, pass){
  const res = await fetch(`${BASE}/api/admin/menu/${id}`, {
    method:'PUT', headers:{'Content-Type':'application/json','x-admin-pass':pass}, body: JSON.stringify(body)
  });
  return res.json();
}
export async function adminDeleteItem(id, pass){
  const res = await fetch(`${BASE}/api/admin/menu/${id}`, {
    method:'DELETE', headers:{'x-admin-pass':pass}
  });
  return res.json();
}
export async function adminGetOrders(pass){
  const res = await fetch(`${BASE}/api/admin/orders`, {
    headers:{'x-admin-pass':pass}
  });
  return res.json();
}
