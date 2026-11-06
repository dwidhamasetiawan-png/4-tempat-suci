/**
 * On-Screen Virtual Controls for touchscreens and accessibility
 */
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap, ArrowUpCircle } from 'lucide-react';

interface MobileControlsProps {
  onDirectionChange: (vector: { x: number; y: number }) => void;
  onInteract: () => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onDirectionChange, onInteract }) => {
  const [activeKeys, setActiveKeys] = useState<{ [dir: string]: boolean }>({});

  const handleDir = (dir: string, pressed: boolean) => {
    const updated = { ...activeKeys, [dir]: pressed };
    setActiveKeys(updated);

    let x = 0;
    let y = 0;
    if (updated['up']) y -= 1;
    if (updated['down']) y += 1;
    if (updated['left']) x -= 1;
    if (updated['right']) x += 1;

    onDirectionChange({ x, y });
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex justify-between items-end p-4 pb-16 sm:pb-20 select-none">
      {/* Direction Pad (Left) */}
      <div className="pointer-events-auto grid grid-cols-3 gap-1 w-32 h-32 bg-stone-950/60 p-1.5 rounded-2xl border border-amber-500/30 backdrop-blur-sm">
        <div />
        <button
          onTouchStart={() => handleDir('up', true)}
          onTouchEnd={() => handleDir('up', false)}
          onMouseDown={() => handleDir('up', true)}
          onMouseUp={() => handleDir('up', false)}
          className="flex items-center justify-center bg-stone-800/80 active:bg-amber-500 rounded-lg text-amber-300 active:text-stone-950 text-sm font-bold shadow"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div />

        <button
          onTouchStart={() => handleDir('left', true)}
          onTouchEnd={() => handleDir('left', false)}
          onMouseDown={() => handleDir('left', true)}
          onMouseUp={() => handleDir('left', false)}
          className="flex items-center justify-center bg-stone-800/80 active:bg-amber-500 rounded-lg text-amber-300 active:text-stone-950 text-sm font-bold shadow"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center justify-center text-[10px] text-stone-500 font-mono">MOVE</div>
        <button
          onTouchStart={() => handleDir('right', true)}
          onTouchEnd={() => handleDir('right', false)}
          onMouseDown={() => handleDir('right', true)}
          onMouseUp={() => handleDir('right', false)}
          className="flex items-center justify-center bg-stone-800/80 active:bg-amber-500 rounded-lg text-amber-300 active:text-stone-950 text-sm font-bold shadow"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        <div />
        <button
          onTouchStart={() => handleDir('down', true)}
          onTouchEnd={() => handleDir('down', false)}
          onMouseDown={() => handleDir('down', true)}
          onMouseUp={() => handleDir('down', false)}
          className="flex items-center justify-center bg-stone-800/80 active:bg-amber-500 rounded-lg text-amber-300 active:text-stone-950 text-sm font-bold shadow"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
        <div />
      </div>

      {/* Action Buttons (Right) */}
      <div className="pointer-events-auto flex flex-col gap-2.5 items-end">
        {/* Interact / Speak Button [E] */}
        <button
          onClick={onInteract}
          className="w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-extrabold text-sm shadow-xl flex items-center justify-center border-2 border-amber-200 cursor-pointer active:scale-95 transition-transform"
        >
          <span>E</span>
        </button>
      </div>
    </div>
  );
};
