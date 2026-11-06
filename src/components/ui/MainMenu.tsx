/**
 * Main Menu Screen
 * Title, immersive backdrop, character selection entrance, audio controls, and educational heritage context.
 */
import React from 'react';
import { Compass, BookOpen, Award, Volume2, VolumeX, Sparkles, User, Play } from 'lucide-react';
import { CharacterProfile } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface MainMenuProps {
  selectedCharacter: CharacterProfile;
  onStartGame: () => void;
  onOpenCharacterSelect: () => void;
  onOpenJournal: () => void;
  onOpenQuiz: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  selectedCharacter,
  onStartGame,
  onOpenCharacterSelect,
  onOpenJournal,
  onOpenQuiz,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950/40 text-stone-100 overflow-hidden select-none">
      {/* Decorative Traditional Buddhist Pattern Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Ambient Halo behind main card */}
      <div className="absolute w-[580px] h-[580px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Sound Toggle Button in Top Right */}
      <button
        onClick={() => {
          onToggleSound();
          soundManager.playClick();
        }}
        className="absolute top-6 right-6 p-3 bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 rounded-full text-amber-300 transition-colors cursor-pointer shadow-lg flex items-center gap-2 text-xs"
        title="Toggle Audio"
      >
        {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-stone-500" />}
        <span className="hidden sm:inline font-medium">{soundEnabled ? 'Sound On' : 'Muted'}</span>
      </button>

      {/* Main Container */}
      <div className="relative max-w-xl w-full mx-4 p-8 sm:p-10 bg-stone-900/90 border border-amber-500/40 rounded-2xl shadow-2xl backdrop-blur-md text-center">
        {/* Sacred Dharmachakra Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 text-3xl shadow-inner mb-4">
          ☸
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 drop-shadow-md">
          SACRED JOURNEY
        </h1>
        <div className="text-xs sm:text-sm font-semibold tracking-widest text-amber-400/90 uppercase mt-1">
          Buddhist Sacred Places • 3D Educational Adventure
        </div>

        {/* Cultural & Age Description */}
        <p className="text-stone-300 text-xs sm:text-sm mt-4 leading-relaxed max-w-md mx-auto">
          Explore the world-famous <strong className="text-amber-200">Mahabodhi Temple Complex</strong> in 3D.
          Discover Emperor Ashoka’s 3rd-century BCE Diamond Throne, light sacred butter lamps, decipher stone edicts, and uncover verified cultural heritage.
        </p>

        {/* Selected Explorer Card preview */}
        <div
          onClick={() => {
            soundManager.playClick();
            onOpenCharacterSelect();
          }}
          className="mt-6 p-3.5 bg-stone-950/70 border border-amber-500/30 hover:border-amber-400/70 rounded-xl flex items-center justify-between cursor-pointer transition-all transform hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3 text-left">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-stone-950 shadow"
              style={{ backgroundColor: selectedCharacter.clothingColor }}
            >
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold text-amber-300">{selectedCharacter.name}</div>
              <div className="text-[11px] text-stone-400">{selectedCharacter.title}</div>
            </div>
          </div>
          <span className="text-xs font-medium text-amber-400/80 hover:text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
            Change Explorer
          </span>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => {
              soundManager.playSingingBowl(261.63);
              soundManager.startMeditationDrone();
              onStartGame();
            }}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-extrabold text-base rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 border border-amber-200"
          >
            <Play className="w-5 h-5 fill-stone-950" />
            <span>Begin Sacred Journey</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenJournal();
              }}
              className="py-2.5 px-4 bg-stone-800/80 hover:bg-stone-700/80 border border-amber-500/30 rounded-xl text-xs font-semibold text-amber-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Knowledge Journal</span>
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenQuiz();
              }}
              className="py-2.5 px-4 bg-stone-800/80 hover:bg-stone-700/80 border border-amber-500/30 rounded-xl text-xs font-semibold text-amber-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Heritage Quiz</span>
            </button>
          </div>
        </div>

        {/* Educational Disclaimer Badge */}
        <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Designed for students aged 12–15 • Verified archaeological & historical records</span>
        </div>
      </div>
    </div>
  );
};
