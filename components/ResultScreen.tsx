
import React, { useState, useEffect, useRef } from 'react';
import { Header } from './Layout';
import { UserStats, XUserInfo } from '../types';
import { EthMumbaiLogo } from './Logo';

interface ResultScreenProps {
  stats: UserStats;
  onReset: () => void;
  onLogoClick: () => void;
  isLoading: boolean;
  xUserInfo: XUserInfo | null;
}

const ConfettiAnimation = () => {
  const colors = ['#ec1313', '#627EEA', '#F7C325', '#ffffff'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {[...Array(50)].map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const delay = Math.random() * 4;
        const duration = Math.random() * 2 + 3;
        
        return (
          <div
            key={i}
            className="absolute rounded-sm animate-confetti-fall"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: 0.8 + Math.random() * 0.2,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
      {/* Add some ETH symbols mixed in */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`eth-${i}`}
          className="absolute text-eth-blue animate-confetti-fall font-black"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${16 + Math.random() * 12}px`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            opacity: 0.6 + Math.random() * 0.4,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          Ξ
        </div>
      ))}
    </div>
  );
};

export const ResultScreen: React.FC<ResultScreenProps> = ({ stats, onReset, onLogoClick, isLoading, xUserInfo }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Use the same threshold as the rank labels for visual consistency
  const isUltraMaxi = stats.score >= 80;
  const isHighEnoughForEasterEgg = stats.score > 85;

  // Debug: Log xUserInfo to check if profileImageUrl is set
  useEffect(() => {
    if (xUserInfo) {
      console.log('X User Info:', xUserInfo);
      console.log('Profile Image URL:', xUserInfo.profileImageUrl);
    }
  }, [xUserInfo]);

  useEffect(() => {
    if (isLoading) {
      setIsAnimationComplete(false);
      return;
    }
    let start = 0;
    const end = stats.score;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        setIsAnimationComplete(true);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [stats.score, isLoading]);

  if (isLoading) return null;

  const getRankText = (score: number) => {
    if (score >= 80) return "ULTRA";
    if (score >= 60) return "MAXI";
    if (score >= 30) return "BELIEF";
    return "CURIOUS";
  };

  const getFullRankLabel = (score: number) => {
    if (score >= 80) return "ETHMumbai Ultra Maxi 🏆";
    if (score >= 60) return "ETHMumbai Maxi 🐂";
    if (score >= 30) return "ETHMumbai Believer 🔥";
    return "ETHMumbai Curious 👀";
  };

  const captureCard = async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    
    // Wait for animation to complete if still animating
    if (!isAnimationComplete) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    try {
      const originalElement = cardRef.current;
      const originalTransform = originalElement.style.transform;
      const originalTransition = originalElement.style.transition;
      const finalScore = stats.score;
      
      // Disable animations and set final score for capture
      originalElement.style.transform = 'none';
      originalElement.style.transition = 'none';
      originalElement.classList.add('no-animations');
      
      // Update score and rank displays to final values
      const scoreElements = originalElement.querySelectorAll('[data-score-display]');
      scoreElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.textContent = `SCORE: ${finalScore.toLocaleString()} / 100`;
      });
      
      const rankElements = originalElement.querySelectorAll('[data-rank-display]');
      rankElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.textContent = getRankText(finalScore);
      });
      
      // Hide or disable animated dots
      const animatedDotsElements = originalElement.querySelectorAll('[data-animated-dots]');
      animatedDotsElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.display = 'none';
      });

      // Wait for DOM to update
      await new Promise(resolve => setTimeout(resolve, 50));

      if (!(window as any).html2canvas) {
        throw new Error("html2canvas library not loaded");
      }

      const canvas = await (window as any).html2canvas(originalElement, {
        backgroundColor: '#0f0505',
        scale: 2, 
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc: Document) => {
          // Ensure final values are shown in cloned document
          const clonedElement = clonedDoc.querySelector('[data-card-ref]') as HTMLElement;
          if (clonedElement) {
            clonedElement.classList.add('no-animations');
            // Disable all animations in cloned document
            const style = clonedDoc.createElement('style');
            style.textContent = `
              .no-animations * {
                animation: none !important;
                transition: none !important;
              }
            `;
            clonedDoc.head.appendChild(style);
            
            // Update score displays
            const scoreDisplays = clonedElement.querySelectorAll('[data-score-display]');
            scoreDisplays.forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.textContent = `SCORE: ${finalScore.toLocaleString()} / 100`;
            });
            
            // Update rank displays
            const rankDisplays = clonedElement.querySelectorAll('[data-rank-display]');
            rankDisplays.forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.textContent = getRankText(finalScore);
            });
            
            // Hide animated dots in cloned document
            const clonedAnimatedDots = clonedElement.querySelectorAll('[data-animated-dots]');
            clonedAnimatedDots.forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.display = 'none';
            });
          }
        }
      });
      
      // Restore animated dots visibility
      animatedDotsElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.display = '';
      });
      
      // Restore original styles
      originalElement.style.transform = originalTransform;
      originalElement.style.transition = originalTransition;
      originalElement.classList.remove('no-animations');
      
      return canvas.toDataURL('image/png', 1.0);
    } catch (err) {
      console.error('Capture failed:', err);
      alert("Failed to generate image. Please try again.");
      return null;
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    const dataUrl = await captureCard();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `ETHMumbai-Maxi-${stats.aiTitle?.replace(/\s+/g, '-') || 'Card'}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setIsProcessing(false);
  };

  const shareOnX = async () => {
    setIsProcessing(true);
    const shareText = `I just checked my ETHMumbai Maxi Status! I'm an ${getRankText(stats.score)} with a score of ${stats.score}/100. Check yours at ETHMumbai! #ETHMumbai #Web3 #Ethereum`;
    
    const dataUrl = await captureCard();
    
    if (dataUrl) {
      if (navigator.share && navigator.canShare) {
        try {
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          const file = new File([blob], 'ethmumbai-maxi.png', { type: 'image/png' });
          
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'ETHMumbai Maxi Card',
              text: shareText,
              files: [file]
            });
            setIsProcessing(false);
            return;
          }
        } catch (err) {
          console.warn('Native share failed:', err);
        }
      }

      try {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        if (navigator.clipboard && (window as any).ClipboardItem) {
          await navigator.clipboard.write([
            new (window as any).ClipboardItem({
              'image/png': blob
            })
          ]);
          alert("Card image copied to clipboard! Paste (Ctrl+V) it in your tweet.");
        } else {
          const link = document.createElement('a');
          link.download = `ethmumbai-maxi.png`;
          link.href = dataUrl;
          link.click();
          alert("Card image downloaded. Please attach it to your tweet!");
        }
      } catch (err) {
        console.error("Clipboard error:", err);
      }
    }
    
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
    setIsProcessing(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Header xUserInfo={xUserInfo} onLogoClick={onLogoClick} />
      {isUltraMaxi && <ConfettiAnimation />}
      
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center py-8 px-4 w-full max-w-7xl mx-auto">
        {/* Background glows */}
        <div className={`absolute top-1/4 -left-20 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ${isUltraMaxi ? 'bg-eth-yellow/30' : 'bg-primary/20'}`}></div>
        <div className={`absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ${isUltraMaxi ? 'bg-eth-blue/40' : 'bg-eth-blue/20'}`}></div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
          
          {/* The High-Res Maxi Card */}
          <div className="flex justify-center lg:justify-end perspective-1000 order-2 lg:order-1">
            <div 
              ref={cardRef}
              data-card-ref
              className={`relative w-[320px] sm:w-[350px] h-[600px] bg-neutral-900 clip-chamfer border-[6px] shadow-[0_20px_60px_-15px_rgba(236,19,19,0.5)] flex flex-col group transition-all duration-500 hover:scale-[1.02] ${
              isUltraMaxi ? 'border-eth-blue shadow-[0_25px_80px_-10px_rgba(98,126,234,0.7)]' : 'border-[#3A1E1E]'
            }`}>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#3A1E1E] rounded-b-lg z-20"></div>
              <div className="absolute inset-3 border border-white/10 z-10 clip-chamfer pointer-events-none"></div>
              
              {/* Card Header */}
              <div className={`h-28 bg-gradient-to-b flex items-center justify-between px-6 pt-4 relative overflow-hidden transition-colors duration-1000 ${
                isUltraMaxi ? 'from-[#1a224a] to-[#0a0f2a]' : 'from-[#2a1212] to-[#1a0a0a]'
              }`}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${isUltraMaxi ? '#627EEA' : '#ec1313'} 1px, transparent 1px)`, backgroundSize: '8px 8px' }}></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="size-10 flex items-center justify-center bg-white/10 rounded-lg backdrop-blur-md border border-white/20">
                      <EthMumbaiLogo className="size-8" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-xl tracking-tighter leading-none uppercase">ETHMumbai</span>
                      <span className="text-[8px] text-white/40 uppercase tracking-[0.3em] font-bold">Official Digital ID</span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 flex flex-col items-end">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Status</span>
                  <span className={`text-white font-mono text-sm border-b pb-0.5 ${isUltraMaxi ? 'border-eth-blue' : 'border-primary/40'}`}>ACTIVE</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 bg-[#1a0a0a] relative flex flex-col items-center pt-8">
                {/* Profile Image with Rank Badge */}
                <div className="relative mb-6 flex flex-col items-center">
                  {/* Profile Image Circle */}
                  <div className={`relative size-40 rounded-full overflow-hidden border-4 transition-all duration-1000 shadow-[0_0_30px_rgba(0,0,0,0.3)] ${
                    isUltraMaxi ? 'border-eth-blue shadow-[0_0_40px_rgba(98,126,234,0.6)]' : 'border-primary'
                  }`}>
                    {xUserInfo?.profileImageUrl ? (
                      <>
                        <img 
                          src={(() => {
                            let url = xUserInfo.profileImageUrl;
                            // Convert to higher resolution if possible
                            if (url.includes('_normal')) {
                              url = url.replace('_normal', '_400x400');
                            } else if (url.includes('_200x200')) {
                              url = url.replace('_200x200', '_400x400');
                            }
                            console.log('Loading profile image from:', url);
                            return url;
                          })()}
                          alt={xUserInfo.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Profile image failed to load:', e);
                            const target = e.target as HTMLImageElement;
                            // Try original URL
                            if (target.src !== xUserInfo.profileImageUrl) {
                              console.log('Trying original URL:', xUserInfo.profileImageUrl);
                              target.src = xUserInfo.profileImageUrl;
                            } else {
                              // Show placeholder if image fails
                              target.style.display = 'none';
                              const placeholder = target.nextElementSibling as HTMLElement;
                              if (placeholder) placeholder.style.display = 'flex';
                            }
                          }}
                          onLoad={() => {
                            console.log('Profile image loaded successfully');
                            const placeholder = document.querySelector('.profile-placeholder') as HTMLElement;
                            if (placeholder) placeholder.style.display = 'none';
                          }}
                        />
                        <div className="profile-placeholder hidden w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center absolute inset-0">
                          {xUserInfo.name ? (
                            <span className="text-2xl font-black text-white/60">
                              {xUserInfo.name.charAt(0).toUpperCase()}
                            </span>
                          ) : (
                            <span className="material-symbols-outlined text-6xl text-white/20">person</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                        {xUserInfo?.name ? (
                          <span className="text-2xl font-black text-white/60">
                            {xUserInfo.name.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-6xl text-white/20">person</span>
                        )}
                      </div>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t opacity-20 ${
                      isUltraMaxi ? 'from-eth-blue' : 'from-primary'
                    }`}></div>
                  </div>
                  
                  {/* Rank Badge Overlay */}
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full border-2 transition-all duration-1000 shadow-lg backdrop-blur-sm ${
                    isUltraMaxi 
                      ? 'bg-eth-blue/90 border-eth-yellow shadow-[0_0_20px_rgba(98,126,234,0.6)]' 
                      : 'bg-primary/90 border-eth-yellow shadow-[0_0_20px_rgba(236,19,19,0.6)]'
                  }`}>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xs font-black text-white tracking-wider uppercase leading-none text-center whitespace-nowrap" data-rank-display>
                        {getRankText(displayScore)}
                      </span>
                      <div className="flex gap-1 mt-1 justify-center items-center" data-animated-dots>
                        <span className="size-1.5 bg-eth-yellow rounded-full animate-blink-yellow"></span>
                        <span className="size-1.5 bg-eth-yellow rounded-full animate-blink-yellow" style={{ animationDelay: '0.2s' }}></span>
                        <span className="size-1.5 bg-eth-yellow rounded-full animate-blink-yellow" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="w-full px-8 text-center mt-2 mb-8 flex flex-col items-center">
                  <h2 className={`text-3xl font-black italic tracking-tight uppercase leading-none mb-3 break-words transition-colors hover:text-eth-yellow cursor-default ${isUltraMaxi ? 'text-eth-blue' : 'text-white'}`}>
                    {stats.aiTitle || 'GIGA CHAD'}
                  </h2>
                  {xUserInfo && (
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40 cursor-default group/id">
                      {xUserInfo.profileImageUrl ? (
                        <img 
                          src={xUserInfo.profileImageUrl} 
                          alt={xUserInfo.name}
                          className="w-4 h-4 rounded-full border border-white/20 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      {!xUserInfo.profileImageUrl && (
                        <svg className="w-3 h-3 fill-white/80" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                      )}
                      <span className="text-gray-300 font-medium text-xs tracking-wider group-hover/id:text-white">@{xUserInfo.handle}</span>
                    </div>
                  )}
                </div>

                {/* Score Bar */}
                <div className="w-full h-14 bg-eth-yellow relative flex items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(247,195,37,0.2)] border-y-2 border-white/20 transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_25px_rgba(247,195,37,0.4)] group/score cursor-default">
                  <div className="absolute inset-0 opacity-20 transition-transform duration-500 group-hover/score:scale-110" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)' }}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-black font-black text-xl tracking-[0.2em] uppercase leading-none transition-transform duration-300 group-hover/score:scale-105" data-score-display>
                      SCORE: {displayScore.toLocaleString()} / 100
                    </span>
                    <span className="text-black/60 text-[8px] font-bold uppercase tracking-widest mt-1">Proof of Loyalty</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="h-24 bg-[#0f0505] flex items-center justify-between px-6 border-t border-white/10 relative transition-colors hover:bg-black group/footer">
                <div className="flex flex-col max-w-[70%]">
                   <span className="text-white/40 text-[9px] uppercase font-bold tracking-widest mb-1 transition-colors group-hover/footer:text-primary">Vibe Status</span>
                   <p className="text-gray-300 text-xs font-medium italic leading-tight transition-colors group-hover/footer:text-white">
                    {isHighEnoughForEasterEgg 
                      ? "You’re clearly one of us. When’s the next ETHMumbai?" 
                      : `"${stats.aiDescription || 'Built different. Mumbai energy.'}"`}
                  </p>
                </div>
                <div className="flex flex-col items-center opacity-60 transition-opacity group-hover/footer:opacity-100">
                  <span className="material-symbols-outlined text-4xl text-white/40">verified</span>
                  <span className="text-[7px] text-white/40 font-mono">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-start space-y-8 max-w-lg order-1 lg:order-2 text-center lg:text-left mx-auto lg:mx-0">
            <div>
              <div className={`inline-block px-3 py-1 border rounded text-[10px] font-bold uppercase tracking-[0.2em] mb-4 transition-colors duration-1000 ${
                isUltraMaxi ? 'bg-eth-yellow/10 border-eth-yellow text-eth-yellow' : 'bg-white/10 border-white text-white'
              }`}>
                {getFullRankLabel(stats.score)}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white leading-[1.0] mb-6">
                CLAIM YOUR <br/>
                <span className="inline-block relative">
                  {"LEGACY ON CHAIN".split(" ").map((word, i) => (
                    <span 
                      key={i} 
                      className={`inline-block animate-subtle-wave text-transparent bg-clip-text bg-gradient-to-r ${
                        isUltraMaxi 
                          ? 'from-white via-eth-yellow to-eth-blue' 
                          : 'from-white via-eth-yellow to-white'
                      } bg-[length:200%_auto] animate-shimmer-wave`}
                      style={{ 
                        animationDelay: `${i * 0.15}s`,
                        paddingRight: i !== 2 ? '0.25em' : '0' 
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </h1>
              {isUltraMaxi && (
                <div className="bg-eth-blue/20 border border-eth-blue/50 p-4 rounded mb-6 animate-pulse">
                   <span className="text-white font-bold uppercase text-xs tracking-widest drop-shadow-[0_0_8px_rgba(98,126,234,0.8)]">🏆 ACHIEVEMENT UNLOCKED</span>
                   <p className="text-white font-bold text-lg">ETHMumbai Ultra Maxi</p>
                </div>
              )}
              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                You've successfully scanned your Mumbai frequency. You aren't just an attendee; you're the backbone of this ecosystem.
              </p>
            </div>

            <div className="flex flex-col w-full gap-5">
              <button 
                onClick={handleDownload}
                disabled={isProcessing}
                className="w-full group relative overflow-hidden bg-white hover:bg-gray-100 disabled:opacity-70 transition-all h-20 flex items-center justify-between px-8 clip-chamfer shadow-[0_8px_30px_rgba(255,255,255,0.1)] btn-mechanical"
              >
                <div className="flex items-center gap-5">
                  <div className={`size-12 bg-black/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors ${isProcessing ? 'animate-spin' : ''}`}>
                    <span className="material-symbols-outlined text-black text-2xl group-hover:text-primary transition-colors">
                      {isProcessing ? 'sync' : 'download'}
                    </span>
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-black font-black text-lg leading-none mb-1 uppercase italic tracking-tighter">
                      {isProcessing ? 'Generating...' : 'Download ID'}
                    </span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">High Fidelity Asset</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all">chevron_right</span>
              </button>

              <button 
                onClick={shareOnX}
                disabled={isProcessing}
                className="w-full group relative overflow-hidden bg-[#000000] border border-white/20 hover:border-white disabled:opacity-70 transition-all h-20 flex items-center justify-between px-8 clip-chamfer shadow-[0_8px_30px_rgba(0,0,0,0.5)] btn-mechanical"
              >
                <div className="flex items-center gap-5">
                  <div className="size-12 bg-white/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-white font-black text-lg leading-none mb-1 uppercase italic tracking-tighter">
                      {isProcessing ? 'Processing...' : 'Share to X'}
                    </span>
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Flex your status</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all">ios_share</span>
              </button>

              <div className="flex items-center justify-center lg:justify-start gap-8 mt-4">
                <button 
                  onClick={onReset}
                  className="group flex items-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] font-bold transition-colors btn-mechanical"
                >
                  <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-500">refresh</span>
                  Retake Diagnostic
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
