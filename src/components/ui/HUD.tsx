/**
 * In-Game Heads-Up Display (HUD)
 * Unobstructed central 3D viewport, collapsible bottom control dock,
 * static status indicators, and keyboard shortcuts.
 */
import React, { useState } from 'react';
import {
  BookOpen,
  Scroll,
  Award,
  Volume2,
  VolumeX,
  Pause,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Flame,
  Compass,
  Info
} from 'lucide-react';
import { CharacterProfile, Quest } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface HUDProps {
  character: CharacterProfile;
  activeQuest: Quest | undefined;
  completedQuestsCount: number;
  totalQuestsCount: number;
  playerLevel: number;
  playerXP: number;
  litLampsCount: number;
  relicsCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenJournal: () => void;
  onOpenQuests: () => void;
  onOpenQuiz: () => void;
  onOpenRelics: () => void;
  onOpenPause: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  character,
  activeQuest,
  completedQuestsCount,
  totalQuestsCount,
  playerLevel,
  playerXP,
  litLampsCount,
  relicsCount,
  soundEnabled,
  onToggleSound,
  onOpenJournal,
  onOpenQuests,
  onOpenQuiz,
  onOpenRelics,
  onOpenPause,
}) => {
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30 flex flex-col justify-between p-3 sm:p-5 overflow-hidden">
      {/* 1. TOP BAR: Minimal Explorer Plaque (Left) & Active Quest Pin (Right) */}
      <div className="flex items-start justify-between gap-4 pointer-events-auto">
        {/* Explorer Badge */}
        <div className="flex items-center gap-3 px-3 py-2 bg-stone-900/90 border border-amber-500/30 rounded-xl shadow-lg backdrop-blur-sm max-w-xs">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0 border border-amber-400/40"
            style={{ backgroundColor: character.clothingColor }}
          >
            {character.name[0]}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-200 text-xs sm:text-sm truncate">{character.name}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded border border-amber-500/30">
                Lv. {playerLevel}
              </span>
            </div>
            {/* XP Bar */}
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-24 sm:w-28 h-1.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                  style={{ width: `${Math.min(100, (playerXP % 200) / 2)}%` }}
                />
              </div>
              <span className="text-[10px] text-amber-300/80 font-mono">{playerXP} XP</span>
            </div>
          </div>
        </div>

        {/* Location & Active Quest Pin */}
        <div className="flex flex-col items-end gap-2 max-w-sm">
          {/* Site Location Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-stone-900/90 border border-amber-500/30 rounded-full shadow text-[11px] text-amber-300">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Bodh Gaya • Mahabodhi Sanctuary</span>
          </div>

          {/* Active Quest Card */}
          {activeQuest && (
            <div
              onClick={() => {
                soundManager.playClick();
                onOpenQuests();
              }}
              className="p-3 bg-stone-900/90 hover:bg-stone-800/90 border border-amber-500/40 rounded-xl shadow-xl backdrop-blur-sm cursor-pointer transition-all max-w-xs text-right"
            >
              <div className="flex items-center justify-end gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                <Scroll className="w-3.5 h-3.5" />
                <span>Active Mission ({completedQuestsCount}/{totalQuestsCount})</span>
              </div>
              <div className="text-xs font-bold text-amber-100 mt-0.5">{activeQuest.title}</div>
              <div className="text-[11px] text-stone-300 mt-1 line-clamp-2">{activeQuest.objective}</div>
            </div>
          )}
        </div>
      </div>

      {/* 2. CENTER: Clean 100% Unobstructed 3D Viewport */}
      <div className="flex-1" />

      {/* 3. BOTTOM: UNIFIED COLLAPSIBLE DOCK (Zero Viewport Occlusion Directive) */}
      <div className="relative mx-auto pointer-events-auto flex flex-col items-center">
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            setIsDockCollapsed(!isDockCollapsed);
          }}
          className="px-3 py-1 bg-stone-900/95 hover:bg-stone-800 border-t border-x border-amber-500/30 rounded-t-lg text-[11px] text-amber-300/90 font-medium flex items-center gap-1 shadow-md transition-colors cursor-pointer"
        >
          {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>{isDockCollapsed ? 'Show Controls Dock' : 'Hide Dock'}</span>
        </button>

        {/* Horizontal Control Dock */}
        {!isDockCollapsed && (
          <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-stone-900/95 border border-amber-500/40 rounded-2xl shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-[95vw]">
            {/* Journal */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenJournal();
              }}
              className="px-3 py-1.5 bg-stone-800/80 hover:bg-amber-500/20 hover:text-amber-200 border border-amber-500/30 rounded-xl text-xs font-semibold text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open Knowledge Journal (J)"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Journal</span>
              <kbd className="hidden sm:inline text-[9px] bg-stone-950 px-1 py-0.2 rounded text-stone-400 border border-stone-800">J</kbd>
            </button>

            {/* Quests */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenQuests();
              }}
              className="px-3 py-1.5 bg-stone-800/80 hover:bg-amber-500/20 hover:text-amber-200 border border-amber-500/30 rounded-xl text-xs font-semibold text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open Quest Log (Q)"
            >
              <Scroll className="w-4 h-4 text-amber-400" />
              <span>Missions</span>
              <kbd className="hidden sm:inline text-[9px] bg-stone-950 px-1 py-0.2 rounded text-stone-400 border border-stone-800">Q</kbd>
            </button>

            {/* Quiz */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenQuiz();
              }}
              className="px-3 py-1.5 bg-stone-800/80 hover:bg-amber-500/20 hover:text-amber-200 border border-amber-500/30 rounded-xl text-xs font-semibold text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Open Sacred Heritage Quiz"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Quiz</span>
            </button>

            {/* Relics */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenRelics();
              }}
              className="px-3 py-1.5 bg-stone-800/80 hover:bg-amber-500/20 hover:text-amber-200 border border-amber-500/30 rounded-xl text-xs font-semibold text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="View Collected Relics & Artifacts"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Relics ({relicsCount}/5)</span>
            </button>

            {/* Butter Lamp Counter */}
            <div className="px-2.5 py-1.5 bg-stone-950/70 border border-amber-500/20 rounded-xl text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Lamps: {litLampsCount}/4</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                soundManager.playClick();
              }}
              className="p-1.5 bg-stone-800/80 hover:bg-stone-700 border border-amber-500/30 rounded-xl text-amber-300 transition-colors cursor-pointer"
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>

            {/* Pause / Guide */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenPause();
              }}
              className="p-1.5 bg-stone-800/80 hover:bg-stone-700 border border-amber-500/30 rounded-xl text-amber-300 transition-colors cursor-pointer"
              title="Pause & Controls Guide"
            >
              <Pause className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Minimal Control Legend on Bottom */}
        {!isDockCollapsed && (
          <div className="mt-1 text-[10px] text-stone-400/90 font-medium flex items-center gap-3">
            <span>WASD: Move</span>
            <span>Shift: Sprint</span>
            <span>Space: Jump</span>
            <span>Mouse Drag: Orbit Camera</span>
            <span>Scroll: Zoom</span>
          </div>
        )}
      </div>
    </div>
  );
};
