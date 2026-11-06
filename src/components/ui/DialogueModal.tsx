/**
 * NPC Dialogue System
 * Clearly separates verified historical and archaeological facts from fictional narrative dialogue.
 */
import React from 'react';
import { X, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { NPC, DialogueNode } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface DialogueModalProps {
  npc: NPC;
  currentNode: DialogueNode;
  onSelectOption: (option: { text: string; nextNodeId?: string; action?: string }) => void;
  onClose: () => void;
}

export const DialogueModal: React.FC<DialogueModalProps> = ({
  npc,
  currentNode,
  onSelectOption,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header with NPC info */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950/95 border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-xl shadow">
              {currentNode.avatarIcon || '☸'}
            </div>
            <div>
              <h3 className="font-bold text-amber-200 text-sm sm:text-base">{currentNode.speaker}</h3>
              <p className="text-[11px] text-amber-400/80">{currentNode.speakerRole}</p>
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

        {/* Dialogue Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* NPC Dialogue Text */}
          <div className="p-4 bg-stone-950/70 border border-stone-800 rounded-xl">
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              "{currentNode.text}"
            </p>
          </div>

          {/* VERIFIED HISTORICAL FACT BANNER (Explicitly separated from game fiction) */}
          {currentNode.historicalNote && (
            <div className="p-3.5 bg-amber-500/10 border-l-4 border-amber-400 rounded-r-xl">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Verified Historical Record</span>
              </div>
              <p className="text-amber-100/90 text-xs sm:text-sm leading-relaxed">
                {currentNode.historicalNote}
              </p>
            </div>
          )}

          {/* Dialogue Response Options */}
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
              Choose your response:
            </div>
            {currentNode.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playClick();
                  onSelectOption(option);
                }}
                className="w-full text-left p-3 bg-stone-800/80 hover:bg-amber-500/20 hover:border-amber-400/80 border border-amber-500/20 rounded-xl text-stone-200 hover:text-amber-100 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 border border-amber-500/40 text-amber-300 text-xs flex items-center justify-center font-bold group-hover:bg-amber-400 group-hover:text-stone-950">
                    {idx + 1}
                  </span>
                  <span>{option.text}</span>
                </span>
                <span className="text-amber-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Select →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
