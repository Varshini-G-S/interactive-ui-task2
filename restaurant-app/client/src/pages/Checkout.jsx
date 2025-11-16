import React, { useState } from 'react'
import { placeOrder } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Checkout({ cart, clearCart }){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const total = cart.reduce((s,i)=>s + i.price*i.qty, 0);

  const submit = async () => {
    if(cart.length===0) return alert('Cart empty');
    setLoading(true);
    const payload = { items: cart.map(({id,name,price,qty})=>({id,name,price,qty})), name, phone, address, total };
    const res = await placeOrder(payload);
    setLoading(false);
    if(res.orderId){
      clearCart();
      alert('Order placed! ID: ' + res.orderId);
      nav('/');
    } else {
      alert('Error placing order');
    }
  }

  return (
    <div>
      <h2>Checkout</h2>
      <div className="card">
        <div className="form-row"><input className="input" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div className="form-row"><input className="input" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} /></div>
        <div className="form-row"><textarea className="input" rows={3} placeholder="Delivery address" value={address} onChange={e=>setAddress(e.target.value)} /></div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div><strong>Total: ${total.toFixed(2)}</strong></div>
          <button className="btn" onClick={submit} disabled={loading}>{loading ? 'Placing...' : 'Place Order'}</button>
        </div>
      </div>
    </div>
  )
}
