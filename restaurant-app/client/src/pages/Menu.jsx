import React, { useEffect, useState } from 'react'
import { fetchMenu } from '../api'
import ProductCard from '../components/ProductCard'

export default function Menu({ addToCart }){
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  useEffect(()=> {
    fetchMenu('').then(setItems);
  }, []);
  const search = async () => {
    const res = await fetchMenu(q);
    setItems(res);
  }
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>Menu</h2>
        <div className="form-row">
          <input className="input" placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn" onClick={search}>Search</button>
        </div>
      </div>
      <div className="grid">
        {items.map(it => <ProductCard key={it.id} item={it} onAdd={addToCart} />)}
      </div>
    </div>
  )
}
