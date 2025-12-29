
import React from 'react';

export const EthMumbaiLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 400 400" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Ethereum Diamond - Top Half */}
    <path d="M200 20L310 205L200 275L90 205L200 20Z" fill="#627EEA" />
    <path d="M200 20L200 275L90 205L200 20Z" fill="#3A4EA1" fillOpacity="0.3" />
    
    {/* Ethereum Diamond - Bottom Half */}
    <path d="M200 295L310 220L200 380L90 220L200 295Z" fill="#627EEA" fillOpacity="0.8" />
    <path d="M200 295L200 380L90 220L200 295Z" fill="#3A4EA1" fillOpacity="0.4" />

    {/* Mumbai Local Train Front */}
    <g transform="translate(135, 125)">
      {/* Main Body */}
      <rect width="130" height="90" rx="10" fill="white" />
      <rect y="20" width="130" height="70" fill="#ec1313" />
      
      {/* Windows */}
      <rect x="10" y="30" width="50" height="40" rx="2" fill="black" />
      <rect x="70" y="30" width="50" height="40" rx="2" fill="black" />
      <rect x="25" y="5" width="40" height="10" rx="1" fill="black" />
      <rect x="85" y="5" width="20" height="10" rx="1" fill="black" />
      
      {/* Yellow Stripe/Bottom Section */}
      <path d="M0 90H130L110 115H20L0 90Z" fill="#F7C325" />
      <rect x="55" y="95" width="20" height="2" fill="black" />
      <rect x="55" y="100" width="20" height="2" fill="black" />
      <rect x="55" y="105" width="20" height="2" fill="black" />
      
      {/* Headlights */}
      <circle cx="25" cy="103" r="5" fill="white" />
      <circle cx="105" cy="103" r="5" fill="white" />
      
      {/* Side Details */}
      <rect x="-10" y="45" width="10" height="15" fill="black" />
      <rect x="130" y="45" width="10" height="15" fill="black" />
    </g>
  </svg>
);
