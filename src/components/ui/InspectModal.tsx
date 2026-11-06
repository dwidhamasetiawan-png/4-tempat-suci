/**
 * Interactive Object Inspection Modal
 * Detailed archaeological description, historical era, relic unlock, and XP award.
 */
import React from 'react';
import { X, Sparkles, BookOpen, CheckCircle2, Award } from 'lucide-react';
import { InteractiveObject, Relic } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface InspectModalProps {
  object: InteractiveObject;
  relic?: Relic;
  isRelicNewlyCollected: boolean;
  onClose: () => void;
}

export const InspectModal: React.FC<InspectModalProps> = ({
  object,
  relic,
  isRelicNewlyCollected,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-xl bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950/95 border-b border-amber-500/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold">
              🔍
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-200">{object.name}</h2>
              <p className="text-amber-400 text-xs font-medium">{object.historicalEra}</p>
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

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Main Archaeological Insight */}
          <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{object.factTitle}</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {object.factDescription}
            </p>
          </div>

          {/* Relic Discovery Banner if applicable */}
          {relic && (
            <div className="p-4 bg-amber-500/15 border border-amber-400/50 rounded-xl flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/25 border border-amber-400 flex items-center justify-center text-2xl shadow shrink-0">
                {relic.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-200">{relic.name}</span>
                  {isRelicNewlyCollected && (
                    <span className="text-[10px] bg-emerald-500 text-stone-950 px-1.5 py-0.2 rounded font-extrabold uppercase animate-pulse">
                      New Relic Found!
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-300 mt-1 leading-relaxed">
                  {relic.description}
                </p>
                <div className="text-[10px] text-amber-300/90 mt-1.5">
                  <strong>Cultural Value:</strong> {relic.culturalSignificance}
                </div>
              </div>
            </div>
          )}

          {/* XP Reward notification */}
          <div className="flex items-center justify-between p-3 bg-stone-950/60 rounded-lg border border-stone-800 text-xs text-stone-400">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Documented in Field Journal</span>
            </span>
            <span className="font-bold text-emerald-400">+50 Discovery XP</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-950/90 border-t border-amber-500/30 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg cursor-pointer border border-amber-200"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
