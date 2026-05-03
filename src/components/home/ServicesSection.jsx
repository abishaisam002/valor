import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: 'Business Development & Market Entry',
    items: [
      'Cross-Border Partnership & JV Structuring',
      'Market Feasibility & Entry Studies (MENA Region)',
      'B2B Lead Generation & Outreach Strategy',
      'Sales Pipeline & CRM Process Optimization',
      'Corporate Structuring & Local Agent Navigation',
      'Key Account Management & Growth Strategy',
      'Government & Regulatory Alignment Support'
    ]
  },
  {
    title: 'Project Management',
    items: [
      'End-to-End Project Planning & Delivery',
      'Digital & Marketing Project Management',
      'Scope Definition, Timelines & Milestones',
      'Budgeting, Resource & Risk Management',
      'Vendor & Partner Coordination',
      'Cross-Functional Team Management',
      'Quality Control & Delivery Assurance',
      'Client Communication & Progress Reporting'
    ]
  },
  {
    title: 'Media Production',
    items: [
      'Product Posts',
      'Explanatory Videos',
      'Animated Videos',
      'Reels / Shorts',
      'Testimonial Videos',
      'Training Videos',
      'Social Media Visual Assets'
    ]
  },
  {
    title: 'Content Marketing',
    items: [
      'Content Research',
      'Content Strategy',
      'Social Media Content',
      'SEO-based Writing',
      'Offline Collateral',
      'Internal Communication',
      'Long-format Writing',
      'Websites, PPTs, other presentations',
      'Editing and Proofing'
    ]
  },
  {
    title: 'Creative & Design Services',
    items: [
      'Art inspired Brand Identity & Logo Design',
      'Corporate Collateral (Brochures, Flyers, Presentations)',
      'Digital & Print Visual Assets',
      'Copywriting & Brand Storytelling',
      'Event & Exhibition Design',
      'Promotional & Corporate Merchandise',
      'Campaign & Special Occasion Visual'
    ]
  },
  {
    title: 'Digital Marketing & Growth',
    items: [
      'Digital Marketing Strategy & Planning',
      'Go-to-Market & Launch Roadmaps',
      'Campaign Strategy & Management',
      'Performance Marketing (Google Ads, Meta Ads)',
      'Search Engine Optimization (SEO)',
      'Lead Generation & Conversion Optimization',
      'Influencer & Partnership Marketing',
      'Media Planning, Buying & Reporting',
      'WhatsApp & Direct Messaging Campaigns'
    ]
  },
  {
    title: 'Web Design & Digital Platforms',
    items: [
      'UI/UX Design & User Journey Mapping',
      'Corporate Website Design & Development',
      'E-Commerce Platforms',
      'Website Content & Copy Development',
      'Website Maintenance & Performance Optimization',
      'Web Applications & Business Portals',
      'Third-Party Integrations (CRM, ERP, Payment Gateways)',
      'Hosting & Server Management'
    ]
  },
  {
    title: 'Brand Strategy',
    items: [
      'Market Research & Competitive Analysis',
      'Brand Positioning & Value Proposition',
      'Go-to-Market Strategy (UAE & International Markets)',
      'Strategic Messaging & Brand Narrative',
      'Brand Personality, Voice & Tone',
      'Brand Architecture & Portfolio Structuring',
      'Stakeholder & Communication Workshops'
    ]
  }
];

const StarIcon = () => (
  <svg viewBox="0 0 100 100" className="service-star-icon">
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7b733" />
        <stop offset="100%" stopColor="#f0952d" />
      </linearGradient>
    </defs>
    <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" fill="url(#starGradient)" />
    <circle cx="50" cy="50" r="15" fill="white" />
  </svg>
);

export default function ServicesSection() {
  const sectionRef = useRef();
  const cardsRef = useRef([]);
  const pathRef = useRef();
  const gridContainerRef = useRef();

  useEffect(() => {
    const cards = cardsRef.current;
    
    gsap.set(cards, { 
      y: window.innerHeight * 0.4, 
      opacity: 0, 
      scale: 0.8,
      rotationX: 10
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    tl.to(cards, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      stagger: 0.1,
      ease: "power2.out",
      duration: 1
    });

    // After cards fan out, slide the entire grid up if it overflows the screen
    tl.to(gridContainerRef.current, {
      y: () => {
        if (!gridContainerRef.current) return 0;
        const gridHeight = gridContainerRef.current.scrollHeight;
        const windowHeight = window.innerHeight;
        const offset = gridHeight - (windowHeight - 300); // 300px for header/margins
        return offset > 0 ? -offset : 0;
      },
      ease: "none",
      duration: 1
    });

    // Thread Animation Setup
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      tl.to(path, { 
        strokeDashoffset: 0, 
        ease: "none",
        duration: 2 
      }, 0); // Start animating from the beginning of the timeline
    }

  }, []);

  return (
    <section id="services" ref={sectionRef} className="services-section-wrapper">
      <div className="services-sticky-container">
        
        {/* Background Thread Animation */}
        <svg className="services-svg-path" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path 
            ref={pathRef}
            d="M 500 0 C 500 200, 200 300, 200 500 C 200 700, 800 800, 500 1000" 
            stroke="url(#services-gradient)" 
            strokeWidth="4" 
            fill="none" 
          />
          <defs>
            <linearGradient id="services-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f0952d" />
              <stop offset="100%" stopColor="#f7b733" />
            </linearGradient>
          </defs>
        </svg>

        <div className="services-galaxy-bg"></div>

        <div className="services-watermark">SERVICES</div>

        <div className="services-header">
          <h2 className="services-title">Our Core Capabilities</h2>
          <p className="services-description">
            From feasibility to distribution: providing the multidisciplinary support necessary for international businesses to thrive in new markets.
          </p>
        </div>

        <div className="services-grid-container" ref={gridContainerRef}>
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <div 
                key={index} 
                className="service-glass-card"
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <div className="service-card-header">
                  <StarIcon />
                  <h3 className="service-card-title">{service.title}</h3>
                </div>
                
                <ul className="service-list">
                  {service.items.map((item, i) => (
                    <li key={i}>
                      <svg className="check-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6666 5L7.49992 14.1667L3.33325 10" stroke="#f0952d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
