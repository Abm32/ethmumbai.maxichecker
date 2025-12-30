
import React from 'react';
import { EthMumbaiLogo } from './Logo';
import { XUserInfo } from '../types';

interface HeaderProps {
  xUserInfo?: XUserInfo | null;
  onLogoClick?: () => void;
  showProgress?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ xUserInfo, onLogoClick, showProgress }) => (
  <header className="relative z-50 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-12 py-3 sm:py-4 md:py-6 w-full max-w-[1400px] mx-auto">
    <button 
      onClick={onLogoClick}
      className="flex items-center gap-2 sm:gap-3 group text-left transition-transform hover:scale-[1.02] active:scale-95"
    >
      <div className="flex items-center justify-center size-9 sm:size-10 md:size-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl overflow-hidden shadow-lg transition-transform group-hover:rotate-12 group-hover:border-white/40">
        <EthMumbaiLogo className="size-7 sm:size-8 md:size-10" />
      </div>
      <div className="flex flex-col">
        <h2 className="text-white text-base sm:text-lg md:text-xl font-bold tracking-tight uppercase leading-none group-hover:text-primary transition-colors">ETHMumbai</h2>
        <span className="text-primary text-[9px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">Maxi Status</span>
      </div>
    </button>
    
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
      {showProgress && (
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded text-xs font-bold uppercase tracking-widest text-white">
          <span className="material-symbols-outlined text-sm">speed</span>
          Scan In Progress
        </div>
      )}
      
      {xUserInfo && (
        <div className="group flex items-center gap-1.5 sm:gap-2 backdrop-blur-md border border-white/20 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-none transition-all duration-300 clip-chamfer bg-white/20">
          {xUserInfo.profileImageUrl ? (
            <img 
              src={xUserInfo.profileImageUrl} 
              alt={xUserInfo.name}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-white/20 object-cover flex-shrink-0"
              onError={(e) => {
                // Hide image and show icon fallback
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : null}
          {!xUserInfo.profileImageUrl && (
            <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] sm:text-xs font-bold tracking-wide uppercase leading-none truncate max-w-[80px] sm:max-w-none">{xUserInfo.name}</span>
            <span className="text-[9px] sm:text-[10px] text-white/60 font-mono truncate max-w-[80px] sm:max-w-none">@{xUserInfo.handle}</span>
          </div>
        </div>
      )}
    </div>
  </header>
);

export const Footer: React.FC = () => (
  <footer className="relative z-50 w-full py-4 sm:py-6 md:py-8 border-t border-white/10 bg-black/20 backdrop-blur-sm mt-auto">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* X (formerly Twitter) */}
        <a 
          href="https://x.com/ethmumbai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group p-2 sm:p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 active:scale-90"
          title="ETHMumbai on X"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </a>
        
        {/* Telegram */}
        <a 
          href="https://t.me/ethmumbai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group p-2 sm:p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#0088cc] transition-all duration-300 hover:scale-110 active:scale-90"
          title="ETHMumbai on Telegram"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
            <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.891 8.121l-1.991 9.401c-.15.681-.551.851-1.121.531l-3.041-2.241-1.461 1.411c-.16.16-.3.3-.61.3l.21-3.091 5.631-5.081c.241-.211-.05-.331-.371-.121l-6.961 4.381-2.991-.941c-.651-.201-.661-.651.141-.961l11.681-4.501c.541-.201 1.011.121.881.911z"></path>
          </svg>
        </a>

        {/* Farcaster */}
        <a 
          href="https://farcaster.xyz/ethmumbai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group p-2 sm:p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#8a63d2] transition-all duration-300 hover:scale-110 active:scale-90"
          title="ETHMumbai on Farcaster"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.24.24H5.76A5.76 5.76 0 0 0 0 6v12a5.76 5.76 0 0 0 5.76 5.76h12.48A5.76 5.76 0 0 0 24 18V6A5.76 5.76 0 0 0 18.24.24m.816 17.166v.504a.49.49 0 0 1 .543.48v.568h-5.143v-.569A.49.49 0 0 1 15 17.91v-.504c0-.22.153-.402.358-.458l-.01-4.364c-.158-1.737-1.64-3.098-3.443-3.098s-3.285 1.361-3.443 3.098l-.01 4.358c.228.042.532.208.54.464v.504a.49.49 0 0 1 .543.48v.568H4.392v-.569a.49.49 0 0 1 .543-.479v-.504c0-.253.201-.454.454-.472V9.039h-.49l-.61-2.031H6.93V5.042h9.95v1.966h2.822l-.61 2.03h-.49v7.896c.252.017.453.22.453.472"/>
          </svg>
        </a>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 md:gap-6">
        <p className="text-white/60 text-xs sm:text-sm font-medium text-center">
          Built by{' '}
          <a 
            href="https://abhimanyurb.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white/80 hover:text-white transition-colors underline decoration-white/40 hover:decoration-white underline-offset-2"
          >
            Abhimanyu R B
          </a>
        </p>
        <div className="hidden md:block w-1 h-1 bg-white/40 rounded-full"></div>
        <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm font-bold tracking-wide">
          <a 
            href="https://www.ethmumbai.in/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white/80 hover:text-white transition-colors"
          >
            ABOUT
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">LEADERBOARD</a>
        </div>
      </div>
    </div>
  </footer>
);
