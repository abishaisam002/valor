import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const servicesData = [
  {
    title: "Brand Strategy",
    items: [
      "Market Research & Competitive Analysis",
      "Brand Positioning & Value Proposition",
      "Go-to-Market Strategy (UAE & International)",
      "Strategic Messaging & Brand Narrative",
      "Brand Personality, Voice & Tone",
      "Brand Architecture & Portfolio Structuring",
      "Stakeholder & Communication Workshops"
    ]
  },
  {
    title: "Web Design & Digital Platforms",
    items: [
      "UI/UX Design & User Journey Mapping",
      "Corporate Website Design & Development",
      "E-Commerce Platforms",
      "Website Content & Copy Development",
      "Website Maintenance & Performance Optimization",
      "Web Applications & Business Portals",
      "Third-Party Integrations (CRM, ERP, Payment)",
      "Hosting & Server Management"
    ]
  },
  {
    title: "Digital Marketing & Growth",
    items: [
      "Digital Marketing Strategy & Planning",
      "Go-to-Market & Launch Roadmaps",
      "Campaign Strategy & Management",
      "Performance Marketing (Google, Meta Ads)",
      "Search Engine Optimization (SEO)",
      "Lead Generation & Conversion Optimization",
      "Influencer & Partnership Marketing",
      "Media Planning, Buying & Reporting",
      "WhatsApp & Direct Messaging Campaigns"
    ]
  },
  {
    title: "Creative & Design Services",
    items: [
      "Art inspired Brand Identity & Logo Design",
      "Corporate Collateral (Brochures, Flyers, PPTs)",
      "Digital & Print Visual Assets",
      "Copywriting & Brand Storytelling",
      "Event & Exhibition Design",
      "Promotional & Corporate Merchandise",
      "Campaign & Special Occasion Visuals"
    ]
  },
  {
    title: "Content Marketing",
    items: [
      "Content Research",
      "Content Strategy",
      "Social Media Content",
      "SEO-based Writing",
      "Offline Collateral",
      "Internal Communication",
      "Long-format Writing",
      "Websites, PPTs, other presentations",
      "Editing and Proofing"
    ]
  },
  {
    title: "Media Production",
    items: [
      "Product Posts",
      "Explanatory Videos",
      "Animated Videos",
      "Reels / Shorts",
      "Testimonial Videos",
      "Training Videos",
      "Social Media Visual Assets"
    ]
  },
  {
    title: "Project Management",
    items: [
      "End-to-End Project Planning & Delivery",
      "Digital & Marketing Project Management",
      "Scope Definition, Timelines & Milestones",
      "Budgeting, Resource & Risk Management",
      "Vendor & Partner Coordination",
      "Cross-Functional Team Management",
      "Quality Control & Delivery Assurance",
      "Client Communication & Progress Reporting"
    ]
  },
  {
    title: "Product Management",
    items: [
      "Product Strategy & Vision Definition",
      "Market & User Needs Analysis",
      "Product Roadmapping & Feature Prioritization",
      "MVP Planning & Development Coordination",
      "Product Launch & Go-to-Market Execution",
      "Lifecycle Management & Optimization",
      "Stakeholder Alignment & Feedback Loops",
      "Performance Tracking & Continuous Improvement"
    ]
  }
]

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="services section-container" style={{ minHeight: '200vh', paddingTop: '10vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Our <span className="text-gradient">Services</span></h2>
      
      <div className="services-accordion glass-panel">
        {servicesData.map((service, index) => (
          <div 
            key={index} 
            className={`accordion-item ${openIndex === index ? 'open' : ''}`}
          >
            <div 
              className="accordion-header" 
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            >
              <h3>{service.title}</h3>
              <ChevronDown className="accordion-icon" />
            </div>
            <div className="accordion-body">
              <ul className="custom-list">
                {service.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
