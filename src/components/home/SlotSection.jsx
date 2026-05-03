import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SlotSection() {
  const col1Ref = useRef();
  const col2Ref = useRef();
  const col3Ref = useRef();

  useEffect(() => {
    // A simple infinite vertical scroll loop using GSAP
    gsap.to(col1Ref.current, {
      yPercent: -50,
      ease: "none",
      duration: 10,
      repeat: -1
    });

    gsap.to(col2Ref.current, {
      yPercent: -50,
      ease: "none",
      duration: 15,
      repeat: -1,
      yoyo: true
    });

    gsap.to(col3Ref.current, {
      yPercent: -50,
      ease: "none",
      duration: 12,
      repeat: -1
    });
  }, []);

  const slotItems = Array.from({ length: 10 }).map((_, i) => (
    <div key={i} className="slot-item">
      {/* We use valor_logo for now since the original images are missing */}
      <img src="/valor_logo.png" alt="" />
    </div>
  ));

  return (
    <section className="slot-section">
      <div className="slot-container">
        
        <div className="slot-column" ref={col1Ref}>
          <div className="slot-track">
            {slotItems}
            {slotItems}
          </div>
        </div>

        <div className="slot-column" ref={col2Ref}>
          <div className="slot-track reverse-track">
            {slotItems}
            {slotItems}
          </div>
        </div>

        <div className="slot-column" ref={col3Ref}>
          <div className="slot-track">
            {slotItems}
            {slotItems}
          </div>
        </div>

      </div>
      
      <div className="slot-overlay">
        <h2>Work with us.</h2>
        <a href="mailto:info@valor-ae.com" className="email-link">info@valor-ae.com</a>
      </div>
    </section>
  );
}
