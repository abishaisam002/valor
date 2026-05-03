import React, { useState } from 'react'
import { Menu as MenuIcon, X } from 'lucide-react'
import { useScroll } from '@react-three/drei'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const scroll = useScroll()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLinkClick = (pageIndex) => {
    setIsOpen(false)
    if (scroll.el) {
      scroll.el.scrollTo({ 
        top: scroll.el.clientHeight * pageIndex, 
        behavior: 'smooth' 
      })
    }
  }

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar">
        <img src="/valor_logo.png" alt="VALOR Logo" className="logo" />
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          <MenuIcon size={32} color="white" />
        </button>
      </nav>

      {/* Full-screen Overlay */}
      <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
        <button className="menu-close" onClick={toggleMenu} aria-label="Close Menu">
          <X size={40} color="white" />
        </button>
        <div className="menu-content">
          <div className="menu-info">
            <h3>VALOR</h3>
            <p>Next-Gen Connections, Elevated Values.</p>
            <br/>
            <p>Email: info@valor-ae.com</p>
            <p>Ph: +971555890064</p>
          </div>
          <ul className="menu-links">
            <li><button onClick={() => handleLinkClick(0)}>Home</button></li>
            <li><button onClick={() => handleLinkClick(1)}>About</button></li>
            <li><button onClick={() => handleLinkClick(2)}>Services</button></li>
            <li><button onClick={() => handleLinkClick(4.5)}>Portfolio</button></li>
            <li><button onClick={() => handleLinkClick(6)}>Work With Us</button></li>
          </ul>
        </div>
      </div>
    </>
  )
}
