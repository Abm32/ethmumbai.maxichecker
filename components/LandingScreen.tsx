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
      {/* Mumbai Background Image */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-0 pointer-events-none">
        <img 
          src="/bg.png" 
          alt="Mumbai skyline" 
          className="w-full h-full object-cover object-center opacity-20"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
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
            {/* Outer glow effect - has reduced opacity */}
            <div className="absolute inset-0 bg-red-500/40 transform rotate-45 rounded-[2rem] sm:rounded-[2.5rem] blur-3xl opacity-30"></div>
            <div className="absolute inset-0 bg-red-600/30 transform rotate-45 rounded-[2rem] sm:rounded-[2.5rem] blur-2xl opacity-30"></div>
            <div className="absolute inset-0 bg-white/20 transform rotate-45 rounded-[2rem] sm:rounded-[2.5rem] blur-xl opacity-30"></div>
            
            {/* The Diamond Frame - Rotates +3 degrees from 45 to 48 */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 transform rotate-45 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:rotate-[48deg]">
              {/* Outer border lining - more visible */}
              <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border-[4px] sm:border-[5px] md:border-[6px] border-red-500/95"></div>
              {/* Multiple layered borders for depth */}
              <div className="absolute inset-[2px] sm:inset-[3px] md:inset-[4px] rounded-[1.4rem] sm:rounded-[1.9rem] md:rounded-[2.4rem] border-[2px] sm:border-[3px] border-red-400/75"></div>
              <div className="absolute inset-[4px] sm:inset-[6px] md:inset-[8px] rounded-[1.3rem] sm:rounded-[1.8rem] md:rounded-[2.3rem] border border-white/50"></div>
              
              {/* Glass background with gradient - very transparent to show background */}
              <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-red-500/2 via-red-600/1 to-transparent backdrop-blur-sm"></div>
              
              {/* Top highlight shine - very transparent */}
              <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-b from-red-400/3 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Bottom subtle glow - very transparent */}
              <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-t from-red-600/2 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Inner shadow for depth - very transparent */}
              <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] shadow-[inset_0_2px_20px_rgba(236,19,19,0.03)]"></div>
              
              <div className="relative w-full h-full flex items-center justify-center animate-float z-10">
                {/* The Official Logo - Counter-rotates to stay upright relative to the frame */}
                <div className="opacity-100">
                  <EthMumbaiLogo className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-52 lg:h-52 drop-shadow-2xl transform -rotate-45 group-hover:-rotate-[48deg] transition-all duration-500" />
                </div>
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
              {/* Glowing orb effect behind button */}
              <div className="absolute inset-0 bg-yellow-500/30 blur-3xl transform scale-150 animate-pulse"></div>
              <div className="absolute inset-0 bg-red-500/20 blur-2xl transform scale-125"></div>
              
              <button 
                onClick={onStart}
                className="relative group w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center backdrop-blur-md text-white font-black text-lg sm:text-xl md:text-2xl uppercase tracking-tighter transform rotate-45 hover:scale-105 hover:rotate-[48deg] transition-all duration-500 focus:outline-none overflow-hidden"
              >
                {/* Multiple layered borders matching diamond */}
                <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border-[4px] sm:border-[5px] md:border-[6px] border-yellow-500 group-hover:border-yellow-400 transition-colors duration-300"></div>
                <div className="absolute inset-[2px] sm:inset-[3px] md:inset-[4px] rounded-[1.4rem] sm:rounded-[1.9rem] md:rounded-[2.4rem] border-[2px] sm:border-[3px] border-yellow-600/80 group-hover:border-yellow-500/90 transition-colors duration-300"></div>
                <div className="absolute inset-[4px] sm:inset-[6px] md:inset-[8px] rounded-[1.3rem] sm:rounded-[1.8rem] md:rounded-[2.3rem] border border-white/60"></div>
                
                {/* Gradient background with animation */}
                <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-yellow-500/30 via-yellow-600/20 to-red-600/30 group-hover:from-yellow-400/40 group-hover:via-yellow-500/30 group-hover:to-red-500/40 transition-all duration-300"></div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-500 group-hover:animate-shimmer"></div>
                
                {/* Top highlight */}
                <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-b from-yellow-400/20 via-transparent to-transparent"></div>
                
                {/* Inner shadow */}
                <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] shadow-[inset_0_2px_20px_rgba(234,179,8,0.3)]"></div>
                
                {/* Button content - counter-rotated */}
                <div className="relative transform -rotate-45 group-hover:-rotate-[48deg] text-center px-3 sm:px-4 md:px-5 leading-none flex flex-col items-center gap-1.5 sm:gap-2.5 transition-all duration-500 z-10">
                  <span className="text-xs sm:text-sm md:text-base font-bold tracking-wider text-yellow-200 group-hover:text-yellow-100 transition-colors">Check My</span>
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black border-b-[3px] sm:border-b-4 border-yellow-400 group-hover:border-yellow-300 pb-1 sm:pb-1.5 text-white group-hover:text-yellow-50 transition-all duration-300">Maxi Score</span>
                  <span className="material-symbols-outlined mt-1 sm:mt-2 text-2xl sm:text-3xl md:text-4xl animate-bounce text-yellow-300 group-hover:text-yellow-200 transition-colors">expand_more</span>
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