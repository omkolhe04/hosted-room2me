import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className="navbar">
        <ul className="nav-list">
          <li>
            <Link className='nav-link' to={'/'}>HOME</Link>
          </li>
          <li>
            <Link className="nav-link" to={'/addroom'}>ADD-ROOM</Link>
          </li>
          {/* <li>
            <Link className="nav-link" to={'/messages'}>MESSAGES</Link>
          </li> */}
          <li>
            <Link className="nav-link" to={'/wishlist'}>WISHLIST</Link>
          </li>
          <li >
            <button className="dark-mode"><p>DARK-MODE</p></button>
          </li>
        </ul>
      </nav>
      
    </div>
  )
}

export default Navbar
