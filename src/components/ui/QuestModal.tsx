/**
 * Quest Log & Mission Tracker Modal
 */
import React from 'react';
import { X, CheckCircle2, Circle, Award, Sparkles, MapPin } from 'lucide-react';
import { Quest } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface QuestModalProps {
  quests: Quest[];
  activeQuestId: string;
  onClose: () => void;
}

export const QuestModal: React.FC<QuestModalProps> = ({ quests, activeQuestId, onClose }) => {
  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950/95 border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold">
              📜
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-200">Explorer Missions</h2>
              <p className="text-stone-400 text-xs">
                Completed: {completedCount} of {quests.length} objectives
              </p>
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

        {/* Quest List */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          {quests.map((quest) => {
            const isActive = quest.id === activeQuestId && !quest.completed;

            return (
              <div
                key={quest.id}
                className={`p-4 rounded-xl border transition-all ${
                  quest.completed
                    ? 'bg-stone-950/50 border-emerald-500/40'
                    : isActive
                    ? 'bg-amber-500/10 border-amber-400 ring-1 ring-amber-400/40 shadow-md'
                    : 'bg-stone-950/30 border-stone-800 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {quest.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-amber-200">{quest.title}</h3>
                        {isActive && (
                          <span className="text-[10px] bg-amber-400 text-stone-950 px-2 py-0.2 rounded font-extrabold uppercase">
                            Current
                          </span>
                        )}
                        {quest.completed && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded font-semibold uppercase">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-400/80 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{quest.location}</span>
                      </div>
                      <p className="mt-2 text-stone-300 text-xs sm:text-sm leading-relaxed">
                        {quest.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-amber-300 bg-stone-900 px-2 py-1 rounded border border-amber-500/20">
                      +{quest.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Objective line */}
                <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Objective:</span>
                  <span className="font-semibold text-amber-100">{quest.objective}</span>
                </div>

                {/* Unlocked Educational Fact */}
                {quest.completed && (
                  <div className="mt-2.5 p-2.5 bg-amber-500/10 border-l-2 border-amber-400 rounded-r text-[11px] text-amber-200">
                    <strong className="text-amber-300">Historical Discovery: </strong>
                    {quest.unlockedFact}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
