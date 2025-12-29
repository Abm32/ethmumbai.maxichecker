
import React from 'react';
import { Header, Footer } from './Layout';
import { EthMumbaiLogo } from './Logo';

interface LandingScreenProps {
  onStart: () => void;
  onConnect: () => void;
  onLogoClick: () => void;
  isConnected: boolean;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart, onConnect, onLogoClick, isConnected }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header isConnected={isConnected} onConnect={onConnect} onLogoClick={onLogoClick} walletLabel="0xKash...8888" />
      
      <main className="relative z-10 flex flex-col items-center justify-center flex-grow w-full px-4 py-10 md:py-0">
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto gap-12 md:gap-16">
          
          {/* Main Diamond Illustration */}
          <div className="relative group perspective-1000">
            <div className="absolute inset-0 bg-white/20 transform rotate-45 rounded-[2.5rem] blur-2xl animate-pulse-slow"></div>
            {/* The Diamond Frame - Rotates +3 degrees from 45 to 48 */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 border-[4px] border-white/30 bg-gradient-to-br from-white/20 via-white/5 to-transparent backdrop-blur-md shadow-2xl transform rotate-45 rounded-[2.5rem] flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:rotate-[48deg]">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none"></div>
              <div className="relative w-full h-full flex items-center justify-center animate-float">
                {/* The Official Logo - Counter-rotates to stay upright relative to the frame */}
                <EthMumbaiLogo className="w-48 h-48 md:w-64 md:h-64 drop-shadow-2xl transform -rotate-45 group-hover:-rotate-[48deg] transition-all duration-500" />
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
          </div>

          {/* CTA Button */}
          <div className="relative mt-4">
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
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white/40 text-sm font-mono tracking-widest uppercase whitespace-nowrap">
              Click to start scan
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
