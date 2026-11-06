/**
 * Third-Person Orbit Follow Camera Controller
 * Smooth interpolation, rotation control via pointer drag, zoom with wheel,
 * and ground collision protection.
 */
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

interface ThirdPersonCameraProps {
  playerPos: [number, number, number];
  playerRotation: number;
}

export const ThirdPersonCamera: React.FC<ThirdPersonCameraProps> = ({ playerPos }) => {
  const { camera, gl } = useThree();

  // Camera spherical coordinates relative to player target
  const distanceRef = useRef(7.5);
  const thetaRef = useRef(Math.PI); // horizontal angle (starts behind player)
  const phiRef = useRef(0.42); // vertical pitch angle (above player)

  const isDraggingRef = useRef(false);
  const previousPointerPos = useRef({ x: 0, y: 0 });

  // Current interpolated follow position
  const currentTargetPos = useRef(new THREE.Vector3(playerPos[0], playerPos[1] + 1.4, playerPos[2]));

  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      // Primary button or middle button drag
      isDraggingRef.current = true;
      previousPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - previousPointerPos.current.x;
      const dy = e.clientY - previousPointerPos.current.y;
      previousPointerPos.current = { x: e.clientX, y: e.clientY };

      const rotateSpeed = 0.006;
      thetaRef.current -= dx * rotateSpeed;
      phiRef.current += dy * rotateSpeed;

      // Clamp vertical pitch to keep camera above ground and prevent flipping
      phiRef.current = Math.max(0.12, Math.min(1.25, phiRef.current));
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      distanceRef.current += e.deltaY * 0.005;
      // Clamp distance between 3.5m and 15m
      distanceRef.current = Math.max(3.5, Math.min(15.0, distanceRef.current));
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
    };
  }, [gl.domElement]);

  useFrame((_, delta) => {
    // 1. Smoothly interpolate target focus point toward player position
    const targetPlayerPos = new THREE.Vector3(playerPos[0], playerPos[1] + 1.4, playerPos[2]);
    currentTargetPos.current.lerp(targetPlayerPos, THREE.MathUtils.clamp(delta * 8, 0, 1));

    // 2. Compute camera position from spherical coordinates
    const dist = distanceRef.current;
    const theta = thetaRef.current;
    const phi = phiRef.current;

    const targetX = currentTargetPos.current.x + Math.sin(theta) * Math.cos(phi) * dist;
    // Keep camera at least 1.1 meters above ground level to prevent floor clipping
    const targetY = Math.max(1.1, currentTargetPos.current.y + Math.sin(phi) * dist);
    const targetZ = currentTargetPos.current.z + Math.cos(theta) * Math.cos(phi) * dist;

    // Smoothly damp camera position
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 10, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 10, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 10, delta);

    // Look at player focus point
    camera.lookAt(currentTargetPos.current);
  });

  return null;
};
