import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchItem } from '../api'

export default function Item({ addToCart }){
  const { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(()=>{
    fetchItem(id).then(setItem).catch(()=>setItem(null));
  }, [id])
  if(!item) return <div className="card">Loading...</div>
  return (
    <div>
      <div className="card" style={{display:'flex',gap:20}}>
        <div style={{flex:1}}>
          <h2>{item.name}</h2>
          <p className="small">{item.description}</p>
          <p><strong>${item.price.toFixed(2)}</strong></p>
          <button className="btn" onClick={()=>addToCart(item)}>Add to cart</button>
        </div>
        <div style={{width:220}}>
          <div style={{height:180,background:'#eee',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>Image</div>
        </div>
      </div>
    </div>
  )
}
