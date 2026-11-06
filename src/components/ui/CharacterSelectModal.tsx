/**
 * Character Selection Modal
 * Allows players to choose their young explorer persona before embarking.
 */
import React from 'react';
import { X, Check, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { CharacterProfile } from '../../types/game';
import { CHARACTERS } from '../../data/buddhistSacredPlaces';
import { soundManager } from '../../utils/audio';

interface CharacterSelectModalProps {
  selectedCharacter: CharacterProfile;
  onSelectCharacter: (char: CharacterProfile) => void;
  onClose: () => void;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  selectedCharacter,
  onSelectCharacter,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950/90 border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold text-sm">
              ☸
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-200">Select Your Explorer</h2>
              <p className="text-stone-400 text-xs">Each student researcher brings unique perspective to the sacred site</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CHARACTERS.map((char) => {
            const isSelected = char.id === selectedCharacter.id;

            return (
              <div
                key={char.id}
                onClick={() => {
                  soundManager.playSingingBowl(320);
                  onSelectCharacter(char);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
                    : 'bg-stone-950/60 border-stone-800 hover:border-amber-500/40 hover:bg-stone-800/40'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                <div>
                  {/* Top Avatar badge & Colors */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-md border border-white/20"
                      style={{ backgroundColor: char.clothingColor }}
                    >
                      {char.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-200 text-base flex items-center gap-2">
                        {char.name}
                        <span className="text-[11px] font-normal text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                          Age {char.age}
                        </span>
                      </h3>
                      <div className="text-xs text-amber-400/90 font-medium">{char.title}</div>
                    </div>
                  </div>

                  {/* Origin & Specialty */}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="flex items-center gap-1 text-stone-300 bg-stone-900 px-2.5 py-1 rounded border border-stone-800">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {char.origin}
                    </span>
                    <span className="flex items-center gap-1 text-stone-300 bg-stone-900 px-2.5 py-1 rounded border border-stone-800">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {char.specialty}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="mt-3 text-stone-300 text-xs leading-relaxed">
                    {char.bio}
                  </p>
                </div>

                {/* Color swatches preview */}
                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Field Uniform:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: char.clothingColor }} title="Jacket/Robe" />
                    <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: char.accentColor }} title="Trim" />
                    <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: char.backpackColor }} title="Backpack" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-950/90 border-t border-amber-500/30 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-transform transform active:scale-95 cursor-pointer border border-amber-300"
          >
            Confirm Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
