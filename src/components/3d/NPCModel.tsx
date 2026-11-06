/**
 * 3D NPC Character Models: Monk, Archaeologist, Pilgrim
 * Features procedural multi-part modeling, proximity recognition, and overhead title tags.
 */
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { NPC } from '../../types/game';

interface NPCModelProps {
  npc: NPC;
  playerPos: [number, number, number];
  onInteract: (npc: NPC) => void;
}

export const NPCModel: React.FC<NPCModelProps> = ({ npc, playerPos, onInteract }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Proximity check
  const distToPlayer = useMemo(() => {
    const dx = npc.position[0] - playerPos[0];
    const dz = npc.position[2] - playerPos[2];
    return Math.sqrt(dx * dx + dz * dz);
  }, [npc.position, playerPos]);

  const isNearby = distToPlayer < 4.0;

  // Materials based on model type
  const npcMaterials = useMemo(() => {
    if (npc.modelType === 'monk') {
      return {
        robe: new THREE.MeshStandardMaterial({ color: new THREE.Color('#d96b27'), roughness: 0.8 }),
        skin: new THREE.MeshStandardMaterial({ color: new THREE.Color('#a87954'), roughness: 0.5 }),
        beads: new THREE.MeshStandardMaterial({ color: new THREE.Color('#4a2e18'), roughness: 0.6 }),
      };
    } else if (npc.modelType === 'archaeologist') {
      return {
        robe: new THREE.MeshStandardMaterial({ color: new THREE.Color('#c2b280'), roughness: 0.75 }), // Khaki
        vest: new THREE.MeshStandardMaterial({ color: new THREE.Color('#556b2f'), roughness: 0.8 }), // Olive
        skin: new THREE.MeshStandardMaterial({ color: new THREE.Color('#b38662'), roughness: 0.5 }),
        hat: new THREE.MeshStandardMaterial({ color: new THREE.Color('#dcd0b3'), roughness: 0.65 }),
      };
    } else {
      // Pilgrim
      return {
        robe: new THREE.MeshStandardMaterial({ color: new THREE.Color('#78281f'), roughness: 0.85 }), // Maroon
        sash: new THREE.MeshStandardMaterial({ color: new THREE.Color('#f4d03f'), roughness: 0.6 }),
        skin: new THREE.MeshStandardMaterial({ color: new THREE.Color('#b5835c'), roughness: 0.5 }),
      };
    }
  }, [npc.modelType]);

  // Turn to face player when nearby
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current && isNearby) {
      const dx = playerPos[0] - npc.position[0];
      const dz = playerPos[2] - npc.position[2];
      const targetAngle = Math.atan2(dx, dz);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetAngle, 4, delta);
    } else if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, npc.rotationY, 2, delta);
    }

    if (headRef.current) {
      headRef.current.position.y = 0.52 + Math.sin(t * 2 + npc.position[0]) * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={npc.position}>
      {/* Ground contact shadow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.25} depthWrite={false} />
      </mesh>

      {/* Proximity Ring when player is near */}
      {isNearby && (
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.35, 32]} />
          <meshBasicMaterial color="#ffd700" transparent opacity={0.65} />
        </mesh>
      )}

      {/* 1. MONK MODEL (Venerable Ananda) */}
      {npc.modelType === 'monk' && (
        <group position={[0, 0, 0]}>
          {/* Lower Robe Hem (Antaravasaka) */}
          <mesh position={[0, 0.5, 0]} castShadow material={npcMaterials.robe}>
            <cylinderGeometry args={[0.34, 0.46, 0.95, 16]} />
          </mesh>
          {/* Upper Robe Draped over Left Shoulder (Uttarasanga) */}
          <mesh position={[0, 1.1, 0]} castShadow material={npcMaterials.robe}>
            <cylinderGeometry args={[0.3, 0.35, 0.65, 16]} />
          </mesh>
          {/* Right Arm Bare Shoulder */}
          <mesh position={[0.26, 1.05, 0]} material={npcMaterials.skin}>
            <capsuleGeometry args={[0.07, 0.35, 4, 8]} />
          </mesh>
          {/* Left Arm covered in robe */}
          <mesh position={[-0.26, 1.05, 0]} material={npcMaterials.robe}>
            <capsuleGeometry args={[0.08, 0.35, 4, 8]} />
          </mesh>
          {/* Prayer Mala Beads looped around hand */}
          <mesh position={[0, 0.85, 0.22]} material={npcMaterials.beads}>
            <torusGeometry args={[0.1, 0.02, 8, 16]} />
          </mesh>
        </group>
      )}

      {/* 2. ARCHAEOLOGIST MODEL (Dr. Maya Sen) */}
      {npc.modelType === 'archaeologist' && (
        <group position={[0, 0, 0]}>
          {/* Pants */}
          <mesh position={[-0.12, 0.45, 0]} castShadow material={npcMaterials.robe}>
            <capsuleGeometry args={[0.08, 0.5, 4, 8]} />
          </mesh>
          <mesh position={[0.12, 0.45, 0]} castShadow material={npcMaterials.robe}>
            <capsuleGeometry args={[0.08, 0.5, 4, 8]} />
          </mesh>
          {/* Field Vest Torso */}
          <mesh position={[0, 1.05, 0]} castShadow material={npcMaterials.vest}>
            <boxGeometry args={[0.38, 0.48, 0.26]} />
          </mesh>
          {/* Field Notepad in Hand */}
          <mesh position={[0.22, 0.9, 0.2]} rotation={[0.4, 0.2, 0]} material={npcMaterials.hat}>
            <boxGeometry args={[0.15, 0.22, 0.03]} />
          </mesh>
        </group>
      )}

      {/* 3. PILGRIM MODEL (Tashi) */}
      {npc.modelType === 'pilgrim' && (
        <group position={[0, 0, 0]}>
          {/* Heavy wool robe */}
          <mesh position={[0, 0.55, 0]} castShadow material={npcMaterials.robe}>
            <cylinderGeometry args={[0.35, 0.45, 1.05, 16]} />
          </mesh>
          {/* Gold Silk Sash */}
          <mesh position={[0, 0.92, 0]} material={npcMaterials.sash!}>
            <cylinderGeometry args={[0.36, 0.36, 0.12, 16]} />
          </mesh>
        </group>
      )}

      {/* HEAD & FACE FOR ALL NPCS */}
      <group ref={headRef} position={[0, 1.45, 0]}>
        {/* Head */}
        <mesh castShadow material={npcMaterials.skin}>
          <sphereGeometry args={[0.17, 16, 16]} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.05, 0.02, 0.14]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.05, 0.02, 0.14]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>

        {/* Sun Hat for Archaeologist */}
        {npc.modelType === 'archaeologist' && (
          <group position={[0, 0.14, 0]}>
            <mesh material={npcMaterials.hat}>
              <cylinderGeometry args={[0.18, 0.19, 0.12, 16]} />
            </mesh>
            <mesh position={[0, -0.04, 0]} material={npcMaterials.hat}>
              <cylinderGeometry args={[0.34, 0.34, 0.02, 16]} />
            </mesh>
          </group>
        )}
      </group>

      {/* 3D FLOATING HTML OVERHEAD BADGE */}
      <Html position={[0, 2.3, 0]} center distanceFactor={14} style={{ pointerEvents: 'none' }}>
        <div className="flex flex-col items-center">
          {/* Quest / Guide Indicator Icon */}
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 ${
              isNearby
                ? 'bg-amber-400 text-amber-950 border-amber-200 scale-110'
                : 'bg-stone-900/80 text-amber-300 border-amber-500/50'
            } transition-all duration-200`}
          >
            {npc.modelType === 'monk' ? '☸' : npc.modelType === 'archaeologist' ? '🔍' : '🪔'}
          </div>

          {/* Name & Title Plaque */}
          <div className="mt-1 px-2.5 py-1 bg-stone-900/90 border border-amber-500/40 rounded-md text-center shadow-lg backdrop-blur-sm whitespace-nowrap">
            <div className="text-amber-200 text-xs font-semibold tracking-wide">{npc.name}</div>
            <div className="text-amber-400/80 text-[10px]">{npc.role}</div>
          </div>

          {/* Interactive prompt button when nearby */}
          {isNearby && (
            <button
              onClick={() => onInteract(npc)}
              style={{ pointerEvents: 'auto' }}
              className="mt-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 text-xs font-bold rounded shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex items-center gap-1 border border-amber-200"
            >
              <span>Speak [E]</span>
            </button>
          )}
        </div>
      </Html>
    </group>
  );
};
