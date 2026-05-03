import React from 'react';

export default function CTASection() {
  
  return (
    <section id="contact" className="cta-section">
      {/* Background Thread arriving at CTA */}
      <svg className="services-svg-path" viewBox="0 0 1000 1000" preserveAspectRatio="none" style={{ opacity: 0.2 }}>
        <path 
          d="M 500 0 C 500 200, 200 300, 200 500 C 200 700, 800 800, 500 1000" 
          stroke="url(#cta-gradient)" 
          strokeWidth="4" 
          fill="none" 
        />
        <defs>
          <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7b733" />
            <stop offset="100%" stopColor="#f0952d" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="services-galaxy-bg"></div>

      <div className="cta-glass-card">
        <h2 className="cta-title">
          Expand your footprint.<br/>
          <span className="accent">Elevate your Value.</span>
        </h2>
        <p className="cta-paragraph">
          For international investors and companies seeking a trusted distributor or partner in the UAE, VALOR provides the multidisciplinary strategy needed for scalable growth. Experience the impact of next-gen connections and elevated values.
        </p>
        <a href="mailto:info@valor-ae.com" className="cta-btn">
          Let's Connect
        </a>
      </div>
    </section>
  );
}
