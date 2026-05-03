import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioImages = [
  '/portfolio_agricolaguerreschi.png',
  '/portfolio_xstro.png',
  '/portfolio_artsguerreschi.png',
  '/portfolio_ag_group.png',
  '/service_business_expansion.png',
  '/service_digital_marketing.png',
  '/service_web_tech.png',
];

export default function ExperienceSection() {
  const sectionRef = useRef();
  const col1Ref = useRef();
  const col2Ref = useRef();
  const col3Ref = useRef();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Parallax effect for columns
      gsap.to(col1Ref.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(col2Ref.current, {
        yPercent: 20, // Reverse direction
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(col3Ref.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="experience-section">
      <div className="portfolio-bg">
        <div className="vertical-list" ref={col1Ref}>
          {portfolioImages.map((src, i) => (
            <img key={`col1-${i}`} src={src} alt="Portfolio item" className="portfolio-img" />
          ))}
          {portfolioImages.map((src, i) => (
            <img key={`col1-dup-${i}`} src={src} alt="Portfolio item" className="portfolio-img" />
          ))}
        </div>
        
        <div className="vertical-list" ref={col2Ref}>
          {[...portfolioImages].reverse().map((src, i) => (
            <img key={`col2-${i}`} src={src} alt="Portfolio item" className="portfolio-img" />
          ))}
          {[...portfolioImages].reverse().map((src, i) => (
            <img key={`col2-dup-${i}`} src={src} alt="Portfolio item" className="portfolio-img" />
          ))}
        </div>
        
        <div className="vertical-list col3" ref={col3Ref}>
          {portfolioImages.map((src, i) => (
            <img key={`col3-${i}`} src={src} alt="Portfolio item" className="portfolio-img" />
          ))}
          {portfolioImages.map((src, i) => (
            <img key={`col3-dup-${i}`} src={src} alt="Portfolio item" className="portfolio-img" />
          ))}
        </div>
      </div>

      <div className="experience-content">
        <h2 className="experience-title">Our Experience</h2>
        <a className="view-more-btn" href="#portfolio">View More</a>
      </div>
    </section>
  );
}
