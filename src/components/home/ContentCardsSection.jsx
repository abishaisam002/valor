import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contentData = [
  { 
    id: 1, 
    title: 'Social Media Management', 
    description: 'Amplify your voice across platforms with strategic content and engagement.', 
    icon: '📱' 
  },
  { 
    id: 2, 
    title: 'Project Management', 
    description: 'End-to-end planning and execution for your digital initiatives.', 
    icon: '📊' 
  },
  { 
    id: 3, 
    title: 'Operational Support', 
    description: 'Streamline your workflows and optimize business operations.', 
    icon: '⚙️' 
  },
  { 
    id: 4, 
    title: 'Digital Transformation', 
    description: 'Modernize your infrastructure for the digital-first economy.', 
    icon: '🚀' 
  },
  { 
    id: 5, 
    title: 'Distribution Support', 
    description: 'Expand your reach across local and global markets efficiently.', 
    icon: '🌍' 
  }
];

export default function ContentCardsSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Only apply GSAP scroll trigger if elements exist and viewport is large enough for horizontal scroll
    const ctx = gsap.context(() => {
      if (window.innerWidth > 768) {
        gsap.to(wrapperRef.current, {
          x: () => -(wrapperRef.current.scrollWidth - window.innerWidth + 100), // 100px padding adjustment
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => '+=' + wrapperRef.current.scrollWidth
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="content-cards-section" ref={sectionRef}>
      <div className="content-cards-header">
        <h2>Our <span className="text-gradient">Capabilities</span></h2>
      </div>
      
      <div className="content-cards-container">
        <div className="content-cards-wrapper" ref={wrapperRef}>
          {contentData.map(item => (
            <div key={item.id} className="content-card">
              <div className="content-card-inner">
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
