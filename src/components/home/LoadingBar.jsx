import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingBar({ onComplete }) {
  const containerRef = useRef();
  const barRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.to(barRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power3.inOut'
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      display: 'none',
      ease: 'power2.inOut'
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="loading-overlay"
      aria-hidden="true" 
    >
      <div className="loading-logo-wrap">
        <img alt="VALOR" width="120" height="40" src="/valor_logo.png" />
      </div>
      <div className="loading-bar-wrap">
        <div ref={barRef} className="loading-bar"></div>
      </div>
    </div>
  );
}
