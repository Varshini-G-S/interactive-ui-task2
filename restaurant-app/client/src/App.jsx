import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Item from './pages/Item'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'

function App(){
  const [cart,setCart] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('cart')||'[]') }catch{ return []}
  });
  useEffect(()=> localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  const addToCart = (item) => {
    setCart(prev=>{
      const found = prev.find(p=>p.id===item.id);
      if(found) return prev.map(p=>p.id===item.id ? {...p, qty: p.qty+1} : p);
      return [...prev, {...item, qty:1}];
    });
  }
  const updateQty = (id, qty) => setCart(prev => prev.map(p=>p.id===id?{...p,qty}:p));
  const remove = (id) => setCart(prev => prev.filter(p=>p.id!==id));
  return (
    <div>
      <div className="header">
        <div style={{fontWeight:700}}>MyRestaurant</div>
        <div className="nav">
          <Nav cartCount={cart.reduce((s,i)=>s+i.qty,0)} />
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/item/:id" element={<Item addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQty={updateQty} remove={remove} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={()=>setCart([])} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
