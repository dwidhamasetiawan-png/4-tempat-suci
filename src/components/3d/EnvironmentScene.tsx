/**
 * 3D Environment Scene: Ground, Natural Perimeter, Lighting, Fog, and Sacred Particles
 */
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getMaterials } from './ProceduralMaterials';

export const EnvironmentScene: React.FC = () => {
  const materials = getMaterials();
  const particlesRef = useRef<THREE.Points>(null);

  // Floating sacred Bodhi leaves & golden particle motes
  const particleCount = 200;
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const ph = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 55;
      pos[i * 3 + 1] = 0.5 + Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 55;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        // Gentle spiraling drift
        let y = posAttr.getY(i);
        let x = posAttr.getX(i);
        let z = posAttr.getZ(i);

        y += Math.sin(t * 1.5 + phases[i]) * 0.008;
        x += Math.cos(t * 0.8 + phases[i]) * 0.005;
        z += Math.sin(t * 0.6 + phases[i]) * 0.005;

        // Reset if too low or high
        if (y < 0.2) y = 7;
        if (y > 9) y = 0.5;

        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <>
      {/* 1. ATMOSPHERIC LIGHTING */}
      {/* Warm Golden Key Sunlight */}
      <directionalLight
        position={[25, 38, 20]}
        intensity={1.8}
        color="#fff1d0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={90}
        shadow-camera-left={-32}
        shadow-camera-right={32}
        shadow-camera-top={32}
        shadow-camera-bottom={-32}
        shadow-bias={-0.0005}
      />

      {/* Cool Sky / Ground Fill Light */}
      <hemisphereLight
        color="#fae8b6" // Golden sky
        groundColor="#5c5346" // Earthy ground
        intensity={0.7}
      />

      {/* Gentle Rim Backlight for depth */}
      <directionalLight position={[-20, 15, -25]} intensity={0.4} color="#fcd34d" />

      {/* 2. GROUND & PAVED PATHWAYS */}
      {/* Outer natural grassy terrain */}
      <mesh position={[0, -0.05, 0]} receiveShadow material={materials.grass}>
        <planeGeometry args={[140, 140]} />
        <meshStandardMaterial color="#4a6b35" roughness={0.95} />
      </mesh>

      {/* Inner sacred flagstone courtyard */}
      <mesh position={[0, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]} material={materials.pavement}>
        <planeGeometry args={[52, 52]} />
      </mesh>

      {/* Circumambulation path border */}
      <mesh position={[0, 0.02, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]} material={materials.carvedSandstone}>
        <ringGeometry args={[22, 24, 48]} />
      </mesh>

      {/* Pathway to Entrance Torana */}
      <mesh position={[0, 0.02, 28]} receiveShadow rotation={[-Math.PI / 2, 0, 0]} material={materials.pavement}>
        <planeGeometry args={[8, 16]} />
      </mesh>

      {/* 3. NATURAL PERIMETER: ANCIENT BODHI GROVE TREES & LOW STONE BOUNDARY */}
      {/* Low Ancient Perimeter Wall */}
      <group>
        {[-26, 26].map((x) => (
          <React.Fragment key={`wall-x-${x}`}>
            <mesh position={[x, 0.45, 0]} castShadow receiveShadow material={materials.sandstone}>
              <boxGeometry args={[1.2, 0.9, 52]} />
            </mesh>
            <mesh position={[0, 0.45, x]} castShadow receiveShadow material={materials.sandstone}>
              <boxGeometry args={[52, 0.9, 1.2]} />
            </mesh>
          </React.Fragment>
        ))}
      </group>

      {/* Outer Grove of Ancient Sal and Banyan Trees bounding the perimeter */}
      {[
        [-32, -30], [-20, -35], [0, -36], [22, -34], [34, -28],
        [-35, -15], [36, -12],
        [-36, 12], [36, 15],
        [-32, 32], [-18, 35], [20, 35], [33, 30]
      ].map(([tx, tz], tIdx) => {
        const heightScale = 0.85 + (tIdx % 4) * 0.15;
        return (
          <group key={`grove-tree-${tIdx}`} position={[tx, 0, tz]} scale={[heightScale, heightScale, heightScale]}>
            {/* Trunk */}
            <mesh position={[0, 3, 0]} castShadow receiveShadow material={materials.bodhiBark}>
              <cylinderGeometry args={[0.7, 1.2, 6, 8]} />
            </mesh>
            {/* Layered Foliage Domes */}
            <mesh position={[0, 6.5, 0]} castShadow material={materials.bodhiLeaves}>
              <dodecahedronGeometry args={[3.8, 1]} />
            </mesh>
            <mesh position={[0.8, 8.2, -0.6]} castShadow material={materials.bodhiLeaves}>
              <dodecahedronGeometry args={[2.6, 1]} />
            </mesh>
          </group>
        );
      })}

      {/* 4. FLOATING SACRED GOLDEN PARTICLES (Motes of wisdom & leaves) */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#fde047"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};
