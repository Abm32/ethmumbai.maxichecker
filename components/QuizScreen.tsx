
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
      
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start py-8 px-4 w-full max-w-6xl mx-auto">
        
        {/* Progress Strip */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-4 mb-8 md:mb-12">
          <div className="flex items-center justify-between w-full px-2 mb-1">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Progress Scan</span>
            <span className="text-sm font-bold text-primary">{String(currentIdx + 1).padStart(2, '0')} / 10</span>
          </div>
          
          <div className="flex w-full justify-between items-center gap-2 px-1">
            {QUIZ_QUESTIONS.map((_, idx) => {
              const isActive = idx === currentIdx;
              const isCompleted = idx < currentIdx;
              return (
                <div 
                  key={idx}
                  className={`size-3 md:size-4 rotate-45 transform origin-center transition-all duration-300 ${
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
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full">
          
          {/* Left Side: The Diamond Card */}
          <div className="relative flex items-center justify-center py-10 lg:py-20 animate-fade-in-up">
            <div className="relative group size-[280px] sm:size-[360px] shrink-0 transition-transform duration-500">
              {/* Subtle shift from 45 to 48 degrees on hover */}
              <div className="absolute inset-0 bg-primary rotate-45 rounded-xl border-[6px] border-eth-blue shadow-[0_0_60px_rgba(236,19,19,0.3)] z-0 transition-transform duration-500 group-hover:rotate-[48deg]"></div>
              <div className="absolute inset-4 border border-white/20 rotate-45 rounded-lg z-0 transition-transform duration-500 group-hover:rotate-[48deg]"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                <span className="text-eth-yellow text-sm font-bold tracking-widest uppercase mb-2 animate-blink-yellow">Question {currentIdx + 1}</span>
                <h3 className="text-white text-xl sm:text-2xl font-bold leading-tight drop-shadow-md">
                  {currentQuestion.text}
                </h3>
                <div className="mt-6 opacity-40">
                  <span className="material-symbols-outlined text-5xl text-white">verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Answer Options */}
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {currentQuestion.options.map((option, oIdx) => (
                <label key={oIdx} className="group relative cursor-pointer block">
                  <input 
                    className="peer sr-only" 
                    type="radio" 
                    name="quiz_answer" 
                    checked={selectedOption === oIdx}
                    onChange={() => setSelectedOption(oIdx)}
                  />
                  <div className="clip-chamfer bg-[#3A1E1E] hover:bg-[#4A2626] border-l-4 border-transparent peer-checked:bg-eth-blue peer-checked:border-eth-yellow h-16 w-full flex items-center px-6 transition-all duration-200 peer-checked:shadow-[0_0_20px_rgba(98,126,234,0.3)] btn-mechanical">
                    <div className="flex items-center gap-4 w-full">
                      <div className="size-6 rounded-sm border-2 border-white/30 flex items-center justify-center peer-checked:group-[]:border-eth-yellow">
                        <div className={`size-3 bg-eth-yellow rounded-[1px] transition-opacity ${selectedOption === oIdx ? 'opacity-100' : 'opacity-0'}`}></div>
                      </div>
                      <span className={`text-white text-lg ${selectedOption === oIdx ? 'font-bold' : 'font-medium'}`}>
                        {option.text}
                      </span>
                    </div>
                    <div className={`absolute right-6 top-1/2 -translate-y-1/2 size-3 bg-eth-yellow rounded-full shadow-[0_0_8px_#F7C325] transition-opacity ${selectedOption === oIdx ? 'opacity-100' : 'opacity-0'}`}></div>
                  </div>
                </label>
              ))}
            </div>

            {/* Navigation Action */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleNext}
                disabled={selectedOption === null}
                className={`group relative flex items-center justify-center h-14 pl-8 pr-6 text-white text-lg font-bold tracking-wider transition-all duration-300 clip-chamfer shadow-[4px_4px_0px_#627EEA] btn-mechanical ${
                  selectedOption === null ? 'bg-gray-700 opacity-50 cursor-not-allowed' : 'bg-primary hover:bg-white hover:text-primary'
                }`}
              >
                <span>{currentIdx === QUIZ_QUESTIONS.length - 1 ? 'FINISH SCAN' : 'NEXT QUESTION'}</span>
                <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Status Decor */}
        <div className="fixed bottom-6 left-6 hidden xl:flex flex-col gap-2 z-50">
          <div className="bg-[#221010] border border-[#482323] p-4 rounded-lg shadow-2xl max-w-[200px]">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Current Ranking</p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-eth-yellow animate-blink-yellow">workspace_premium</span>
              <span className="text-white font-bold">{getRank(totalScore)}</span>
            </div>
            <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-500" style={{ width: `${totalScore}%` }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
