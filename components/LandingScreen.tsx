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
      {/* Mumbai Skyline - Top Layer */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-0 pointer-events-none">
        {/* Left side buildings - Gateway of India area */}
        <div className="absolute left-0 bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-40 w-32 sm:w-40 md:w-48 lg:w-72 h-28 sm:h-32 md:h-40 lg:h-56 opacity-50">
          {/* Gateway of India inspired structure */}
          <svg viewBox="0 0 200 200" className="w-full h-full fill-current text-red-950/80">
            {/* Main arch structure */}
            <rect x="40" y="120" width="120" height="80" />
            <rect x="50" y="100" width="100" height="20" />
            {/* Central dome */}
            <circle cx="100" cy="80" r="25" />
            <rect x="90" y="80" width="20" height="40" />
            {/* Side towers */}
            <rect x="30" y="140" width="15" height="60" />
            <rect x="155" y="140" width="15" height="60" />
            {/* Arches */}
            <circle cx="70" cy="160" r="15" fill="currentColor" opacity="0.3" />
            <circle cx="100" cy="160" r="15" fill="currentColor" opacity="0.3" />
            <circle cx="130" cy="160" r="15" fill="currentColor" opacity="0.3" />
            {/* Windows */}
            <rect x="60" y="130" width="8" height="12" fill="currentColor" opacity="0.4" />
            <rect x="75" y="130" width="8" height="12" fill="currentColor" opacity="0.4" />
            <rect x="117" y="130" width="8" height="12" fill="currentColor" opacity="0.4" />
            <rect x="132" y="130" width="8" height="12" fill="currentColor" opacity="0.4" />
          </svg>
        </div>

        {/* Right side - Bandra-Worli Sea Link Bridge */}
        <div className="absolute right-0 bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-40 w-40 sm:w-52 md:w-64 lg:w-96 h-24 sm:h-28 md:h-32 lg:h-48 opacity-50">
          <svg viewBox="0 0 300 150" className="w-full h-full">
            {/* Bridge cables */}
            <g className="stroke-current text-red-950/80" fill="none">
              {/* Main towers */}
              <line x1="220" y1="40" x2="220" y2="150" strokeWidth="4" />
              <line x1="210" y1="40" x2="210" y2="150" strokeWidth="4" />
              {/* Cables from left tower */}
              {[...Array(15)].map((_, i) => (
                <line key={`left-${i}`} x1="210" y1="40" x2={150 - i * 10} y2="145" strokeWidth="1" opacity="0.6" />
              ))}
              {/* Cables from right tower */}
              {[...Array(15)].map((_, i) => (
                <line key={`right-${i}`} x1="220" y1="40" x2={230 + i * 5} y2="145" strokeWidth="1" opacity="0.6" />
              ))}
            </g>
            {/* Road deck */}
            <rect x="0" y="145" width="300" height="6" className="fill-current text-red-950/80" />
          </svg>
        </div>

        {/* Center buildings skyline */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-24 sm:bottom-28 md:bottom-32 lg:bottom-40 flex items-end gap-1 sm:gap-1.5 md:gap-2 lg:gap-4 opacity-40">
          {/* Modern skyscrapers */}
          <div className="w-5 sm:w-6 md:w-8 lg:w-12 h-16 sm:h-20 md:h-24 lg:h-32 bg-red-950/70">
            <div className="grid grid-cols-2 gap-0.5 sm:gap-1 p-0.5 sm:p-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-1 sm:h-2 bg-red-800/40"></div>
              ))}
            </div>
          </div>
          <div className="w-4 sm:w-5 md:w-6 lg:w-10 h-14 sm:h-16 md:h-20 lg:h-28 bg-red-950/70">
            <div className="grid grid-cols-2 gap-0.5 sm:gap-1 p-0.5 sm:p-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full h-1 sm:h-2 bg-red-800/40"></div>
              ))}
            </div>
          </div>
          <div className="w-6 sm:w-8 md:w-10 lg:w-14 h-20 sm:h-24 md:h-32 lg:h-40 bg-red-950/70">
            <div className="grid grid-cols-2 gap-0.5 sm:gap-1 p-0.5 sm:p-1">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-full h-1 sm:h-2 bg-red-800/40"></div>
              ))}
            </div>
          </div>
          <div className="w-[18px] sm:w-[22px] md:w-7 lg:w-11 h-[72px] sm:h-[88px] md:h-28 lg:h-36 bg-red-950/70"></div>
          <div className="w-[22px] sm:w-[26px] md:w-9 lg:w-[52px] h-16 sm:h-20 md:h-[104px] lg:h-[136px] bg-red-950/70"></div>
        </div>
      </div>

      {/* Decorative Yellow Border Pattern - Bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-18 md:h-20 lg:h-24 z-0 pointer-events-none bg-gradient-to-t from-yellow-500 to-yellow-400">
        {/* Diagonal stripe pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="flex h-full">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-black transform -skew-x-12 origin-bottom"
                style={{ 
                  height: i % 2 === 0 ? '100%' : '60%',
                  marginTop: i % 2 === 0 ? '0' : 'auto'
                }}
              ></div>
            ))}
          </div>
        </div>
        {/* Top border lines */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-black"></div>
        <div className="absolute top-2 left-0 right-0 h-1 bg-red-900"></div>
      </div>

      <Header xUserInfo={xUserInfo} onLogoClick={onLogoClick} />

      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full px-3 sm:px-4 py-4 sm:py-6 md:py-4 pb-24 sm:pb-28 md:pb-32">
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          
          {/* Main Diamond Illustration */}
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-white/20 transform rotate-45 rounded-[2rem] sm:rounded-[2.5rem] blur-2xl animate-pulse-slow"></div>
            {/* The Diamond Frame - Rotates +3 degrees from 45 to 48 */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 border-[3px] sm:border-[4px] border-white/30 bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-md shadow-2xl transform rotate-45 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:rotate-[48deg]">
              <div className="absolute inset-0 rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              <div className="relative w-full h-full flex items-center justify-center animate-float">
                {/* The Official Logo - Counter-rotates to stay upright relative to the frame */}
                <EthMumbaiLogo className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-52 lg:h-52 drop-shadow-2xl transform -rotate-45 group-hover:-rotate-[48deg] transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 max-w-2xl relative z-20 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.9] tracking-tighter uppercase drop-shadow-lg text-white">
              How <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">ETHMumbai</span><br/> Are You?
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white/90 max-w-lg leading-relaxed mt-1 sm:mt-2">
              Analyze your on-chain history, flex your badges, and prove your unwavering loyalty to the community.
            </p>
          </div>

          {/* X Handle Input */}
          {!xUserInfo && (
            <div className="relative mt-1 sm:mt-2 w-full max-w-md px-2">
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3">
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white/60" viewBox="0 0 24 24">
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
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-none text-white placeholder-white/40 font-medium text-sm sm:text-base focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 clip-chamfer"
                    disabled={isSubmitting || isLoading}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-xs sm:text-sm font-medium text-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading || !xHandle.trim()}
                  className="group flex items-center justify-center gap-2 backdrop-blur-md border border-white/20 px-4 sm:px-6 py-2.5 sm:py-3 rounded-none transition-all duration-300 clip-chamfer bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                    {isSubmitting || isLoading ? 'Verifying...' : 'Verify X Handle'}
                  </span>
                  <span className="material-symbols-outlined text-xs sm:text-sm transition-transform group-hover:translate-x-1">
                    {isSubmitting || isLoading ? 'hourglass_empty' : 'arrow_forward'}
                  </span>
                </button>
              </form>
            </div>
          )}

          {/* CTA Button */}
          {xUserInfo && (
            <div className="relative mt-1 sm:mt-2">
              <button 
                onClick={onStart}
                className="relative group w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 flex items-center justify-center bg-white/10 backdrop-blur-md text-white border-2 border-white/30 font-black text-lg sm:text-xl md:text-2xl uppercase tracking-tighter transform rotate-45 hover:scale-110 hover:bg-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <div className="transform -rotate-45 text-center px-2 sm:px-3 md:px-4 leading-none flex flex-col items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-base md:text-lg">Check My</span>
                  <span className="text-xl sm:text-2xl md:text-3xl border-b-[3px] sm:border-b-4 border-white pb-0.5 sm:pb-1">Maxi Score</span>
                  <span className="material-symbols-outlined mt-1 sm:mt-2 text-2xl sm:text-3xl animate-bounce">expand_more</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};