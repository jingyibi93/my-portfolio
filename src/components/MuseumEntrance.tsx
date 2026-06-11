import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe2 } from 'lucide-react';

interface MuseumEntranceProps {
  onEnter: () => void;
  isEn: boolean;
  onToggleLang: () => void;
}

export default function MuseumEntrance({ onEnter, isEn, onToggleLang }: MuseumEntranceProps) {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnterClick = () => {
    if (isEntering) return;
    setIsEntering(true);
    // Let the door split animation play out slightly first for real immersion, then trigger top parent state
    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#FBFBFA] flex flex-col justify-between items-center p-6 select-none overflow-hidden font-sans">
      
      {/* ----------------- TOP BAR LANG & UTILS ----------------- */}
      <div className="w-full max-w-7xl h-10 flex justify-between items-center z-50 shrink-0 pointer-events-none select-none">
        {/* Removed brand stamp and global language button from entrance overlay as requested */}
      </div>

      {/* ----------------- CENTERED GRAND MUSEUM ENTRANCE DOORWAY ----------------- */}
      <div className="flex-1 w-full max-w-4xl flex flex-col justify-center items-center relative z-20 my-6">
        
        {/* Realistic Spotlight Cone shining onto primary doorway */}
        <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-72 h-80 bg-radial-gradient from-amber-100/40 via-amber-50/10 to-transparent pointer-events-none select-none blur-xl z-0" />

        {/* Upper Hanging Signboard Plaque - Neoclassical Style */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 90 }}
          className="mb-8 text-center flex flex-col items-center gap-2 relative z-20"
        >
          <div className="px-6 py-3 border-[3.5px] border-black bg-[#FBFAEE] rounded-sm shadow-[4px_4px_0_rgba(0,0,0,1)] relative overflow-visible max-w-md">
            {/* Fine classical chains mock */}
            <div className="absolute -top-6 left-1/4 w-0.5 h-6 bg-black" />
            <div className="absolute -top-6 right-1/4 w-0.5 h-6 bg-black" />
            
            <h1 className="font-sans font-black text-2xl sm:text-3xl text-stone-900 tracking-[0.22em] uppercase leading-none">
              Penny's Gallery
            </h1>
            <div className="h-[2px] bg-black my-1.5 w-4/5 mx-auto opacity-80" />
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#B33E2B] font-black block">
              {isEn ? "DESIGN ARCHIVE & EXHIBITION" : "设计师学术手绘与实践陈列馆"}
            </span>
          </div>
        </motion.div>

        {/* Neoclassical Pediment Portal / Frame */}
        <motion.div
          id="museum-pediment-frame"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative w-[280px] sm:w-[350px] md:w-[380px] aspect-[1/1.4] border-[4px] border-black bg-[#FBFAEE] rounded-t-[190px] shadow-[10px_10px_0_rgba(0,0,0,1)] flex flex-col justify-center items-center transition-all duration-500 ease-out z-10 overflow-hidden group cursor-pointer"
          onClick={handleEnterClick}
        >
          {/* Light glow inside when opening */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-50 to-amber-200/80 index-0 transition-opacity duration-700 pointer-events-none" />

          {/* Symmetrical split doors overlay */}
          <div className="absolute inset-x-2.5 top-2.5 bottom-0 rounded-t-[175px] border-[3px] border-black overflow-hidden z-10 flex">
            
            {/* LEFT DOOR PANEL */}
            <motion.div
              animate={isEntering ? { 
                x: '-105%', 
                rotateY: -85, 
                originX: 0,
                opacity: 0,
                transition: { duration: 1.15, ease: [0.4, 0, 0.2, 1] }
              } : {}}
              className="w-1/2 h-full bg-[#fcfbfa] border-r-[1.5px] border-black p-4 relative z-20 origin-left"
              style={{ perspective: 1000 }}
            >
              {/* Removed spacers for design clarity */}

              {/* Brass door handle left (centered along screen overlap line) */}
              <div className="absolute right-[-7px] top-[60%] -translate-y-1/2 z-30 pointer-events-none group-hover:scale-105 transition-transform">
                <svg className="w-[14px] h-[35px]" viewBox="0 0 14 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Handle plate */}
                  <rect x="1" y="2" width="6" height="31" rx="1" fill="#f59e0b" stroke="black" strokeWidth="1.5" />
                  {/* Pivot ring */}
                  <circle cx="4" cy="17" r="4.5" fill="#d97706" stroke="black" strokeWidth="1.5" />
                  {/* Keyhole */}
                  <rect x="3.5" y="22" width="1" height="4" fill="black" />
                </svg>
              </div>
            </motion.div>

            {/* RIGHT DOOR PANEL */}
            <motion.div
              animate={isEntering ? { 
                x: '105%', 
                rotateY: 85, 
                originX: '100%',
                opacity: 0,
                transition: { duration: 1.15, ease: [0.4, 0, 0.2, 1] }
              } : {}}
              className="w-1/2 h-full bg-[#fcfbfa] border-l-[1.5px] border-black p-4 relative z-20 origin-right"
              style={{ perspective: 1000 }}
            >
              {/* Removed spacers for design clarity */}

              {/* Brass door handle right (centered along screen overlap line) */}
              <div className="absolute left-[-7px] top-[60%] -translate-y-1/2 z-30 pointer-events-none group-hover:scale-105 transition-transform">
                <svg className="w-[14px] h-[35px]" viewBox="0 0 14 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Handle plate */}
                  <rect x="7" y="2" width="6" height="31" rx="1" fill="#f59e0b" stroke="black" strokeWidth="1.5" />
                  {/* Pivot ring */}
                  <circle cx="10" cy="17" r="4.5" fill="#d97706" stroke="black" strokeWidth="1.5" />
                  {/* Keyhole */}
                  <rect x="9.5" y="22" width="1" height="4" fill="black" />
                </svg>
              </div>
            </motion.div>

            {/* Inner radiant glowing light leakage seen when opening split */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-amber-400 via-orange-300 to-amber-200 flex flex-col items-center justify-center">
              {/* Radiant rotating sunburst or sparkles */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full border-[1.5px] border-black/5 border-dashed bg-white/10 blur-md"
              />
              <div className="absolute font-mono text-[9px] uppercase tracking-[0.3em] font-black text-black/40 text-center animate-pulse">
                {isEn ? "UNVEILING ARCHIVE //" : "画廊主展厅正在开启 //"}
              </div>
            </div>

          </div>

          {/* Ambient Roman Pillars detail carvings */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 border-r border-black/10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-2.5 border-l border-black/10 pointer-events-none" />
        </motion.div>

      </div>

      {/* Empty bottom element to maintain top-to-bottom flex structure perfectly */}
      <div className="h-6 shrink-0" />
      
    </div>
  );
}
