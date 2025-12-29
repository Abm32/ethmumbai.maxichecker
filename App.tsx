
import React, { useState, useEffect } from 'react';
import { AppScreen, UserStats, XUserInfo } from './types';
import { LandingScreen } from './components/LandingScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { generateMaxiProfile } from './geminiService';
import { QUIZ_QUESTIONS } from './constants';
import { fetchXUserInfo, validateXHandle } from './xService';

const STORAGE_KEYS = {
  SCREEN: 'ethmumbai_screen',
  USER_STATS: 'ethmumbai_user_stats',
  X_USER_INFO: 'ethmumbai_x_user_info',
};

const App: React.FC = () => {
  // Load initial state from localStorage
  const loadInitialScreen = (): AppScreen => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCREEN);
    return (saved as AppScreen) || AppScreen.LANDING;
  };

  const loadInitialUserStats = (): UserStats => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user stats:', e);
      }
    }
    return {
      score: 0,
      totalQuestions: QUIZ_QUESTIONS.length,
      answers: [],
    };
  };

  const loadInitialXUserInfo = (): XUserInfo | null => {
    const saved = localStorage.getItem(STORAGE_KEYS.X_USER_INFO);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved X user info:', e);
      }
    }
    return null;
  };

  const [screen, setScreen] = useState<AppScreen>(loadInitialScreen);
  const [xUserInfo, setXUserInfo] = useState<XUserInfo | null>(loadInitialXUserInfo);
  const [userStats, setUserStats] = useState<UserStats>(loadInitialUserStats);
  const [loading, setLoading] = useState(false);

  // Align threshold with rank labels (80 and above is Ultra)
  const isUltraMaxi = userStats.score >= 80;

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCREEN, screen);
  }, [screen]);

  useEffect(() => {
    if (userStats.score > 0 || userStats.aiTitle) {
      localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(userStats));
    }
  }, [userStats]);

  useEffect(() => {
    if (xUserInfo) {
      localStorage.setItem(STORAGE_KEYS.X_USER_INFO, JSON.stringify(xUserInfo));
    }
  }, [xUserInfo]);

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
    // Clear saved state
    localStorage.removeItem(STORAGE_KEYS.USER_STATS);
    localStorage.removeItem(STORAGE_KEYS.SCREEN);
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
