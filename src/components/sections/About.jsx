import React from 'react'

export default function About() {
  return (
    <section className="about section-container" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="about-wrapper">
        <h2>We are <span className="text-gradient">VALOR</span></h2>
        <p className="subtitle">Where Innovation results with Elevated Values.</p>
        
        <div className="about-content glass-panel">
          <h3>Strategic Partners</h3>
          <p>Our foundation is built on nearly a decade of hands-on experience in operations, branding, and international business. This allows us to approach every project not just as creatives, but as strategic partners.</p>
          <br/>
          <p>We understand that today’s businesses need more than visibility — they need direction, structure, and execution.</p>
          <br/>
          <h3>That’s why VALOR works closely with clients to:</h3>
          <ul className="custom-list">
            <li>Identify real growth opportunities</li>
            <li>Build strong digital and business foundations</li>
            <li>Deliver measurable and sustainable results</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
