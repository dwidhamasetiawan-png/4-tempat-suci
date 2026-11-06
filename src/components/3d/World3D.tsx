/**
 * 3D Main World Component
 * Integrates R3F Canvas, physics movement, keyboard inputs, collision, audio triggers,
 * and passes interaction events to game state.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CharacterProfile, NPC, InteractiveObject } from '../../types/game';
import { EnvironmentScene } from './EnvironmentScene';
import { MahabodhiTemple } from './MahabodhiTemple';
import { PlayerCharacter } from './PlayerCharacter';
import { NPCModel } from './NPCModel';
import { InteractiveProp } from './InteractiveProp';
import { ThirdPersonCamera } from './ThirdPersonCamera';
import { soundManager } from '../../utils/audio';

interface World3DProps {
  character: CharacterProfile;
  npcs: NPC[];
  interactiveObjects: InteractiveObject[];
  litLamps: string[];
  onInteractNPC: (npc: NPC) => void;
  onInteractObject: (obj: InteractiveObject) => void;
  movementVector?: { x: number; y: number }; // For on-screen joystick
}

export const World3D: React.FC<World3DProps> = ({
  character,
  npcs,
  interactiveObjects,
  litLamps,
  onInteractNPC,
  onInteractObject,
  movementVector,
}) => {
  // Player state: initial position at eastern entrance courtyard facing the temple
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0, 22]);
  const [playerRotation, setPlayerRotation] = useState<number>(Math.PI);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [jumpProgress, setJumpProgress] = useState<number>(0);

  // Active keyboard keys
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const footstepTimerRef = useRef<number>(0);

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;

      // Interaction shortcut [E]
      if (e.key.toLowerCase() === 'e') {
        checkInteraction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playerPos, npcs, interactiveObjects]);

  // Check closest interactable when pressing E
  const checkInteraction = useCallback(() => {
    // 1. Check closest NPC within 3.8m
    let closestNpc: NPC | null = null;
    let minNpcDist = 3.8;
    for (const npc of npcs) {
      const dx = npc.position[0] - playerPos[0];
      const dz = npc.position[2] - playerPos[2];
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d < minNpcDist) {
        minNpcDist = d;
        closestNpc = npc;
      }
    }
    if (closestNpc) {
      soundManager.playSingingBowl(340);
      onInteractNPC(closestNpc);
      return;
    }

    // 2. Check closest Interactive Object within radius
    let closestObj: InteractiveObject | null = null;
    let minObjDist = 999;
    for (const obj of interactiveObjects) {
      const dx = obj.position[0] - playerPos[0];
      const dz = obj.position[2] - playerPos[2];
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d <= obj.interactionRadius && d < minObjDist) {
        minObjDist = d;
        closestObj = obj;
      }
    }
    if (closestObj) {
      soundManager.playTempleBell();
      onInteractObject(closestObj);
    }
  }, [playerPos, npcs, interactiveObjects, onInteractNPC, onInteractObject]);

  // Movement physics loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const keys = keysRef.current;
      let moveX = 0;
      let moveZ = 0;

      // Keyboard WASD / Arrows
      if (keys['w'] || keys['arrowup']) moveZ -= 1;
      if (keys['s'] || keys['arrowdown']) moveZ += 1;
      if (keys['a'] || keys['arrowleft']) moveX -= 1;
      if (keys['d'] || keys['arrowright']) moveX += 1;

      // On-screen virtual joystick input
      if (movementVector && (Math.abs(movementVector.x) > 0.1 || Math.abs(movementVector.y) > 0.1)) {
        moveX += movementVector.x;
        moveZ += movementVector.y;
      }

      const running = Boolean(keys['shift']);
      setIsRunning(running);

      const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
      const moving = len > 0.1;
      setIsMoving(moving);

      // Handle jumping
      if ((keys[' '] || keys['space']) && !isJumping) {
        setIsJumping(true);
        setJumpProgress(0);
        soundManager.playFootstep();
      }

      if (isJumping) {
        setJumpProgress((prev) => {
          const next = prev + dt * 2.2;
          if (next >= 1) {
            setIsJumping(false);
            return 0;
          }
          return next;
        });
      }

      if (moving) {
        const normX = moveX / len;
        const normZ = moveZ / len;
        const speed = (running ? 9.0 : 5.5) * dt;

        // Target angle based on movement direction
        const targetRot = Math.atan2(normX, normZ);
        setPlayerRotation(targetRot);

        setPlayerPos(([px, py, pz]) => {
          let nextX = px + normX * speed;
          let nextZ = pz + normZ * speed;

          // 1. Perimeter boundary clamp [-24, 24]
          nextX = Math.max(-24, Math.min(24, nextX));
          nextZ = Math.max(-24, Math.min(24, nextZ));

          // 2. Collision with solid Main Temple inner core [x: -6 to 6, z: -6 to 6]
          // Allow player to walk in the doorway/portico if z > 6
          if (nextX > -6.5 && nextX < 6.5 && nextZ > -6.5 && nextZ < 6.2) {
            // Push back to closest boundary
            if (Math.abs(px) > Math.abs(pz)) {
              nextX = px; // stop X penetration
            } else {
              nextZ = pz; // stop Z penetration
            }
          }

          // 3. Collision with Lotus Pond [x: 10.5 to 21.5, z: 10.5 to 21.5]
          if (nextX > 10.5 && nextX < 21.5 && nextZ > 10.5 && nextZ < 21.5) {
            nextX = px;
            nextZ = pz;
          }

          return [nextX, py, nextZ];
        });

        // Footstep audio pacing
        footstepTimerRef.current += dt * (running ? 16 : 10);
        if (footstepTimerRef.current > Math.PI) {
          footstepTimerRef.current = 0;
          soundManager.playFootstep();
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isJumping, movementVector]);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        camera={{
          fov: 50,
          near: 0.2,
          far: 200,
          position: [0, 6, 32],
        }}
      >
        {/* Warm Golden Hour Fog */}
        <color attach="background" args={['#fae8b6']} />
        <fog attach="fog" args={['#fae8b6', 22, 90]} />

        {/* 3D Scene Elements */}
        <EnvironmentScene />
        <MahabodhiTemple litLamps={litLamps} />

        {/* NPCs */}
        {npcs.map((npc) => (
          <NPCModel
            key={npc.id}
            npc={npc}
            playerPos={playerPos}
            onInteract={onInteractNPC}
          />
        ))}

        {/* Interactive Objects */}
        {interactiveObjects.map((obj) => (
          <InteractiveProp
            key={obj.id}
            object={obj}
            playerPos={playerPos}
            onInteract={onInteractObject}
            isLit={litLamps.includes(obj.id)}
          />
        ))}

        {/* Player Avatar */}
        <PlayerCharacter
          position={playerPos}
          rotationY={playerRotation}
          isMoving={isMoving}
          isRunning={isRunning}
          isJumping={isJumping}
          jumpProgress={jumpProgress}
          character={character}
        />

        {/* Third Person Camera Follower */}
        <ThirdPersonCamera playerPos={playerPos} playerRotation={playerRotation} />
      </Canvas>
    </div>
  );
};
