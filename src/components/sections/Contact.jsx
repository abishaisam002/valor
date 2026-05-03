import React from 'react'

export default function Contact() {
  return (
    <section className="contact section-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="contact-wrapper glass-panel">
        <h2 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Work With <span className="text-gradient">Us</span></h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px' }}>
          Ready to build scalable systems and generate measurable value? Let's talk about your next project.
        </p>
        
        <div className="contact-details">
          <div className="contact-item">
            <h3>Website</h3>
            <p><a href="http://www.valor-ae.com" target="_blank" rel="noopener noreferrer">www.valor-ae.com</a></p>
          </div>
          
          <div className="contact-item">
            <h3>Email</h3>
            <p><a href="mailto:info@valor-ae.com">info@valor-ae.com</a></p>
          </div>
          
          <div className="contact-item">
            <h3>Phone</h3>
            <p><a href="tel:+971555890064">+971 555 890064</a></p>
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} VALOR. All rights reserved.</p>
      </footer>
    </section>
  )
}
