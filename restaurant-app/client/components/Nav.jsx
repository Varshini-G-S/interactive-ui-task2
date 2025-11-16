import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav({cartCount=0}){
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/menu" style={{marginLeft:12}}>Menu</Link>
      <Link to="/cart" style={{marginLeft:12}}>Cart ({cartCount})</Link>
      <a href="/admin" style={{marginLeft:12,color:'#ffea'}}>Admin</a>
    </>
  )
}
