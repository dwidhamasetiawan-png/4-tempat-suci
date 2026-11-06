/**
 * 3D Third-Person Young Explorer Avatar
 * Procedurally animated multi-part character (THREE.Group) with walking/running kinematics,
 * jumping, smooth rotation damping, and character customization.
 */
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CharacterProfile } from '../../types/game';

interface PlayerCharacterProps {
  position: [number, number, number];
  rotationY: number;
  isMoving: boolean;
  isRunning: boolean;
  isJumping: boolean;
  jumpProgress: number; // 0 to 1
  character: CharacterProfile;
}

export const PlayerCharacter: React.FC<PlayerCharacterProps> = ({
  position,
  rotationY,
  isMoving,
  isRunning,
  isJumping,
  jumpProgress,
  character,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Materials based on character profile
  const materials = useMemo(() => {
    return {
      cloth: new THREE.MeshStandardMaterial({
        color: new THREE.Color(character.clothingColor),
        roughness: 0.7,
      }),
      accent: new THREE.MeshStandardMaterial({
        color: new THREE.Color(character.accentColor),
        roughness: 0.6,
      }),
      backpack: new THREE.MeshStandardMaterial({
        color: new THREE.Color(character.backpackColor),
        roughness: 0.8,
      }),
      skin: new THREE.MeshStandardMaterial({
        color: new THREE.Color(character.skinColor),
        roughness: 0.5,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: new THREE.Color(character.hairColor),
        roughness: 0.8,
      }),
      leather: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3b2219'),
        roughness: 0.7,
      }),
      brass: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#d4af37'),
        metalness: 0.8,
        roughness: 0.3,
      }),
    };
  }, [character]);

  // Procedural Locomotion Animation loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth rotation toward target orientation
    if (rootGroupRef.current) {
      // Lerp rotation to prevent snapping
      const curRot = rootGroupRef.current.rotation.y;
      let diff = rotationY - curRot;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(curRot, curRot + diff, 14, delta);
    }

    if (isJumping) {
      // Jumping pose: legs tucked slightly, arms raised
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = -0.4;
        rightLegRef.current.rotation.x = 0.2;
      }
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = 0.6;
        rightArmRef.current.rotation.x = 0.6;
      }
      if (torsoRef.current) {
        torsoRef.current.position.y = 0.1;
      }
    } else if (isMoving) {
      // Walk / Run gait kinematics
      const speedMultiplier = isRunning ? 16 : 10;
      const swingAngle = Math.sin(t * speedMultiplier) * (isRunning ? 0.75 : 0.45);
      const bobbing = Math.abs(Math.sin(t * speedMultiplier)) * (isRunning ? 0.08 : 0.04);

      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = swingAngle;
        rightLegRef.current.rotation.x = -swingAngle;
      }
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -swingAngle * 0.9;
        rightArmRef.current.rotation.x = swingAngle * 0.9;
      }
      if (torsoRef.current) {
        torsoRef.current.position.y = bobbing;
      }
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(t * speedMultiplier * 0.5) * 0.05;
      }
    } else {
      // Idle breathing & subtle weight shift
      const idleBreathing = Math.sin(t * 2.5) * 0.02;
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = THREE.MathUtils.damp(leftLegRef.current.rotation.x, 0, 8, delta);
        rightLegRef.current.rotation.x = THREE.MathUtils.damp(rightLegRef.current.rotation.x, 0, 8, delta);
      }
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(t * 2.0) * 0.05;
        rightArmRef.current.rotation.x = -Math.sin(t * 2.0) * 0.05;
      }
      if (torsoRef.current) {
        torsoRef.current.position.y = idleBreathing;
      }
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(t * 0.8) * 0.08;
      }
    }
  });

  // Calculate jump Y offset
  const jumpY = isJumping ? Math.sin(jumpProgress * Math.PI) * 1.3 : 0;

  return (
    <group position={[position[0], position[1] + jumpY, position[2]]}>
      <group ref={rootGroupRef}>
        {/* Soft grounding contact shadow circle under the player */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.42, 16]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.3} depthWrite={false} />
        </mesh>

        {/* 1. PELVIS & HIPS */}
        <mesh position={[0, 0.74, 0]} castShadow material={materials.cloth}>
          <boxGeometry args={[0.36, 0.16, 0.24]} />
        </mesh>

        {/* 2. LEGS & BOOTS */}
        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.11, 0.7, 0]}>
          {/* Thigh */}
          <mesh position={[0, -0.22, 0]} castShadow material={materials.cloth}>
            <capsuleGeometry args={[0.07, 0.24, 4, 8]} />
          </mesh>
          {/* Boot */}
          <mesh position={[0, -0.42, 0.02]} castShadow material={materials.leather}>
            <boxGeometry args={[0.13, 0.16, 0.22]} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.11, 0.7, 0]}>
          {/* Thigh */}
          <mesh position={[0, -0.22, 0]} castShadow material={materials.cloth}>
            <capsuleGeometry args={[0.07, 0.24, 4, 8]} />
          </mesh>
          {/* Boot */}
          <mesh position={[0, -0.42, 0.02]} castShadow material={materials.leather}>
            <boxGeometry args={[0.13, 0.16, 0.22]} />
          </mesh>
        </group>

        {/* 3. TORSO, JACKET & EXPEDITION BACKPACK */}
        <group ref={torsoRef} position={[0, 0.85, 0]}>
          {/* Lower Belt */}
          <mesh position={[0, -0.05, 0]} material={materials.leather}>
            <boxGeometry args={[0.38, 0.08, 0.26]} />
          </mesh>
          {/* Belt Buckle */}
          <mesh position={[0, -0.05, 0.14]} material={materials.brass}>
            <boxGeometry args={[0.08, 0.06, 0.02]} />
          </mesh>

          {/* Torso / Explorer Vest */}
          <mesh position={[0, 0.22, 0]} castShadow material={materials.cloth}>
            <boxGeometry args={[0.38, 0.44, 0.24]} />
          </mesh>

          {/* Vest Collar / Accent Trim */}
          <mesh position={[0, 0.38, 0.08]} material={materials.accent}>
            <boxGeometry args={[0.26, 0.12, 0.1]} />
          </mesh>

          {/* Field Backpack on back */}
          <group position={[0, 0.22, -0.18]}>
            <mesh castShadow material={materials.backpack}>
              <boxGeometry args={[0.32, 0.36, 0.18]} />
            </mesh>
            {/* Rolled Sleeping Mat / Field Map on top of pack */}
            <mesh position={[0, 0.22, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.accent}>
              <cylinderGeometry args={[0.07, 0.07, 0.36, 12]} />
            </mesh>
            {/* Water Canteen / Field Journal Flask on side */}
            <mesh position={[0.18, -0.05, 0]} material={materials.brass}>
              <cylinderGeometry args={[0.05, 0.05, 0.16, 8]} />
            </mesh>
          </group>

          {/* 4. ARMS & HANDS */}
          {/* Left Arm */}
          <group ref={leftArmRef} position={[-0.24, 0.36, 0]}>
            <mesh position={[0, -0.18, 0]} castShadow material={materials.cloth}>
              <capsuleGeometry args={[0.06, 0.22, 4, 8]} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.34, 0]} material={materials.skin}>
              <sphereGeometry args={[0.06, 8, 8]} />
            </mesh>
          </group>

          {/* Right Arm (Carrying Explorer Lantern) */}
          <group ref={rightArmRef} position={[0.24, 0.36, 0]}>
            <mesh position={[0, -0.18, 0]} castShadow material={materials.cloth}>
              <capsuleGeometry args={[0.06, 0.22, 4, 8]} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.34, 0]} material={materials.skin}>
              <sphereGeometry args={[0.06, 8, 8]} />
            </mesh>

            {/* Handheld Brass Explorer Lantern */}
            <group position={[0, -0.42, 0.1]}>
              <mesh material={materials.brass}>
                <cylinderGeometry args={[0.06, 0.08, 0.16, 8]} />
              </mesh>
              <mesh position={[0, 0.12, 0]} material={materials.brass}>
                <torusGeometry args={[0.05, 0.015, 6, 12]} />
              </mesh>
              {/* Warm lantern light pointing forward */}
              <pointLight color="#ffae42" intensity={1.2} distance={4.5} />
            </group>
          </group>

          {/* 5. NECK, HEAD & HAIR / EXPEDITION CAP */}
          <group ref={headRef} position={[0, 0.48, 0]}>
            {/* Neck */}
            <mesh position={[0, 0.04, 0]} material={materials.skin}>
              <cylinderGeometry args={[0.06, 0.07, 0.1, 8]} />
            </mesh>

            {/* Head Face */}
            <mesh position={[0, 0.18, 0]} castShadow material={materials.skin}>
              <sphereGeometry args={[0.16, 16, 16]} />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.05, 0.19, 0.14]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0.05, 0.19, 0.14]}>
              <sphereGeometry args={[0.022, 8, 8]} />
              <meshBasicMaterial color="#1a1a1a" />
            </mesh>

            {/* Hair / Cap Base */}
            <mesh position={[0, 0.24, -0.02]} material={materials.hair}>
              <sphereGeometry args={[0.17, 12, 12, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
            </mesh>

            {/* Explorer Headband / Visor */}
            <mesh position={[0, 0.25, 0.08]} material={materials.accent}>
              <boxGeometry args={[0.3, 0.05, 0.18]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
