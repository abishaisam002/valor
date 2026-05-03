import React, { useState, useRef } from 'react'
import { Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const servicesData = [
  { title: "Brand Strategy", items: ["Market Research & Competitive Analysis", "Brand Positioning & Value Proposition", "Go-to-Market Strategy", "Strategic Messaging", "Brand Personality", "Brand Architecture", "Stakeholder Workshops"] },
  { title: "Web Design & Digital Platforms", items: ["UI/UX Design & User Journey Mapping", "Corporate Website Design", "E-Commerce Platforms", "Website Content", "Website Maintenance", "Web Applications", "Third-Party Integrations", "Hosting & Server Management"] },
  { title: "Digital Marketing & Growth", items: ["Strategy & Planning", "Launch Roadmaps", "Campaign Strategy", "Performance Marketing", "SEO", "Lead Generation", "Influencer Marketing", "Media Planning", "WhatsApp Campaigns"] },
  { title: "Creative & Design Services", items: ["Brand Identity & Logo Design", "Corporate Collateral", "Digital & Print Assets", "Copywriting", "Event Design", "Promotional Merchandise", "Campaign Visuals"] },
  { title: "Content Marketing", items: ["Content Research", "Content Strategy", "Social Media Content", "SEO-based Writing", "Offline Collateral", "Internal Communication", "Long-format Writing", "Editing and Proofing"] },
  { title: "Media Production", items: ["Product Posts", "Explanatory Videos", "Animated Videos", "Reels / Shorts", "Testimonial Videos", "Training Videos", "Social Media Visual Assets"] },
  { title: "Project Management", items: ["End-to-End Planning", "Digital Project Management", "Scope Definition", "Budgeting", "Vendor Coordination", "Cross-Functional Team", "Quality Control", "Client Communication"] },
  { title: "Product Management", items: ["Product Strategy", "Market Needs Analysis", "Roadmapping", "MVP Planning", "Product Launch", "Lifecycle Management", "Stakeholder Alignment", "Performance Tracking"] }
]

const portfolioItems = [
  { id: 1, name: 'Agricola Guerreschi', img: '/portfolio_agricolaguerreschi.png', link: 'http://agricolaguerreschi.it' },
  { id: 2, name: 'Xstro', img: '/portfolio_xstro.png', link: 'http://xstro.it' },
  { id: 3, name: 'Arts Guerreschi', img: '/portfolio_artsguerreschi.png', link: 'http://artsguerreschi.com' },
  { id: 4, name: 'AG Group', img: '/portfolio_ag_group.png', link: 'http://ag-group.it' },
]

// Separate component for horizontal scroll to use useFrame safely inside ScrollControls context
function HorizontalPortfolio() {
  const scroll = useScroll()
  const horizontalRef = useRef()

  useFrame(() => {
    if (horizontalRef.current) {
      // 8 pages total. Section 4 is roughly pages 3 to 5.
      // Offset ~ 0.375 to 0.625
      const start = 0.375
      const end = 0.625
      
      if (scroll.offset >= start && scroll.offset <= end) {
        const progress = (scroll.offset - start) / (end - start)
        horizontalRef.current.style.transform = `translateX(-${progress * 300}vw)`
      } else if (scroll.offset < start) {
        horizontalRef.current.style.transform = `translateX(0vw)`
      } else {
        horizontalRef.current.style.transform = `translateX(-300vw)`
      }
    }
  })

  return (
    <div style={{ height: '200vh' }}>
      <div className="portfolio-sticky">
        <h2 className="portfolio-title text-gradient">Our Experience</h2>
        <div className="portfolio-horizontal" ref={horizontalRef}>
          {portfolioItems.map(item => (
            <div key={item.id} className="portfolio-item">
              <div className="portfolio-card">
                <img src={item.img} alt={item.name} />
                <div className="portfolio-info">
                  <h3>{item.name}</h3>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">View Site →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HtmlOverlay() {
  const [openIndex, setOpenIndex] = useState(0)
  
  return (
    <Scroll html style={{ width: '100vw' }}>
      {/* Navbar */}
      <nav className="navbar">
        <img src="/valor_logo.png" alt="VALOR Logo" className="logo" />
        <button className="menu-btn">Menu</button>
      </nav>

      {/* Section 1: Hero */}
      <section className="wacus-section" style={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '5vh' }}>
        <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
          <div style={{ color: '#666', letterSpacing: '4px', fontSize: '0.7rem', fontWeight: 600, marginBottom: '1rem' }}>EXPLORE THE HORIZON</div>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #f0952d, transparent)', margin: '0 auto' }}></div>
        </div>

        <div style={{ textAlign: 'center', zIndex: 10, marginTop: 'auto' }}>
          <div style={{ color: '#f0952d', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '2rem' }}>THE VALOR DIRECTIVE</div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 600, lineHeight: 1.1, marginBottom: '1.5rem' }}>Next-Gen connections,<br/>Elevated <span className="text-gradient" style={{ fontWeight: 400 }}>value</span></h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: '#a0a0a0', fontSize: '1.1rem', lineHeight: 1.6 }}>Navigating the digital landscape with celestial precision. We empower elite businesses to transcend traditional boundaries through specialized operational and technical support.</p>
        </div>
      </section>

      {/* Section 2: Orbit Path Transition */}
      <section className="wacus-section">
        <div className="wacus-content left-align">
          <h1>Digital<br/>Infrastructure</h1>
          <p>Building strong digital and business foundations. We deliver measurable and sustainable results across local and global markets.</p>
        </div>
      </section>

      {/* Section 3: Agency / Cube */}
      <section className="wacus-section">
        <div className="huge-bg-text">AGENCY</div>
        <div className="wacus-content right-align">
          <h1>VALOR is a<br/>Digital Agency</h1>
          <p>Built on nearly a decade of hands-on experience in operations, branding, and international business. We don't just create digital presence — we build scalable systems.</p>
        </div>
      </section>

      {/* Section 4: Horizontal Portfolio */}
      <HorizontalPortfolio />

      {/* Section 5: Services Accordion */}
      <section className="services-section">
        <div className="wacus-content" style={{ margin: '0 auto', marginBottom: '4rem' }}>
          <h1>Our <span className="text-gradient">Services</span></h1>
        </div>
        <div className="services-accordion">
          {servicesData.map((service, index) => (
            <div key={index} className={`accordion-item ${openIndex === index ? 'open' : ''}`}>
              <div className="accordion-header" onClick={() => setOpenIndex(index === openIndex ? -1 : index)}>
                <h3>{service.title}</h3>
                <span className="accordion-icon">▼</span>
              </div>
              <div className="accordion-body">
                <ul>
                  {service.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Watermark Footer */}
      <section className="footer-section">
        <div className="watermark">VALOR</div>
        <div className="contact-content">
          <h2>Work with <span className="text-gradient">Us.</span></h2>
          <div className="contact-grid">
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
      </section>
    </Scroll>
  )
}
