import React, { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className="pill-nav">
        <a href="#services" className="pill-link">SERVICES</a>
        
        <a href="/" className="pill-logo">
          <img alt="VALOR" src="/valor_logo.png" />
        </a>
        
        <a href="#about" className="pill-link">ABOUT</a>
        <a href="#contact" className="pill-link">CONTACT</a>
      </nav>
    </div>
  );
}
