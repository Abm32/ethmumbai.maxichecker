
import React, { useState } from 'react';
import { Header } from './Layout';
import { QUIZ_QUESTIONS } from '../constants';
import { XUserInfo } from '../types';

interface QuizScreenProps {
  onComplete: (score: number, answers: number[]) => void;
  onLogoClick: () => void;
  xUserInfo: XUserInfo | null;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete, onLogoClick, xUserInfo }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleNext = () => {
    if (selectedOption === null) return;

    const newScore = totalScore + currentQuestion.options[selectedOption].points;
    const newAnswers = [...userAnswers, selectedOption];

    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setTotalScore(newScore);
      setUserAnswers(newAnswers);
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
    } else {
      onComplete(newScore, newAnswers);
    }
  };

  const getRank = (score: number) => {
    if (score >= 80) return "ULTRA";
    if (score >= 60) return "MAXI";
    if (score >= 30) return "BELIEVER";
    return "CURIOUS";
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-background-dark/95">
      <Header xUserInfo={xUserInfo} onLogoClick={onLogoClick} showProgress />
      
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start py-4 sm:py-6 md:py-8 px-3 sm:px-4 w-full max-w-6xl mx-auto">
        
        {/* Progress Strip */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <div className="flex items-center justify-between w-full px-1 sm:px-2 mb-0.5 sm:mb-1">
            <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider sm:tracking-widest">Progress Scan</span>
            <span className="text-xs sm:text-sm font-bold text-primary">{String(currentIdx + 1).padStart(2, '0')} / 10</span>
          </div>
          
          <div className="flex w-full justify-between items-center gap-1 sm:gap-1.5 md:gap-2 px-0.5 sm:px-1">
            {QUIZ_QUESTIONS.map((_, idx) => {
              const isActive = idx === currentIdx;
              const isCompleted = idx < currentIdx;
              return (
                <div 
                  key={idx}
                  className={`size-2.5 sm:size-3 md:size-4 rotate-45 transform origin-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-eth-yellow shadow-[0_0_12px_#F7C325] scale-125 border border-white' 
                      : isCompleted 
                        ? 'bg-primary shadow-[0_0_8px_#ec1313]' 
                        : 'bg-[#3A1E1E]'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Quiz Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
          
          {/* Left Side: The Diamond Card */}
          <div className="relative flex items-center justify-center py-4 sm:py-6 md:py-8 lg:py-10 xl:py-20 animate-fade-in-up">
            <div className="relative group size-[240px] sm:size-[280px] md:size-[320px] lg:size-[360px] shrink-0 transition-transform duration-500">
              {/* Subtle shift from 45 to 48 degrees on hover */}
              <div className="absolute inset-0 bg-primary rotate-45 rounded-lg sm:rounded-xl border-[4px] sm:border-[5px] md:border-[6px] border-eth-blue shadow-[0_0_60px_rgba(236,19,19,0.3)] z-0 transition-transform duration-500 group-hover:rotate-[48deg]"></div>
              <div className="absolute inset-3 sm:inset-4 border border-white/20 rotate-45 rounded-md sm:rounded-lg z-0 transition-transform duration-500 group-hover:rotate-[48deg]"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8 z-10">
                <span className="text-eth-yellow text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest uppercase mb-1 sm:mb-2 animate-blink-yellow">Question {currentIdx + 1}</span>
                <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-tight drop-shadow-md px-2">
                  {currentQuestion.text}
                </h3>
                <div className="mt-3 sm:mt-4 md:mt-6 opacity-40">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl md:text-5xl text-white">verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Answer Options */}
          <div className="w-full max-w-md flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-4">
              {currentQuestion.options.map((option, oIdx) => (
                <label key={oIdx} className="group relative cursor-pointer block">
                  <input 
                    className="peer sr-only" 
                    type="radio" 
                    name="quiz_answer" 
                    checked={selectedOption === oIdx}
                    onChange={() => setSelectedOption(oIdx)}
                  />
                  <div className="clip-chamfer bg-[#3A1E1E] hover:bg-[#4A2626] border-l-[3px] sm:border-l-4 border-transparent peer-checked:bg-eth-blue peer-checked:border-eth-yellow h-14 sm:h-16 w-full flex items-center px-4 sm:px-5 md:px-6 transition-all duration-200 peer-checked:shadow-[0_0_20px_rgba(98,126,234,0.3)] btn-mechanical">
                    <div className="flex items-center gap-3 sm:gap-4 w-full min-w-0">
                      <div className="size-5 sm:size-6 rounded-sm border-2 border-white/30 flex items-center justify-center flex-shrink-0 peer-checked:group-[]:border-eth-yellow">
                        <div className={`size-2.5 sm:size-3 bg-eth-yellow rounded-[1px] transition-opacity ${selectedOption === oIdx ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>
                      <span className={`text-white text-sm sm:text-base md:text-lg ${selectedOption === oIdx ? 'font-bold' : 'font-medium'} break-words`}>
                        {option.text}
                      </span>
                    </div>
                    <div className={`absolute right-4 sm:right-5 md:right-6 top-1/2 -translate-y-1/2 size-2.5 sm:size-3 bg-eth-yellow rounded-full shadow-[0_0_8px_#F7C325] transition-opacity flex-shrink-0 ${selectedOption === oIdx ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                </label>
              ))}
            </div>

            {/* Navigation Action */}
            <div className="mt-4 sm:mt-6 md:mt-8 flex justify-end">
              <button 
                onClick={handleNext}
                disabled={selectedOption === null}
                className={`group relative flex items-center justify-center h-12 sm:h-[52px] md:h-14 pl-6 sm:pl-7 md:pl-8 pr-4 sm:pr-5 md:pr-6 text-white text-sm sm:text-base md:text-lg font-bold tracking-wide sm:tracking-wider transition-all duration-300 clip-chamfer shadow-[3px_3px_0px_#627EEA] sm:shadow-[4px_4px_0px_#627EEA] btn-mechanical ${
                  selectedOption === null ? 'bg-gray-700 opacity-50 cursor-not-allowed' : 'bg-primary hover:bg-white hover:text-primary'
                }`}
              >
                <span className="whitespace-nowrap">{currentIdx === QUIZ_QUESTIONS.length - 1 ? 'FINISH SCAN' : 'NEXT QUESTION'}</span>
                <span className="material-symbols-outlined ml-1.5 sm:ml-2 text-lg sm:text-xl md:text-2xl transition-transform group-hover:translate-x-1">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Status Decor */}
        <div className="fixed bottom-4 sm:bottom-6 left-3 sm:left-4 md:left-6 hidden lg:flex flex-col gap-2 z-50">
          <div className="bg-[#221010] border border-[#482323] p-3 sm:p-4 rounded-lg shadow-2xl max-w-[180px] sm:max-w-[200px]">
            <p className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest mb-1">Current Ranking</p>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="material-symbols-outlined text-eth-yellow animate-blink-yellow text-lg sm:text-xl">workspace_premium</span>
              <span className="text-white font-bold text-sm sm:text-base">{getRank(totalScore)}</span>
            </div>
            <div className="w-full bg-gray-800 h-0.5 sm:h-1 mt-2 sm:mt-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-500" style={{ width: `${totalScore}%` }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
