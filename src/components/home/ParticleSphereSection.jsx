import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARTICLE_COUNT = 3000;
const SPHERE_RADIUS = 2.2;

function InteractiveParticles({ scrollProgress }) {
  const pointsRef = useRef();
  const { mouse, viewport } = useThree();

  const [positions, originalPositions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const orig = new Float32Array(PARTICLE_COUNT * 3);
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    
    const baseColor = new THREE.Color("#8cf0f0");
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = SPHERE_RADIUS * (0.8 + Math.random() * 0.2);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
      
      cols[i * 3] = baseColor.r;
      cols[i * 3 + 1] = baseColor.g;
      cols[i * 3 + 2] = baseColor.b;
    }
    return [pos, orig, cols];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;

    const progress = scrollProgress.current;

    // Translate sphere based on progress
    // 0 to 0.4: Stays on left
    // 0.4 to 1.0: Moves from left to bottom center
    let targetPosX = -viewport.width / 4; // approximate left side
    let targetPosY = 0;
    let targetScale = 1;

    if (progress > 0.5) {
      const rawProgress = Math.min(1, Math.max(0, (progress - 0.5) / 0.3)); // 0.5 to 0.8
      const moveProgress = rawProgress * rawProgress * (3 - 2 * rawProgress); // Smooth easing
      targetPosX = -viewport.width / 4 + (moveProgress * (viewport.width / 4)); // moves to 0
      targetPosY = 0 - (moveProgress * (viewport.height / 3.5)); // moves down slightly less
      targetScale = 1 - (moveProgress * 0.3); // becomes SMALLER (scale 0.7)
    }

    // Lerp container position
    pointsRef.current.position.x += (targetPosX - pointsRef.current.position.x) * 0.1;
    pointsRef.current.position.y += (targetPosY - pointsRef.current.position.y) * 0.1;
    pointsRef.current.scale.setScalar(pointsRef.current.scale.x + (targetScale - pointsRef.current.scale.x) * 0.1);

    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    const colorsArray = pointsRef.current.geometry.attributes.color.array;
    
    const baseColor = new THREE.Color("#8cf0f0");
    const highlightColor = new THREE.Color("#f0952d");

    let colorMix = 0;
    if (progress > 0.5) {
      colorMix = Math.min(1, (progress - 0.5) / 0.3); // 0 to 1
    }
    
    // Mouse in world coordinates (approx)
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      const ox = originalPositions[ix];
      const oy = originalPositions[iy];
      const oz = originalPositions[iz];

      const cx = positionsArray[ix];
      const cy = positionsArray[iy];
      const cz = positionsArray[iz];

      // To calculate mouse repulsion accurately, we need particle pos relative to screen center
      // but simpler is to just use local coords and offset mouse by container pos
      const localMouseX = mouseX - pointsRef.current.position.x;
      const localMouseY = mouseY - pointsRef.current.position.y;

      const dx = localMouseX - cx;
      const dy = localMouseY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDistance = 2.0 / targetScale;
      let force = 0;
      if (dist < maxDistance) {
        force = (maxDistance - dist) * 0.1;
      }

      let targetX = ox;
      let targetY = oy;
      let targetZ = oz;

      if (force > 0) {
        targetX -= (dx / dist) * force * 5;
        targetY -= (dy / dist) * force * 5;
        targetZ += force * 5;
      }

      // Formation animation: 0 to 0.2 forms the sphere
      let scatterFactor = 0;
      if (progress < 0.2) {
        scatterFactor = (1 - (progress / 0.2)) * 10;
      }

      const finalX = targetX + (Math.sin(ix) * scatterFactor);
      const finalY = targetY + (Math.cos(iy) * scatterFactor);
      const finalZ = targetZ + (Math.sin(iz) * scatterFactor);

      positionsArray[ix] += (finalX - cx) * 0.1;
      positionsArray[iy] += (finalY - cy) * 0.1;
      positionsArray[iz] += (finalZ - cz) * 0.1;

      // Color animation
      if (colorMix > 0) {
        // yNorm goes from 0 (bottom) to 1 (top) based on original radius
        const yNorm = Math.max(0, Math.min(1, (oy + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));
        let orangeFactor = 0;
        if (yNorm < 0.5) { // bottom half
          orangeFactor = (1 - (yNorm / 0.5)) * colorMix;
          // Add some noise to the gradient based on x and z for a scattered look
          const noise = (Math.sin(ox * 5) * Math.cos(oz * 5)) * 0.2;
          orangeFactor = Math.max(0, Math.min(1, orangeFactor + noise));
        }
        
        const c = baseColor.clone().lerp(highlightColor, orangeFactor);
        colorsArray[ix] = c.r;
        colorsArray[iy] = c.g;
        colorsArray[iz] = c.b;
      } else {
        colorsArray[ix] = baseColor.r;
        colorsArray[iy] = baseColor.g;
        colorsArray[iz] = baseColor.b;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors={true}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleSphereSection() {
  const containerRef = useRef();
  const textSection2Ref = useRef();
  const textSection3Ref = useRef();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          
          if (textSection2Ref.current) {
            const op2 = 1 - Math.max(0, Math.min(1, (self.progress - 0.4) / 0.1));
            textSection2Ref.current.style.opacity = op2;
            textSection2Ref.current.style.transform = `translateY(calc(-50% + ${(1 - op2) * -30}px))`;
            textSection2Ref.current.style.pointerEvents = op2 > 0.5 ? 'auto' : 'none';
          }

          if (textSection3Ref.current) {
            const op3 = Math.max(0, Math.min(1, (self.progress - 0.6) / 0.2));
            textSection3Ref.current.style.opacity = op3;
            textSection3Ref.current.style.transform = `translate(-50%, ${(1 - op3) * 30}px)`;
            textSection3Ref.current.style.pointerEvents = op3 > 0.5 ? 'auto' : 'none';
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="particle-sequence-wrapper" ref={containerRef}>
      <div className="particle-sticky-container">
        
        {/* 3D Canvas Background */}
        <div className="particle-canvas-layer">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <InteractiveParticles scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* Section 2 Overlays (Right Side) */}
        <div className="particle-overlay section-2-overlay" ref={textSection2Ref}>
          <h2 className="particle-heading">
            Valor is a Multi solution <span className="accent">Partner</span>
          </h2>
          <p className="particle-paragraph">
            Value solutions built on real operational experience and international market exposure.<br/><br/>
            Established in the UAE in 2024, VALOR goes beyond traditional digital agencies by combining technology, strategy, and execution to help businesses grow across local and global markets.
          </p>
          <a href="#services" className="explore-btn">
            Explore
            <span className="arrow">→</span>
          </a>
        </div>

        {/* Section 3 Overlays (Top Center) */}
        <div className="particle-overlay section-3-overlay" ref={textSection3Ref} style={{ opacity: 0 }}>
          <h2 className="particle-heading" style={{ textAlign: 'center' }}>
            Next-Gen Connections,<br/>
            <span className="accent">Elevated Values.</span>
          </h2>
          <p className="particle-paragraph" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            We bridge the gap between innovation and strategy, aligning your brand's story with market demands and business needs.
          </p>
        </div>

      </div>
    </section>
  );
}
