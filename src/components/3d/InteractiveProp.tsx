/**
 * 3D Interactive Object Proximity & Inspection Trigger
 */
import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import { InteractiveObject } from '../../types/game';

interface InteractivePropProps {
  object: InteractiveObject;
  playerPos: [number, number, number];
  onInteract: (obj: InteractiveObject) => void;
  isLit?: boolean;
}

export const InteractiveProp: React.FC<InteractivePropProps> = ({
  object,
  playerPos,
  onInteract,
  isLit,
}) => {
  const dist = useMemo(() => {
    const dx = object.position[0] - playerPos[0];
    const dz = object.position[2] - playerPos[2];
    return Math.sqrt(dx * dx + dz * dz);
  }, [object.position, playerPos]);

  const isNearby = dist <= object.interactionRadius;

  // Don't show redundant prompt if lamp is already lit
  if (object.type === 'lamp' && isLit) {
    return null;
  }

  return (
    <group position={object.position}>
      {/* Ground Proximity Beacon Ring when nearby */}
      {isNearby && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[object.interactionRadius * 0.45, object.interactionRadius * 0.55, 32]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Floating 3D Interaction Button when close */}
      {isNearby && (
        <Html position={[0, 1.8, 0]} center distanceFactor={12} style={{ pointerEvents: 'auto' }}>
          <div className="flex flex-col items-center animate-bounce">
            <button
              onClick={() => onInteract(object)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-full shadow-xl border border-amber-200 cursor-pointer flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span className="w-4 h-4 bg-stone-950 text-amber-300 rounded-full flex items-center justify-center text-[10px]">E</span>
              <span>{object.prompt.replace('[E]', '')}</span>
            </button>
            <div className="text-[10px] text-amber-200/90 font-medium bg-stone-900/80 px-2 py-0.5 rounded mt-1 border border-amber-500/30">
              {object.name}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};
