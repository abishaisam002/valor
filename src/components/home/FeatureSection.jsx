import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Edges, useTexture, Plane, Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCube() {
  const cubeRef = useRef();
  const logoTexture = useTexture('/valor_logo.png');

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group ref={cubeRef}>
        <Box args={[2.5, 2.5, 2.5]}>
          <meshPhysicalMaterial transmission={1} opacity={1} roughness={0.1} ior={1.5} thickness={2} color="#ffffff" />
          <Edges scale={1.01} color="#f0952d" />
        </Box>
        <Plane args={[1.5, 0.6]} position={[0, 0, 1.26]}>
          <meshBasicMaterial map={logoTexture} transparent side={THREE.DoubleSide} />
        </Plane>
        <Plane args={[1.5, 0.6]} position={[0, 0, -1.26]} rotation={[0, Math.PI, 0]}>
          <meshBasicMaterial map={logoTexture} transparent side={THREE.DoubleSide} />
        </Plane>
      </group>
    </Float>
  );
}

export default function FeatureSection() {
  return (
    <section className="feature-section">
      <div className="cube-container-floating">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <FloatingCube />
        </Canvas>
      </div>

      <div className="feature-item">
        <p className="feature-text">We design your brand through<br/>user-centric web development</p>
        <div className="feature-graphic" aria-hidden="true"></div>
      </div>
      
      <div className="feature-item reverse">
        <div className="feature-graphic"></div>
        <p className="feature-text">We analyze website visitor<br/>journeys to execute better strategies.</p>
      </div>
      
      <div className="feature-item">
        <p className="feature-text">We Build Strategically Consistent Websites<br/>That Amplify Your Brand Authority.</p>
        <div className="feature-graphic"></div>
      </div>
    </section>
  );
}
