
import React from 'react';
import { EthMumbaiLogo } from './Logo';

interface HeaderProps {
  isConnected?: boolean;
  onConnect?: () => void;
  onLogoClick?: () => void;
  walletLabel?: string;
  showProgress?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isConnected, onConnect, onLogoClick, walletLabel = "Connect Wallet", showProgress }) => (
  <header className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 w-full max-w-[1400px] mx-auto">
    <button 
      onClick={onLogoClick}
      className="flex items-center gap-3 group text-left transition-transform hover:scale-[1.02] active:scale-95"
    >
      <div className="flex items-center justify-center size-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg transition-transform group-hover:rotate-12 group-hover:border-white/40">
        <EthMumbaiLogo className="size-10" />
      </div>
      <div className="flex flex-col">
        <h2 className="text-white text-xl font-bold tracking-tight uppercase leading-none group-hover:text-primary transition-colors">ETHMumbai</h2>
        <span className="text-primary text-[10px] font-black tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">Maxi Status</span>
      </div>
    </button>
    
    <div className="flex items-center gap-4">
      {showProgress && (
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded text-xs font-bold uppercase tracking-widest text-white">
          <span className="material-symbols-outlined text-sm">speed</span>
          Scan In Progress
        </div>
      )}
      
      <button 
        onClick={onConnect}
        className={`group flex items-center justify-center gap-2 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-none transition-all duration-300 clip-chamfer ${isConnected ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}
      >
        <span className="text-sm font-bold tracking-wide uppercase">
          {isConnected ? (walletLabel) : 'Connect Wallet'}
        </span>
        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
          {isConnected ? 'account_balance_wallet' : 'arrow_forward'}
        </span>
      </button>
    </div>
  </header>
);

export const Footer: React.FC = () => (
  <footer className="relative z-50 w-full py-8 border-t border-white/10 bg-black/20 backdrop-blur-sm mt-auto">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        {/* X (formerly Twitter) */}
        <a 
          href="https://x.com/ethmumbai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 active:scale-90"
          title="ETHMumbai on X"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </a>
        
        {/* Telegram */}
        <a 
          href="https://t.me/ethmumbai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#0088cc] transition-all duration-300 hover:scale-110 active:scale-90"
          title="ETHMumbai on Telegram"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.891 8.121l-1.991 9.401c-.15.681-.551.851-1.121.531l-3.041-2.241-1.461 1.411c-.16.16-.3.3-.61.3l.21-3.091 5.631-5.081c.241-.211-.05-.331-.371-.121l-6.961 4.381-2.991-.941c-.651-.201-.661-.651.141-.961l11.681-4.501c.541-.201 1.011.121.881.911z"></path>
          </svg>
        </a>

        {/* Farcaster */}
        <a 
          href="https://farcaster.xyz/ethmumbai" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group p-2.5 rounded-full border border-white/20 hover:bg-white hover:text-[#8a63d2] transition-all duration-300 hover:scale-110 active:scale-90"
          title="ETHMumbai on Farcaster"
        >
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M32 24h192v208h-40v-72h-32v72H32V24zm40 40v32h112V64H72zm0 56v32h112v-32H72z"/>
          </svg>
        </a>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        <p className="text-white/60 text-sm font-medium">Built by ETHMumbai Superfans</p>
        <div className="hidden md:block w-1 h-1 bg-white/40 rounded-full"></div>
        <div className="flex gap-4 text-sm font-bold tracking-wide">
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
