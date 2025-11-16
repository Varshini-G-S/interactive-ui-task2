import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <div className="card" style={{padding:20,marginBottom:16}}>
        <h1>Welcome to MyRestaurant</h1>
        <p className="small">Tasty food delivered fast. Explore our menu and order now.</p>
        <Link to="/menu" className="btn" style={{marginTop:12}}>View Menu</Link>
      </div>
      <div className="grid">
        <div className="card"><h3>Free Delivery</h3><p className="small">On orders above $20</p></div>
        <div className="card"><h3>Fresh Ingredients</h3><p className="small">Sourced locally</p></div>
        <div className="card"><h3>Easy Payments</h3><p className="small">Cash or card</p></div>
      </div>
    </div>
  )
}
