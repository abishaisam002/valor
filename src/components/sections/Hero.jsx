import React from 'react'

export default function Hero() {
  return (
    <section className="hero section-container" style={{ height: '100vh' }}>
      <div className="hero-content">
        <h1 className="text-gradient">VALOR</h1>
        <p className="hero-subtitle">Next-Gen Connections, Elevated Values.</p>
        <p className="hero-desc">We don’t just create digital presence — we build scalable systems that generate value.</p>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  )
}
