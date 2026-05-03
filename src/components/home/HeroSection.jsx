import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { getAssetUrl } from '../../context/WPContext';

// Star icon SVG component
const StarIcon = () => (
  <svg viewBox="0 0 100 100">
    <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
    <circle cx="50" cy="50" r="15" fill="white" />
  </svg>
);

// Extracted 3D elements for the Hero
function Hero3DBackground() {
  const groupRef = useRef();
  
  const services = [
    { title: "DISTRIBUTION SUPPORT", icon: <StarIcon /> },
    { title: "BUSINESS DEVELOPMENT", icon: <StarIcon /> },
    { title: "DIGITAL TRANSFORMATION", icon: <StarIcon /> },
    { title: "OPERATIONAL SUPPORT", icon: <StarIcon /> },
    { title: "SOCIAL MEDIA", icon: <StarIcon /> },
    { title: "PROJECT MANAGEMENT", icon: <StarIcon /> },
    { title: "STRATEGY", icon: <StarIcon /> }
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Backlight / Halo */}
      <pointLight position={[0, 0, -3]} intensity={50} color="#f0952d" distance={10} />
      
      {/* Front Fill Light */}
      <pointLight position={[5, 5, 5]} intensity={10} color="#ffffff" distance={20} />

      {/* Dark Stylized Earth Sphere */}
      <Sphere args={[2.2, 64, 64]}>
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.4} 
          metalness={0.8}
        />
      </Sphere>
      
      {/* Orbiting Service Cards */}
      {services.map((service, i) => {
        const angle = (i / services.length) * Math.PI * 2;
        const radius = 3.8; // Smaller radius for closer orbit
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const y = Math.sin(angle * 3) * 1.2; // More complex Y movement

        return (
          <Float key={i} speed={3} floatIntensity={0.8} position={[x, y, z]}>
            <Html center transform sprite>
              <div className="orbit-card">
                <span className="orbit-icon-svg">{service.icon}</span>
                <span className="orbit-text">{service.title}</span>
              </div>
            </Html>
          </Float>
        );
      })}
    </group>
  );
}

export default function HeroSection() {
  const titleRef = useRef();

  const logoRef = useRef();

  useEffect(() => {
    // Title animation
    const chars = titleRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { opacity: 0, y: 30, rotateX: -45 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        duration: 0.8, 
        stagger: 0.03, 
        ease: "back.out(1.7)",
        delay: 0.2
      }
    );

    // Logo fade up
    gsap.fromTo(logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
    );

    // Magnetic cursor effect for logo
    const logoEl = logoRef.current;
    
    const handleMouseMove = (e) => {
      const rect = logoEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate pull (magnetic effect)
      if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
        gsap.to(logoEl, {
          x: distanceX * 0.2,
          y: distanceY * 0.2,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(logoEl, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleText = "VALUE STARTS WITH VALUES";
  const words = titleText.split(' ');

  return (
    <section className="hero-section">
      <div className="hero-background-image">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-canvas-container">
        <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
          <Stars radius={100} depth={50} count={6000} factor={6} saturation={0} fade speed={1.5} />
          <ambientLight intensity={0.4} />
          <Hero3DBackground />
        </Canvas>
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-text-container" ref={titleRef}>
          <h1 className="hero-title" style={{ pointerEvents: 'none' }}>
            {words.map((word, i) => (
              <span key={i} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.3em' }}>
                {word.split('').map((char, j) => (
                  <span 
                    key={j} 
                    className="char" 
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-logo-container" ref={logoRef} style={{ marginTop: '2rem', pointerEvents: 'auto', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={getAssetUrl('/valor_logo.png')} 
            alt="VALOR Logo" 
            style={{ height: '40px', cursor: 'pointer', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }} 
          />
        </div>
      </div>
      
      <div className="scroll-indicator-bottom">
        <span>SCROLL DOWN</span>
      </div>
    </section>
  );
}
