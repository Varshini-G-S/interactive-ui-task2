import React from 'react'
import { Link } from 'react-router-dom'

export default function Cart({ cart, updateQty, remove }){
  const total = cart.reduce((s,i)=>s + i.price*i.qty, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length===0 ? <div className="card">Cart empty. <Link to="/menu">Browse menu</Link></div> :
      <div>
        <table className="table card">
          <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr></thead>
          <tbody>
            {cart.map(it=>(
              <tr key={it.id}>
                <td>{it.name}</td>
                <td>
                  <input className="input" type="number" value={it.qty} min={1}
                    onChange={e=>updateQty(it.id, Number(e.target.value))} style={{width:80}} />
                </td>
                <td>${(it.price*it.qty).toFixed(2)}</td>
                <td><button className="btn" onClick={()=>remove(it.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div><strong>Total: ${total.toFixed(2)}</strong></div>
          <Link to="/checkout" className="btn">Checkout</Link>
        </div>
      </div>
      }
    </div>
  )
}
