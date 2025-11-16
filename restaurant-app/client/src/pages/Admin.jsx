import React, { useEffect, useState } from 'react'
import { fetchMenu, adminAddItem, adminUpdateItem, adminDeleteItem, adminGetOrders } from '../api'

export default function Admin(){
  const [items, setItems] = useState([]);
  const [pass, setPass] = useState('');
  const [form, setForm] = useState({name:'',description:'',price:''});
  const [editing, setEditing] = useState(null);
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const all = await fetchMenu();
    setItems(all);
  }
  useEffect(()=> load(), []);

  const add = async () => {
    if(!pass) return alert('Enter admin password (header x-admin-pass)');
    const res = await adminAddItem(form, pass);
    if(res.id){ setForm({name:'',description:'',price:''}); load(); }
    else alert('Error');
  }
  const startEdit = (it) => setEditing(it);
  const saveEdit = async () => {
    if(!pass) return alert('Enter admin password');
    await adminUpdateItem(editing.id, editing, pass);
    setEditing(null); load();
  }
  const del = async (id) => {
    if(!pass) return alert('Enter admin password');
    if(!confirm('Delete item?')) return;
    await adminDeleteItem(id, pass); load();
  }
  const fetchOrders = async () => {
    if(!pass) return alert('Enter admin password');
    const res = await adminGetOrders(pass);
    setOrders(res);
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <div className="card" style={{marginBottom:12}}>
        <div className="form-row">
          <input className="input" placeholder="Admin password (default admin123)" value={pass} onChange={e=>setPass(e.target.value)} />
          <button className="btn" onClick={fetchOrders}>Load Orders</button>
        </div>
        <h3>Orders</h3>
        {orders.length===0 ? <div className="small">No orders loaded</div> :
          <table className="table">
            <thead><tr><th>ID</th><th>Name</th><th>Total</th><th>Created</th></tr></thead>
            <tbody>
              {orders.map(o=> <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.name}</td>
                <td>${o.total.toFixed(2)}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
              </tr>)}
            </tbody>
          </table>}
      </div>

      <div className="card" style={{marginBottom:12}}>
        <h3>{editing ? 'Edit Item' : 'Add Item'}</h3>
        <div className="form-row">
          <input className="input" placeholder="Name" value={editing ? editing.name : form.name}
            onChange={e=> editing ? setEditing({...editing, name:e.target.value}) : setForm({...form, name:e.target.value})} />
        </div>
        <div className="form-row">
          <input className="input" placeholder="Description" value={editing ? editing.description : form.description}
            onChange={e=> editing ? setEditing({...editing, description:e.target.value}) : setForm({...form, description:e.target.value})} />
        </div>
        <div className="form-row">
          <input className="input" placeholder="Price" value={editing ? editing.price : form.price}
            onChange={e=> editing ? setEditing({...editing, price:e.target.value}) : setForm({...form, price:e.target.value})} />
        </div>
        <div style={{display:'flex',gap:8}}>
          {editing ? (
            <>
              <button className="btn" onClick={saveEdit}>Save</button>
              <button className="btn" style={{background:'#888'}} onClick={()=>setEditing(null)}>Cancel</button>
            </>
          ) : <button className="btn" onClick={add}>Add Item</button>}
        </div>
      </div>

      <h3>Menu Items</h3>
      <div className="grid">
        {items.map(it=>(
          <div key={it.id} className="card">
            <h4>{it.name}</h4>
            <p className="small">{it.description}</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>${it.price.toFixed(2)}</div>
              <div>
                <button className="btn" onClick={()=>startEdit(it)}>Edit</button>
                <button className="btn" style={{background:'#d9534f',marginLeft:8}} onClick={()=>del(it.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
