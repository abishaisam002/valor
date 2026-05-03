import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Float, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const serviceImages = [
  '/service_operational_support.png',
  '/service_digital_transformation.png',
  '/service_social_media.png',
  '/service_project_management.png',
  '/service_business_expansion.png',
  '/service_web_tech.png'
];

function CardRing({ scrollProgress }) {
  const groupRef = useRef();
  const textures = serviceImages.map(img => useTexture(img));
  const { camera } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Rotation: A bit slower rotation
      groupRef.current.rotation.z = scrollProgress.current * Math.PI * 1.2;
      groupRef.current.rotation.y = scrollProgress.current * Math.PI * 0.3;
      
      // Dynamic Zoom: Camera moves from 12 to 5 based on scroll
      camera.position.z = THREE.MathUtils.lerp(12, 5, scrollProgress.current);
      
      // Fan out effect: cards spread further apart as we scroll
      const spread = THREE.MathUtils.lerp(3, 7, scrollProgress.current);
      groupRef.current.children.forEach((child, i) => {
        const angle = (i / textures.length) * Math.PI * 2;
        child.position.x = Math.cos(angle) * spread;
        child.position.y = Math.sin(angle) * spread;
        // Cards face the camera more as we zoom in
        child.lookAt(0, 0, 10);
      });
      
      // Fade out group at the very end
      groupRef.current.visible = scrollProgress.current < 0.95;
    }
  });

  return (
    <group ref={groupRef}>
      {textures.map((tex, i) => (
        <mesh key={i}>
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial map={tex} side={THREE.DoubleSide} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export default function WacusScrollSection() {
  const containerRef = useRef(null);
  const scrollProgress = useRef(0);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // Slower follow
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          // Show tagline at the very end
          if (self.progress > 0.92) {
            setShowTagline(true);
          } else {
            setShowTagline(false);
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="wacus-scroll-section" ref={containerRef} style={{ height: '600vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <CardRing scrollProgress={scrollProgress} />
        </Canvas>

        <div className={`tagline-overlay ${showTagline ? 'visible' : ''}`}>
          <div className="tagline-content">
            <h2 className="tagline-text">Next-gen Connections,</h2>
            <h2 className="tagline-text accent">Elevated Values</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
