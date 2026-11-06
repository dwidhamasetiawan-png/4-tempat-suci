/**
 * Sacred Heritage Quiz Challenge
 * 5 middle school tailored questions with verified historical sources,
 * instant educational feedback, score tally, and certificate of completion.
 */
import React, { useState } from 'react';
import { X, CheckCircle, XCircle, Award, RotateCcw, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/buddhistSacredPlaces';
import { soundManager } from '../../utils/audio';

interface QuizModalProps {
  onQuizComplete: (score: number) => void;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ onQuizComplete, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      soundManager.playQuizCorrect();
      setScore((s) => s + 1);
    } else {
      soundManager.playQuizIncorrect();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalScorePct = Math.round(((score + (selectedOption === currentQ.correctAnswer ? 0 : 0)) / QUIZ_QUESTIONS.length) * 100);
      onQuizComplete(finalScorePct);
      soundManager.playQuestCompleteFanfare();
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-sm select-none">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-stone-950/95 border-b border-amber-500/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold">
              🏆
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-200">Sacred Heritage Knowledge Challenge</h2>
              <p className="text-stone-400 text-xs">Middle School History & Architecture Assessment</p>
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

        {/* Content */}
        {!isFinished ? (
          <div className="p-6 space-y-5">
            {/* Question Progress bar */}
            <div>
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-1.5">
                <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>Score: {score} Correct</span>
              </div>
              <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Box */}
            <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl">
              <h3 className="text-sm sm:text-base font-bold text-amber-100 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'bg-stone-800/80 hover:bg-stone-700/80 border-stone-700 text-stone-200';
                if (isAnswered) {
                  if (idx === currentQ.correctAnswer) {
                    btnStyle = 'bg-emerald-900/60 border-emerald-400 text-emerald-100 ring-1 ring-emerald-400 font-semibold';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-900/60 border-rose-400 text-rose-100';
                  } else {
                    btnStyle = 'bg-stone-900/40 border-stone-800 text-stone-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-stone-950/70 border border-stone-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </span>
                    {isAnswered && idx === currentQ.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Educational Explanation Box (Shown once answered) */}
            {isAnswered && (
              <div className="p-4 bg-stone-950/90 border-l-4 border-amber-400 rounded-r-xl space-y-1.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Historical & Archaeological Context</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="text-[10px] text-stone-400 italic pt-1">
                  Verified Source: {currentQ.historicalSource}
                </div>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-transform transform active:scale-95 cursor-pointer flex items-center gap-2 border border-amber-200"
                >
                  <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Certificate'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results & Certificate of Completion */
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl shadow-inner">
              {percentage >= 80 ? '🌟' : '📜'}
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-amber-200">
                {percentage >= 80 ? 'Sacred Heritage Scholar!' : 'Good Effort, Young Explorer!'}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                {percentage >= 80
                  ? 'Congratulations! You have demonstrated outstanding knowledge of the history, architecture, and cultural heritage of Bodh Gaya.'
                  : 'You have begun your path of understanding. Review your knowledge journal and try again to master all sacred facts!'}
              </p>
            </div>

            {/* Score Plaque */}
            <div className="p-4 bg-stone-950/80 border border-amber-500/30 rounded-xl max-w-xs mx-auto">
              <div className="text-3xl font-extrabold text-amber-300">{percentage}%</div>
              <div className="text-xs text-stone-400 mt-1">
                {score} of {QUIZ_QUESTIONS.length} Questions Correct
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 border border-amber-500/30 rounded-xl text-xs font-semibold text-amber-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg cursor-pointer border border-amber-200"
              >
                Return to Exploration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
