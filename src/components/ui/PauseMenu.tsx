/**
 * Pause Menu & Settings
 * Keyboard controls reference, sound settings, resume, and restart actions.
 */
import React from 'react';
import { Play, RotateCcw, Home, Volume2, VolumeX, Keyboard, HelpCircle } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface PauseMenuProps {
  soundEnabled: boolean;
  ambientVolume: number;
  sfxVolume: number;
  onToggleSound: () => void;
  onChangeAmbientVolume: (v: number) => void;
  onChangeSfxVolume: (v: number) => void;
  onResume: () => void;
  onRestart: () => void;
  onReturnToMainMenu: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  soundEnabled,
  ambientVolume,
  sfxVolume,
  onToggleSound,
  onChangeAmbientVolume,
  onChangeSfxVolume,
  onResume,
  onRestart,
  onReturnToMainMenu,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Title */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 text-xl font-bold mb-2">
            ⏸
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-200">Expedition Paused</h2>
          <p className="text-stone-400 text-xs mt-0.5">Mahabodhi Sanctuary • Bodh Gaya</p>
        </div>

        {/* Controls Reference Card */}
        <div className="p-4 bg-stone-950/70 border border-stone-800 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Keyboard className="w-4 h-4 text-amber-400" />
            <span>Explorer Controls Guide</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
            <div className="flex items-center justify-between p-2 bg-stone-900 rounded border border-stone-800/80">
              <span className="text-stone-400">Move Around:</span>
              <span className="font-mono font-bold text-amber-200">W, A, S, D / Arrows</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-stone-900 rounded border border-stone-800/80">
              <span className="text-stone-400">Sprint / Run:</span>
              <span className="font-mono font-bold text-amber-200">Shift</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-stone-900 rounded border border-stone-800/80">
              <span className="text-stone-400">Jump:</span>
              <span className="font-mono font-bold text-amber-200">Space</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-stone-900 rounded border border-stone-800/80">
              <span className="text-stone-400">Interact / Speak:</span>
              <span className="font-mono font-bold text-amber-200">E</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-stone-900 rounded border border-stone-800/80">
              <span className="text-stone-400">Orbit Camera:</span>
              <span className="font-mono font-bold text-amber-200">Mouse Drag</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-stone-900 rounded border border-stone-800/80">
              <span className="text-stone-400">Zoom In/Out:</span>
              <span className="font-mono font-bold text-amber-200">Mouse Wheel</span>
            </div>
          </div>
        </div>

        {/* Audio Volume Controls */}
        <div className="p-4 bg-stone-950/70 border border-stone-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Audio Atmosphere</span>
            </span>
            <button
              onClick={() => {
                onToggleSound();
                soundManager.playClick();
              }}
              className="px-2.5 py-1 text-xs bg-stone-900 hover:bg-stone-800 rounded border border-amber-500/30 text-amber-200 flex items-center gap-1.5 cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-rose-400" />}
              <span>{soundEnabled ? 'Mute Audio' : 'Unmute Audio'}</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-300">
              <span>Temple Meditation Drone:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={ambientVolume}
                onChange={(e) => onChangeAmbientVolume(parseFloat(e.target.value))}
                className="w-32 accent-amber-400 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-stone-300">
              <span>Chimes & Footsteps SFX:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={sfxVolume}
                onChange={(e) => onChangeSfxVolume(parseFloat(e.target.value))}
                className="w-32 accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              soundManager.playClick();
              onResume();
            }}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-transform transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-amber-200"
          >
            <Play className="w-4 h-4 fill-stone-950" />
            <span>Resume Journey</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                soundManager.playClick();
                onRestart();
              }}
              className="py-2.5 px-4 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl text-xs font-semibold text-stone-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Restart Site</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onReturnToMainMenu();
              }}
              className="py-2.5 px-4 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-xl text-xs font-semibold text-stone-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>Main Menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
