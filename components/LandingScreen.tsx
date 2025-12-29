import React, { useState } from 'react';
import { Header, Footer } from './Layout';
import { EthMumbaiLogo } from './Logo';
import { XUserInfo } from '../types';
import { validateXHandle, normalizeXHandle } from '../xService';

interface LandingScreenProps {
  onStart: () => void;
  onXHandleSubmit: (handle: string) => Promise<boolean>;
  onLogoClick: () => void;
  xUserInfo: XUserInfo | null;
  isLoading: boolean;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart, onXHandleSubmit, onLogoClick, xUserInfo, isLoading }) => {
  const [xHandle, setXHandle] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateXHandle(xHandle)) {
      setError('Please enter a valid X handle');
      return;
    }

    setIsSubmitting(true);
    const success = await onXHandleSubmit(xHandle);
    setIsSubmitting(false);
    
    if (!success) {
      setError('Could not verify X handle. Please try again.');
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* Mumbai Skyline Bottom Decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-32 z-0 pointer-events-none">
        {/* Iconic Mumbai Buildings Silhouette - styled like the official site */}
        <div className="absolute bottom-10 left-0 right-0 flex items-end justify-around px-4 md:px-8 gap-1 md:gap-2">
          {/* Gateway of India inspired */}
          <div className="w-8 md:w-12 h-12 md:h-16 bg-gradient-to-b from-orange-400/30 to-orange-500/50 rounded-t-lg border-t border-orange-300/40"></div>
          {/* Taj Hotel inspired */}
          <div className="w-10 md:w-16 h-14 md:h-20 bg-gradient-to-b from-orange-400/30 to-orange-500/50 rounded-t-md border-t border-orange-300/40"></div>
          {/* Modern skyscrapers */}
          <div className="w-6 md:w-10 h-16 md:h-22 bg-gradient-to-b from-orange-400/30 to-orange-500/50"></div>
          <div className="w-7 md:w-10 h-18 md:h-24 bg-gradient-to-b from-orange-400/30 to-orange-500/50"></div>
          <div className="w-5 md:w-8 h-14 md:h-18 bg-gradient-to-b from-orange-400/30 to-orange-500/50"></div>
          {/* More buildings */}
          <div className="w-8 md:w-12 h-15 md:h-20 bg-gradient-to-b from-orange-400/30 to-orange-500/50 rounded-t-lg"></div>
          <div className="w-6 md:w-10 h-13 md:h-17 bg-gradient-to-b from-orange-400/30 to-orange-500/50"></div>
          <div className="w-7 md:w-10 h-17 md:h-22 bg-gradient-to-b from-orange-400/30 to-orange-500/50"></div>
          {/* Extra buildings for fuller skyline */}
          <div className="w-6 md:w-9 h-14 md:h-19 bg-gradient-to-b from-orange-400/30 to-orange-500/50"></div>
          <div className="w-8 md:w-11 h-16 md:h-21 bg-gradient-to-b from-orange-400/30 to-orange-500/50 rounded-t-md"></div>
        </div>
        {/* Road with yellow-black stripes - iconic Mumbai style */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-800/70">
          {/* Center line */}
          <div className="absolute top-1 left-0 right-0 h-0.5 bg-yellow-300/40"></div>
          {/* Yellow-Black striped border at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-4 flex">
            {[...Array(50)].map((_, i) => (
              <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-yellow-400' : 'bg-black'}`}></div>
            ))}
          </div>
        </div>
      </div>

      <Header xUserInfo={xUserInfo} onLogoClick={onLogoClick} />

      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full px-4 py-6 md:py-4">
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto gap-8 md:gap-10">
          
          {/* Main Diamond Illustration */}
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-white/20 transform rotate-45 rounded-[2.5rem] blur-2xl animate-pulse-slow"></div>
            {/* The Diamond Frame - Rotates +3 degrees from 45 to 48 */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 border-[4px] border-white/30 bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-md shadow-2xl transform rotate-45 rounded-[2.5rem] flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:rotate-[48deg]">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              <div className="relative w-full h-full flex items-center justify-center animate-float">
                {/* The Official Logo - Counter-rotates to stay upright relative to the frame */}
                <EthMumbaiLogo className="w-40 h-40 md:w-52 md:h-52 drop-shadow-2xl transform -rotate-45 group-hover:-rotate-[48deg] transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl relative z-20">
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase drop-shadow-lg text-white">
              How <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">ETHMumbai</span><br/> Are You?
            </h1>
            <p className="text-lg md:text-xl font-medium text-white/80 max-w-lg leading-relaxed mt-2">
              Analyze your on-chain history, flex your badges, and prove your unwavering loyalty to the Mumbai ecosystem.
            </p>
            {/* Mumbai tagline inspired by official site */}
            <div className="mt-2 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <p className="text-sm font-bold text-white tracking-wide">
                Build from Mumbai, For the World 🌍
              </p>
            </div>
          </div>

          {/* X Handle Input */}
          {!xUserInfo && (
            <div className="relative mt-2 w-full max-w-md">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 fill-white/60" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={xHandle}
                    onChange={(e) => {
                      setXHandle(e.target.value);
                      setError('');
                    }}
                    placeholder="@yourhandle"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-none text-white placeholder-white/40 font-medium focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 clip-chamfer"
                    disabled={isSubmitting || isLoading}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm font-medium text-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading || !xHandle.trim()}
                  className="group flex items-center justify-center gap-2 backdrop-blur-md border border-white/20 px-6 py-3 rounded-none transition-all duration-300 clip-chamfer bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-sm font-bold tracking-wide uppercase">
                    {isSubmitting || isLoading ? 'Verifying...' : 'Verify X Handle'}
                  </span>
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                    {isSubmitting || isLoading ? 'hourglass_empty' : 'arrow_forward'}
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* CTA Button */}
          {xUserInfo && (
            <div className="relative mt-2">
              <button 
                onClick={onStart}
                className="relative group w-44 h-44 md:w-52 md:h-52 flex items-center justify-center bg-white text-primary font-black text-xl md:text-2xl uppercase tracking-tighter transform rotate-45 hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 border-4 border-transparent hover:border-eth-blue focus:outline-none focus:ring-4 focus:ring-eth-blue/50 btn-mechanical"
              >
                <div className="transform -rotate-45 text-center px-4 leading-none flex flex-col items-center gap-2">
                  <span>Check My</span>
                  <span className="text-2xl md:text-3xl border-b-4 border-primary pb-1">Maxi Score</span>
                  <span className="material-symbols-outlined mt-2 text-3xl animate-bounce">expand_more</span>
                </div>
              </button>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white/40 text-sm font-mono tracking-widest uppercase whitespace-nowrap">
                Click to start scan
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};