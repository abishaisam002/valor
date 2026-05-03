import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StarIcon = () => (
  <svg viewBox="0 0 100 100" className="valor-scroll-star">
    <defs>
      <linearGradient id="scrollStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7b733" />
        <stop offset="100%" stopColor="#f0952d" />
      </linearGradient>
    </defs>
    <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" fill="url(#scrollStarGradient)" />
    <circle cx="50" cy="50" r="15" fill="white" />
  </svg>
);

export default function ValorScrollSection() {
  const sectionRef = useRef();
  const vRef = useRef();
  const aRef = useRef();
  const lRef = useRef();
  const starRef = useRef();
  const rRef = useRef();
  const taglineRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Sequence 1: Spell out V-A-L-Star-R
    tl.to(vRef.current, { opacity: 1, duration: 1 })
      .to(aRef.current, { opacity: 1, duration: 1 })
      .to(lRef.current, { opacity: 1, duration: 1 })
      .to(starRef.current, { opacity: 1, duration: 1 })
      .to(rRef.current, { opacity: 1, duration: 1 });

    // Sequence 2: Fade in tagline
    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out"
    });

    // Sequence 3: Zoom the star out (scale up massively) and fade out
    tl.to(starRef.current, {
      scale: 150,
      opacity: 0,
      duration: 3,
      ease: "power4.in"
    }, "+=1");

  }, []);

  return (
    <section ref={sectionRef} className="valor-scroll-section-wrapper">
      <div className="valor-scroll-sticky">
        <div className="services-galaxy-bg"></div>
        
        <div className="valor-scroll-content">
          <div className="valor-massive-text">
            <span ref={vRef} className="valor-letter">V</span>
            <span ref={aRef} className="valor-letter">A</span>
            <span ref={lRef} className="valor-letter">L</span>
            <span ref={starRef} className="valor-star-wrapper">
              <StarIcon />
            </span>
            <span ref={rRef} className="valor-letter">R</span>
          </div>
          
          <h2 ref={taglineRef} className="valor-tagline">
            Next-gen connections, Elevated Values
          </h2>
        </div>
      </div>
    </section>
  );
}
