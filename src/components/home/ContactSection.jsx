import React, { useRef, useMemo, useEffect } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAssetUrl } from '../../context/WPContext';

gsap.registerPlugin(ScrollTrigger);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const createStarTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(32, 0);
  ctx.lineTo(36, 28);
  ctx.lineTo(64, 32);
  ctx.lineTo(36, 36);
  ctx.lineTo(32, 64);
  ctx.lineTo(28, 36);
  ctx.lineTo(0, 32);
  ctx.lineTo(28, 28);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(32, 32, 8, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

function ContactStars() {
  const pointsRef = useRef();
  const { mouse, viewport, camera } = useThree();
  const starTexture = useMemo(() => createStarTexture(), []);

  const count = 300;
  
  const [positions, originalPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    const baseColor = new THREE.Color("#f0952d");
    const accentColor = new THREE.Color("#f7b733");
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 20 - 5;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
      
      const c = Math.random() > 0.5 ? baseColor : accentColor;
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return [pos, orig, cols];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;

    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const ox = originalPositions[ix];
      const oy = originalPositions[iy];
      const oz = originalPositions[iz];

      const cx = positionsArray[ix];
      const cy = positionsArray[iy];
      const cz = positionsArray[iz];

      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDistance = 4.0;
      let force = 0;
      if (dist < maxDistance) {
        force = (maxDistance - dist) * 0.15;
      }

      let targetX = ox;
      let targetY = oy;
      let targetZ = oz;

      if (force > 0) {
        targetX -= (dx / dist) * force * 5;
        targetY -= (dy / dist) * force * 5;
        targetZ += force * 5;
      }

      positionsArray[ix] += (targetX - cx) * 0.1;
      positionsArray[iy] += (targetY - cy) * 0.1;
      positionsArray[iz] += (targetZ - cz) * 0.1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        map={starTexture}
        vertexColors={true}
        transparent
        opacity={0.5}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ContactSection() {
  const sectionRef = useRef();
  const canvasContainerRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: 1,
      }
    });

    // Animate the particles zooming out as we scroll into the contact section
    tl.fromTo(canvasContainerRef.current, 
      { scale: 3, opacity: 0 },
      { scale: 1, opacity: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="contact-section" ref={sectionRef}>
      {/* Interactive 3D Background */}
      <div className="contact-canvas" ref={canvasContainerRef} style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ContactStars />
        </Canvas>
      </div>

      <div className="contact-container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Left Side: Form */}
        <div className="contact-left">
          <img src={getAssetUrl('/valor_logo.png')} alt="VALOR" className="contact-logo" />
          <h2 className="contact-title">Work with us.</h2>
          <p className="contact-subtitle">Let's add <span className="accent">value</span> together</p>
          
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label><Mail size={16} /> Email</label>
              <input type="email" placeholder="example@yourdomain.com" />
            </div>
            
            <div className="form-group">
              <label><span className="icon-company">🏢</span> Company Name</label>
              <input type="text" placeholder="Company Name" />
            </div>
            
            <div className="form-group">
              <label><span className="icon-phone">📞</span> Contact Number</label>
              <input type="tel" placeholder="+1 (000) 000-0000" />
            </div>
            
            <button type="submit" className="contact-submit-btn">SUBMIT</button>
          </form>
          
          <div className="contact-copyright" dangerouslySetInnerHTML={{__html: `Copyright © 2026 Valor. All rights reserved. <span style="color: rgba(255,255,255,0.3); margin: 0 10px;">|</span> <a href="#" class="privacy-link">Privacy Policy</a>`}} />
        </div>

        {/* Right Side: Info */}
        <div className="contact-right">
          <h3 className="contact-info-title">Reach us:</h3>
          
          <div className="contact-info-list">
            <a href="https://www.linkedin.com/company/valor-fze/" target="_blank" rel="noopener noreferrer" className="contact-info-item">
              <span className="info-icon"><LinkedinIcon size={24} /></span>
              <span className="info-text">LinkedIn</span>
            </a>
            
            <a href="mailto:info@valor-ae.com" className="contact-info-item">
              <span className="info-icon"><Mail size={24} /></span>
              <span className="info-text">info@valor-ae.com</span>
            </a>
            
            <div className="contact-info-item">
              <span className="info-icon"><MapPin size={24} /></span>
              <span className="info-text">Saifzone, Sharjah, AE</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
