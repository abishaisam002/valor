import React, { useRef, Suspense, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Sphere, Box, Float, Stars, Edges, useTexture, Plane, Html } from '@react-three/drei'
import * as THREE from 'three'

// 1. Hero: Glowing Earth with Orbiting Cards
function HeroEarth({ scrollOffset }) {
  const groupRef = useRef()
  
  const services = [
    { title: "DISTRIBUTION SUPPORT", icon: "🌐" },
    { title: "BUSINESS DEVELOPMENT", icon: "📈" },
    { title: "DIGITAL TRANSFORMATION", icon: "⚙️" }
  ]

  useFrame(() => {
    if (groupRef.current) {
      // 8 pages total. Hero is 0 to ~0.15
      const offset = scrollOffset.current
      groupRef.current.rotation.y = offset * Math.PI * 4
      
      // Move up and out of view as we scroll past hero
      groupRef.current.position.y = THREE.MathUtils.lerp(0, 20, Math.max(0, (offset - 0.1) * 5))
    }
  })

  return (
    <group ref={groupRef}>
      {/* Backlight / Halo */}
      <pointLight position={[0, 0, -3]} intensity={50} color="#f0952d" distance={10} />
      
      {/* Front Fill Light */}
      <pointLight position={[5, 5, 5]} intensity={10} color="#ffffff" distance={20} />

      {/* Dark Stylized Earth Sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.4} 
          metalness={0.8}
        />
      </Sphere>
      
      {/* Orbiting Service Cards */}
      {services.map((service, i) => {
        const angle = (i / services.length) * Math.PI * 2
        // Make the radius larger so cards orbit outside the earth
        const radius = 3.5
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius
        
        // Stagger the Y position slightly for a more dynamic look
        const y = Math.sin(angle * 2) * 1.5

        return (
          <Float key={i} speed={2} floatIntensity={0.5} position={[x, y, z]}>
            {/* The Html component renders CSS/HTML tracking the 3D position */}
            <Html center transform sprite>
              <div className="orbit-card">
                <span className="orbit-icon">{service.icon}</span>
                <span className="orbit-text">{service.title}</span>
              </div>
            </Html>
          </Float>
        )
      })}
    </group>
  )
}

// 2. Transition: Orbit Path
function OrbitPath({ scrollOffset }) {
  const pathRef = useRef()
  
  // Create a curved tube geometry
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, -20, 5),
      new THREE.Vector3(-5, -5, -2),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 5, 2),
      new THREE.Vector3(10, 20, -5)
    ])
  }, [])

  useFrame((state) => {
    if (pathRef.current) {
      const offset = scrollOffset.current
      // Appears around 0.15 to 0.3
      const y = THREE.MathUtils.lerp(-15, 10, (offset - 0.1) * 3)
      pathRef.current.position.y = y
      
      // Animate material or rotation
      pathRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={pathRef} position={[0, -15, -5]}>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.2, 8, false]} />
        <meshStandardMaterial color="#f7b733" emissive="#f0952d" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

// 3. Agency: Branded Cube
function VALORCube({ scrollOffset }) {
  const cubeRef = useRef()
  const logoTexture = useTexture('/valor_logo.png')

  useFrame(() => {
    if (cubeRef.current) {
      const offset = scrollOffset.current
      // Appears around 0.3 to 0.45 (Section 3)
      // Since pages=8, Section 3 is roughly around offset 0.375
      const cubeY = THREE.MathUtils.lerp(-20, 0, Math.max(0, (offset - 0.25) * 5))
      
      // If we go past section 3, move it up out of the way for horizontal portfolio (offset > 0.5)
      const finalY = offset > 0.5 ? cubeY + (offset - 0.5) * 50 : cubeY
      
      cubeRef.current.position.y = finalY
      cubeRef.current.position.x = -3.5 // Left aligned since text is right aligned
      
      cubeRef.current.rotation.x = offset * Math.PI * 4
      cubeRef.current.rotation.y = offset * Math.PI * 6
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <group ref={cubeRef} position={[-3.5, -20, 0]}>
        <Box args={[2.5, 2.5, 2.5]}>
          <meshPhysicalMaterial transmission={1} opacity={1} roughness={0.1} ior={1.5} thickness={2} color="#ffffff" />
          <Edges scale={1.01} color="#f0952d" />
        </Box>
        <Plane args={[1.5, 0.6]} position={[0, 0, 0]}>
          <meshBasicMaterial map={logoTexture} transparent side={THREE.DoubleSide} />
        </Plane>
        <Plane args={[1.5, 0.6]} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <meshBasicMaterial map={logoTexture} transparent side={THREE.DoubleSide} />
        </Plane>
      </group>
    </Float>
  )
}

export default function Scene() {
  const scroll = useScroll()
  const scrollOffset = useRef(0)
  
  useFrame(() => {
    scrollOffset.current = scroll.offset
  })

  // The 3D scene only covers the first 3 sections.
  // The rest (Horizontal Portfolio, FAQ, Footer) are HTML overlays with black backgrounds.
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Suspense fallback={null}>
        <HeroEarth scrollOffset={scrollOffset} />
        <OrbitPath scrollOffset={scrollOffset} />
        <VALORCube scrollOffset={scrollOffset} />
      </Suspense>
    </>
  )
}
