/**
 * Knowledge Journal (Field Encyclopedia)
 * Comprehensive educational guide covering Buddhist sacred places, architecture,
 * Emperor Ashoka, and student artifact collection.
 */
import React, { useState } from 'react';
import { X, BookOpen, MapPin, Landmark, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { JOURNAL_SECTIONS, RELICS } from '../../data/buddhistSacredPlaces';
import { soundManager } from '../../utils/audio';

interface JournalModalProps {
  collectedRelicIds: string[];
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({ collectedRelicIds, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('bodhgaya');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-4xl h-[88vh] bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950/95 border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold">
              📖
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-200">Sacred Places Knowledge Journal</h2>
              <p className="text-stone-400 text-xs">Middle School Field Guide to Buddhist Cultural Heritage & Architecture</p>
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-stone-950/60 border-b border-stone-800 overflow-x-auto">
          {JOURNAL_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(sec.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === sec.id
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800'
              }`}
            >
              <span>{sec.title.split(':')[0]}</span>
            </button>
          ))}
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('relics');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'relics'
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Relics & Artifacts ({collectedRelicIds.length}/{RELICS.length})</span>
          </button>
        </div>

        {/* Journal Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {activeTab !== 'relics' ? (
            (() => {
              const sec = JOURNAL_SECTIONS.find((s) => s.id === activeTab) || JOURNAL_SECTIONS[0];
              return (
                <div className="space-y-6 max-w-3xl mx-auto">
                  {/* Article Title & Era */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-amber-200">{sec.title}</h3>
                    <div className="text-xs sm:text-sm text-amber-400 font-medium mt-1">{sec.subtitle}</div>
                    <div className="inline-block mt-2 px-2.5 py-1 bg-stone-950 text-stone-300 rounded border border-stone-800 text-xs">
                      Historical Era: <strong className="text-amber-300">{sec.era}</strong>
                    </div>
                  </div>

                  {/* Body Paragraphs */}
                  <div className="space-y-3 text-stone-200 text-sm sm:text-base leading-relaxed">
                    {sec.content.map((para, i) => (
                      <p key={i} className="p-3.5 bg-stone-950/60 border border-stone-800/80 rounded-xl">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Key Historical Takeaways */}
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      <span>Key Historical Facts for Students</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-300">
                      {sec.keyFacts.map((fact, fi) => (
                        <li key={fi} className="flex items-start gap-2 bg-stone-900/80 p-2.5 rounded-lg border border-stone-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()
          ) : (
            /* Relics & Field Artifacts Collection Tab */
            <div className="space-y-6 max-w-3xl mx-auto">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-200">Discovered Field Relics & Artifacts</h3>
                <p className="text-stone-400 text-xs sm:text-sm mt-1">
                  Explore ancient artifacts discovered throughout the Mahabodhi sanctuary. Each relic teaches an essential chapter in Buddhist history.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RELICS.map((relic) => {
                  const isCollected = collectedRelicIds.includes(relic.id);

                  return (
                    <div
                      key={relic.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCollected
                          ? 'bg-stone-950/80 border-amber-500/50 shadow-lg'
                          : 'bg-stone-950/40 border-stone-800/60 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shadow">
                          {relic.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-amber-200 flex items-center gap-2">
                            <span>{relic.name}</span>
                            {isCollected ? (
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                                Found
                              </span>
                            ) : (
                              <span className="text-[10px] bg-stone-800 text-stone-400 px-1.5 py-0.2 rounded">
                                Undiscovered
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-amber-400/80">{relic.era}</div>
                        </div>
                      </div>

                      <p className="mt-3 text-stone-300 text-xs leading-relaxed">
                        {isCollected ? relic.description : 'Search the sacred grounds to discover and inspect this artifact.'}
                      </p>

                      {isCollected && (
                        <div className="mt-3 p-2 bg-stone-900 rounded border border-stone-800 text-[11px] text-stone-400">
                          <strong className="text-amber-300">Significance: </strong>
                          {relic.culturalSignificance}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
