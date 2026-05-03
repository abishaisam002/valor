import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PathAnimation() {
  const sectionRef = useRef();
  const pathRef = useRef();
  const logoRef = useRef();
  const textRefs = useRef([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      animation: gsap.to(path, { strokeDashoffset: 0, ease: "none" }),
      scrub: 1,
    });

    // Logo drop animation
    gsap.fromTo(logoRef.current, 
      { y: -100, opacity: 0, scale: 0.8 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Text stagger fade up
    textRefs.current.forEach((text, i) => {
      gsap.fromTo(text,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="about-watermark">ABOUT</div>
      
      <div className="about-content-wrapper">
        <div className="about-logo-container" ref={logoRef}>
          <img src="/valor_logo.png" alt="VALOR Logo" className="about-logo" />
        </div>

        <div className="about-text-container">
          <h2 className="about-title" ref={addToRefs}>
            We are <span className="accent">VALOR</span>
          </h2>
          
          <p className="about-text" ref={addToRefs}>
            We have built on nearly a decade of operational support in the UAE since 2015 across multiple sectors.
          </p>
          
          <p className="about-text" ref={addToRefs}>
            We have more than 10 years of experience in distribution, market research, digital Transformation and cross-border business development.
          </p>
          
          <p className="about-text" ref={addToRefs}>
            VALOR has evolved into a multidisciplinary digital partner, adapting to the needs of the modern business landscape. 
            Today, we leverage this flexible expertise to craft tailored business development strategies and digital experiences that accelerate brand growth across diverse industries.
          </p>
        </div>
      </div>

      <svg className="svg-path" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path 
          ref={pathRef}
          d="M 500 0 C 500 300, 200 400, 200 600 C 200 800, 800 800, 800 1000" 
          stroke="url(#gradient)" 
          strokeWidth="4" 
          fill="none" 
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7b733" />
            <stop offset="100%" stopColor="#f0952d" />
          </linearGradient>
        </defs>
      </svg>

      <div className="about-footer-container" ref={addToRefs}>
        <h2>Valor is a <strong className="accent">multidisciplinary company</strong></h2>
        <p>where Innovation results with Elevated Values.</p>
      </div>
    </section>
  );
}
