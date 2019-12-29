import React from 'react'
import { Link } from 'react-router-dom'

export default function TopMenu() {
  return (
    <ul className="top-menu">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about" >About</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/counter">Counter</Link>
      </li>
    </ul>
  )
}
