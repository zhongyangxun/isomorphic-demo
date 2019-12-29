import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>Page not Found</h1>
      <Link to="/">
        Go back to homepage
      </Link>
    </div>
  )
}
