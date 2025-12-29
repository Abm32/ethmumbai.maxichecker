
import React, { useState } from 'react';
import { AppScreen, UserStats, XUserInfo } from './types';
import { LandingScreen } from './components/LandingScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { generateMaxiProfile } from './geminiService';
import { QUIZ_QUESTIONS } from './constants';
import { fetchXUserInfo, validateXHandle } from './xService';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.LANDING);
  const [xUserInfo, setXUserInfo] = useState<XUserInfo | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    score: 0,
    totalQuestions: QUIZ_QUESTIONS.length,
    answers: [],
  });
  const [loading, setLoading] = useState(false);

  // Align threshold with rank labels (80 and above is Ultra)
  const isUltraMaxi = userStats.score >= 80;

  const handleXHandleSubmit = async (handle: string) => {
    if (!validateXHandle(handle)) {
      return false;
    }

    setLoading(true);
    try {
      const userInfo = await fetchXUserInfo(handle);
      if (userInfo) {
        setXUserInfo(userInfo);
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Error fetching X user info:', error);
    }
    setLoading(false);
    return false;
  };

  const handleStartQuiz = () => {
    setScreen(AppScreen.QUIZ);
  };

  const handleQuizComplete = async (finalScore: number, finalAnswers: number[]) => {
    setLoading(true);
    setScreen(AppScreen.RESULT);
    
    const keywords = finalAnswers.map((idx, qIdx) => QUIZ_QUESTIONS[qIdx].keyword);
    const profile = await generateMaxiProfile(finalScore, keywords);
    
    setUserStats({
      score: finalScore,
      totalQuestions: QUIZ_QUESTIONS.length,
      answers: finalAnswers,
      aiTitle: profile.title,
      aiDescription: profile.description,
    });
    setLoading(false);
  };

  const handleReset = () => {
    setUserStats({
      score: 0,
      totalQuestions: QUIZ_QUESTIONS.length,
      answers: [],
    });
    setScreen(AppScreen.LANDING);
  };

  const handleGoHome = () => {
    setScreen(AppScreen.LANDING);
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden transition-colors duration-1000">
      {/* Background Grids */}
      <div className={`fixed inset-0 z-0 transition-colors duration-1000 ${screen === AppScreen.RESULT && isUltraMaxi ? 'bg-eth-blue' : 'bg-primary'}`}>
        <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] transition-all duration-1000 opacity-80 ${
          screen === AppScreen.RESULT && isUltraMaxi 
            ? 'from-[#627EEA] via-[#3a4ea1] to-[#1a224a]' 
            : 'from-[#ff4d4d] via-primary to-[#8a0000]'
        }`}></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      </div>

      {screen === AppScreen.LANDING && (
        <LandingScreen 
          onStart={handleStartQuiz} 
          onXHandleSubmit={handleXHandleSubmit} 
          onLogoClick={handleGoHome}
          xUserInfo={xUserInfo}
          isLoading={loading}
        />
      )}

      {screen === AppScreen.QUIZ && (
        <QuizScreen 
          onComplete={handleQuizComplete} 
          onLogoClick={handleGoHome}
          xUserInfo={xUserInfo}
        />
      )}

      {screen === AppScreen.RESULT && (
        <ResultScreen 
          stats={userStats} 
          onReset={handleReset} 
          onLogoClick={handleGoHome}
          isLoading={loading}
          xUserInfo={xUserInfo}
        />
      )}
      
      {/* Loading Overlay */}
      {loading && screen === AppScreen.RESULT && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="size-20 border-4 border-white/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-xl font-bold uppercase tracking-widest animate-pulse">Analyzing on-chain DNA...</p>
        </div>
      )}
    </div>
  );
};

export default App;
