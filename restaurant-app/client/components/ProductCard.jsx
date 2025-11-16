import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({item, onAdd}){
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p className="small">{item.description}</p>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
        <div><strong>${item.price.toFixed(2)}</strong></div>
        <div>
          <Link to={`/item/${item.id}`} className="small" style={{marginRight:8}}>View</Link>
          <button className="btn" onClick={()=>onAdd(item)}>Add</button>
        </div>
      </div>
    </div>
  )
}
