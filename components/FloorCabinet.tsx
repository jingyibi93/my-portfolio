/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { CategoryId } from '../types';
import { ArrowUpRight, Hand, Sparkles } from 'lucide-react';
import { playDrawerSound, startGramophone, stopGramophone, isGramophoneActive } from '../utils/audio';
import crosleyImg from '../assets/images/flat_crosley_turn_1781085007901.png';

const drawerThumbnails: Record<CategoryId, { image: string; titleZh: string; titleEn: string }> = {
  objects: {
    image: 'https://i.postimg.cc/6pMv27Zc/8-2.jpg',
    titleZh: '物 ｜ 触感日晷',
    titleEn: 'UHPC Tactile Dial'
  },
  images: {
    image: 'https://i.postimg.cc/13K34bLc/13.jpg',
    titleZh: '图像 ｜ 北欧废墟',
    titleEn: 'Nordic Concrete'
  },
  fragments: {
    image: 'https://i.postimg.cc/TPSVHVWr/20250504-portfolio.jpg',
    titleZh: '碎片 ｜ 骨料配比',
    titleEn: 'Material Shards'
  },
  notes: {
    image: 'https://i.postimg.cc/63Cz8Cwr/1.png',
    titleZh: '拟 ｜ 山茶花手机壳',
    titleEn: 'Camellia Phone Case'
  },
  experiments: {
    image: 'https://i.postimg.cc/SK56t6zd/sound-map.jpg',
    titleZh: '试验 ｜ 谐振画布',
    titleEn: 'Generative Canvas'
  }
};

const drawerStacks: Record<CategoryId, Array<{ image: string; titleZh: string; titleEn: string }>> = {
  objects: [
    { image: 'https://i.postimg.cc/wvTL4XdL/2-1.jpg', titleZh: '物 ｜ 恺慕设计', titleEn: 'AIM Design' },
    { image: 'https://i.postimg.cc/DyZ2kr35/20211216-Birdeye.jpg', titleZh: '物 ｜ 华纺小区', titleEn: 'Huafang Renov.' },
    { image: 'https://i.postimg.cc/6pMv27Zc/8-2.jpg', titleZh: '物 ｜ 触感日晷', titleEn: 'UHPC Tactile Dial' }
  ],
  images: [
    { image: 'https://i.postimg.cc/y8Dm0Nph/wei-xin-tu-pian-20260601163045-196-71.jpg', titleZh: '图像 ｜ 夏池莲影', titleEn: 'Lotus Pond' },
    { image: 'https://i.postimg.cc/Gh5c6gMp/Image2.jpg', titleZh: '图像 ｜ 微光见证', titleEn: 'Dim Witness' },
    { image: 'https://i.postimg.cc/13K34bLc/13.jpg', titleZh: '图像 ｜ 北欧废墟', titleEn: 'Nordic Concrete' }
  ],
  fragments: [
    { image: 'https://i.postimg.cc/mr5rYV1p/20170929-IMG-1709.jpg', titleZh: '碎片 ｜ 竹亭艺术', titleEn: 'Bamboo Pavilion' },
    { image: 'https://i.postimg.cc/XqF3PHfS/wei-xin-tu-pian-20260604161226-8555-46.jpg', titleZh: '碎片 ｜ 静物探索', titleEn: 'Still Life Study' },
    { image: 'https://i.postimg.cc/TPSVHVWr/20250504-portfolio.jpg', titleZh: '碎片 ｜ 骨料配比', titleEn: 'Material Shards' }
  ],
  notes: [
    { image: 'https://i.postimg.cc/63Cz8Cwr/1.png', titleZh: '拟 ｜ 山茶手机壳', titleEn: 'Camellia Case' },
    { image: 'https://i.postimg.cc/qq4VngVW/Screen-Shot-2026-06-11-150018-875.jpg', titleZh: '拟 ｜ 旋转书夹', titleEn: 'The Rotating Archive' },
    { image: 'https://i.postimg.cc/MTB8GTkw/wei-xin-tu-pian-20260614175342-274-71.png', titleZh: '拟 ｜ 冰箱便签', titleEn: 'The Fridge Memo' },
    { image: 'https://i.postimg.cc/G2HtwQPm/iphone17-1.png', titleZh: '拟 ｜ 诗歌信箱', titleEn: 'Poemail' },
    { image: 'https://i.postimg.cc/y8Nrf8hB/Screen-Shot-2026-07-06-214856-782.png', titleZh: '拟 ｜ 旋转木马', titleEn: 'Merry-Go-Round' }
  ],
  experiments: [
    { image: 'https://i.postimg.cc/SK56t6zd/sound-map.jpg', titleZh: '试验 ｜ 谐振画布', titleEn: 'Generative Canvas' }
  ]
};

interface FloorCabinetProps {
  onOpenDrawer: (id: CategoryId) => void;
  isEn: boolean;
  onOpenBooklet: (id: string) => void;
  activeCategoryId?: CategoryId | null;
  onPulledDrawerChange?: (id: CategoryId | null) => void;
  onOpenGuestbook?: () => void;
}

export default function FloorCabinet({ 
  onOpenDrawer, 
  isEn, 
  onOpenBooklet, 
  activeCategoryId = null,
  onPulledDrawerChange,
  onOpenGuestbook
}: FloorCabinetProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [transparentGramophone, setTransparentGramophone] = useState<string>('');

  React.useEffect(() => {
    setIsMusicPlaying(isGramophoneActive());
  }, []);

  React.useEffect(() => {
    const img = new Image();
    img.src = crosleyImg;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;

        // BFS Flood-fill background transparentizer
        const visited = new Uint8Array(w * h);
        const queue: number[] = [];
        
        // Push all edge pixels of the canvas that are background (light colored, e.g., RGB > 195)
        for (let x = 0; x < w; x++) {
          // Top edge
          const idxTop = x;
          const rT = data[idxTop * 4];
          const gT = data[idxTop * 4 + 1];
          const bT = data[idxTop * 4 + 2];
          if (rT > 195 && gT > 195 && bT > 195) {
            queue.push(idxTop);
            visited[idxTop] = 1;
            data[idxTop * 4 + 3] = 0;
          }
          
          // Bottom edge
          const idxBot = (h - 1) * w + x;
          const rB = data[idxBot * 4];
          const gB = data[idxBot * 4 + 1];
          const bB = data[idxBot * 4 + 2];
          if (rB > 195 && gB > 195 && bB > 195 && visited[idxBot] === 0) {
            queue.push(idxBot);
            visited[idxBot] = 1;
            data[idxBot * 4 + 3] = 0;
          }
        }
        for (let y = 0; y < h; y++) {
          // Left edge
          const idxLeft = y * w;
          const rL = data[idxLeft * 4];
          const gL = data[idxLeft * 4 + 1];
          const bL = data[idxLeft * 4 + 2];
          if (rL > 195 && gL > 195 && bL > 195 && visited[idxLeft] === 0) {
            queue.push(idxLeft);
            visited[idxLeft] = 1;
            data[idxLeft * 4 + 3] = 0;
          }
          
          // Right edge
          const idxRight = y * w + (w - 1);
          const rR = data[idxRight * 4];
          const gR = data[idxRight * 4 + 1];
          const bR = data[idxRight * 4 + 2];
          if (rR > 195 && gR > 195 && bR > 195 && visited[idxRight] === 0) {
            queue.push(idxRight);
            visited[idxRight] = 1;
            data[idxRight * 4 + 3] = 0;
          }
        }

        // BFS queue traversal
        let head = 0;
        const directions = [
          [1, 0], [-1, 0], [0, 1], [0, -1]
        ];
        
        while (head < queue.length) {
          const curr = queue[head++];
          const cx = curr % w;
          const cy = Math.floor(curr / w);
          
          for (let d = 0; d < directions.length; d++) {
            const nx = cx + directions[d][0];
            const ny = cy + directions[d][1];
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              const nIdx = ny * w + nx;
              if (visited[nIdx] === 0) {
                const r = data[nIdx * 4];
                const g = data[nIdx * 4 + 1];
                const b = data[nIdx * 4 + 2];
                // If it is light gray or white background surrounding the record player console, make it transparent
                if (r > 195 && g > 195 && b > 195) {
                  queue.push(nIdx);
                  visited[nIdx] = 1;
                  data[nIdx * 4 + 3] = 0;
                }
              }
            }
          }
        }
        
        ctx.putImageData(imgData, 0, 0);
        setTransparentGramophone(canvas.toDataURL());
      }
    };
  }, []);



  const handleToggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMusicPlaying) {
      stopGramophone();
      setIsMusicPlaying(false);
    } else {
      startGramophone();
      setIsMusicPlaying(true);
    }
  };

  // We have 5 drawers decorated in distinct flat cartoon background accents
  const drawers: {
    id: CategoryId;
    titleZh: string;
    titleEn: string;
    patternClass: string;
    accentColor: string;
    flatBg: string; // Flat color for vector style
    itemBg: string;
    itemsCount: number;
    subtextZh: string;
    subtextEn: string;
  }[] = [
    {
      id: 'objects',
      titleZh: '物',
      titleEn: 'Objects',
      patternClass: 'bg-[#ecfdf5]',
      accentColor: '#10b981',
      flatBg: 'bg-[#ecfdf5]',
      itemBg: 'bg-emerald-100',
      itemsCount: 10,
      subtextZh: '主创及核心实践作品',
      subtextEn: 'Core Architectural Works'
    },
    {
      id: 'images',
      titleZh: '图像',
      titleEn: 'Images',
      patternClass: 'bg-[#fffbeb]',
      accentColor: '#f59e0b',
      flatBg: 'bg-[#fffbeb]',
      itemBg: 'bg-amber-100',
      itemsCount: 4,
      subtextZh: '中画幅光影底片',
      subtextEn: 'Optic Formats'
    },
    {
      id: 'fragments',
      titleZh: '碎片',
      titleEn: 'Fragments',
      patternClass: 'bg-[#fff5f5]',
      accentColor: '#f43f5e',
      flatBg: 'bg-[#fff5f5]',
      itemBg: 'bg-rose-100',
      itemsCount: 3,
      subtextZh: '学术研究与概念模型',
      subtextEn: 'GSD Academic Studies'
    },
    {
      id: 'experiments',
      titleZh: '试验',
      titleEn: 'Experiments',
      patternClass: 'bg-[#f0f9ff]',
      accentColor: '#3b82f6',
      flatBg: 'bg-[#f0f9ff]',
      itemBg: 'bg-sky-100',
      itemsCount: 1,
      subtextZh: '声音时空图谱与视频',
      subtextEn: 'Acoustic Soundmap & Video'
    },
    {
      id: 'notes',
      titleZh: '拟',
      titleEn: 'Simulation',
      patternClass: 'bg-[#fafaf9]',
      accentColor: '#78716c',
      flatBg: 'bg-[#fafaf9]',
      itemBg: 'bg-stone-200',
      itemsCount: 5,
      subtextZh: 'AI共同演化与履历',
      subtextEn: 'AI Co-evolution & CV'
    }
  ];

  // Manual pull-out state multipliers on click or hover:
  // 'closed' | 'peek' (hovered) | 'pulled' (active slider out)
  const [drawerStates, setDrawerStates] = useState<Record<CategoryId, 'closed' | 'peek' | 'pulled'>>({
    objects: 'closed',
    images: 'closed',
    fragments: 'closed',
    notes: 'closed',
    experiments: 'closed',
  });

  // Synchronize master parent activeCategoryId if provided
  React.useEffect(() => {
    if (activeCategoryId) {
      setDrawerStates(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          next[key as CategoryId] = key === activeCategoryId ? 'pulled' : 'closed';
        });
        return next;
      });
    } else {
      setDrawerStates(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          next[key as CategoryId] = 'closed';
        });
        return next;
      });
    }
  }, [activeCategoryId]);

  const prevStatesRef = React.useRef<Record<CategoryId, 'closed' | 'peek' | 'pulled'>>(drawerStates);

  // Notify parent of currently pulled drawer for ceiling spotlights alignment
  React.useEffect(() => {
    const pulledId = (Object.keys(drawerStates) as CategoryId[]).find(key => drawerStates[key] === 'pulled') || null;
    if (onPulledDrawerChange) {
      onPulledDrawerChange(pulledId);
    }
  }, [drawerStates, onPulledDrawerChange]);

  React.useEffect(() => {
    let played = false;
    const prev = prevStatesRef.current;
    
    // 1. Prioritize 'pull' transition
    for (const id of Object.keys(drawerStates) as CategoryId[]) {
      if (prev[id] !== 'pulled' && drawerStates[id] === 'pulled') {
        playDrawerSound('pull');
        played = true;
        break;
      }
    }
    
    // 2. Prioritize 'push' transition
    if (!played) {
      for (const id of Object.keys(drawerStates) as CategoryId[]) {
        if (prev[id] === 'pulled' && drawerStates[id] === 'closed') {
          playDrawerSound('push');
          played = true;
          break;
        }
      }
    }
    
    // 3. Prioritize 'peek' transition
    if (!played) {
      for (const id of Object.keys(drawerStates) as CategoryId[]) {
        if (prev[id] === 'closed' && drawerStates[id] === 'peek') {
          playDrawerSound('peek');
          played = true;
          break;
        }
      }
    }
    
    prevStatesRef.current = { ...drawerStates };
  }, [drawerStates]);

  const handleDrawerInteraction = (id: CategoryId) => {
    if (drawerStates[id] === 'pulled') {
      // If already pulled, clicking again closes the drawer
      setDrawerStates(prev => ({
        ...prev,
        [id]: 'closed'
      }));
    } else {
      // Otherwise, pull it out
      setDrawerStates(prev => {
        const next = { ...prev };
        // Close others for extreme elegance and focus, pull this one
        Object.keys(next).forEach(key => {
          next[key as CategoryId] = 'closed';
        });
        next[id] = 'pulled';
        return next;
      });
    }
  };

  const handleHoverStart = (id: CategoryId) => {
    if (drawerStates[id] === 'closed') {
      setDrawerStates(prev => ({ ...prev, [id]: 'peek' }));
    }
  };

  const handleHoverEnd = (id: CategoryId) => {
    if (drawerStates[id] === 'peek') {
      setDrawerStates(prev => ({ ...prev, [id]: 'closed' }));
    }
  };

  // Booklet lists representing the bright color illustrated manual booklets laying scattered on top of the table
  const scatteredBooklets = [
    {
      id: 'curator-foreword',
      titleZh: '策展前言 ｜ Foreword',
      titleEn: 'Curator Foreword ｜ 01',
      bgClass: 'bg-[#f43f5e] hover:bg-[#ffe4e6] hover:text-[#f43f5e] text-white shadow-none border-[3.5px] border-black',
      tilt: '-rotate-3 hover:rotate-1 hover:scale-105',
      pos: 'left-[14%] top-[14%]'
    },
    {
      id: 'exhibition-booklet',
      titleZh: '展览折页 ｜ Catalogue',
      titleEn: 'Exhibition Catalogue ｜ 02',
      bgClass: 'bg-[#3b82f6] hover:bg-[#dbeafe] hover:text-[#3b82f6] text-white border-[3.5px] border-black shadow-none relative',
      tilt: 'rotate-3 hover:rotate-1 hover:scale-105',
      pos: 'left-[42%] top-[11%]',
      hasSticker: true
    },
    {
      id: 'about-artist',
      titleZh: '关于艺术家 ｜ Resume',
      titleEn: 'About the Artist ｜ 03',
      bgClass: 'bg-[#10b981] hover:bg-[#d1fae5] hover:text-[#10b981] text-white border-[3.5px] border-black shadow-none',
      tilt: '-rotate-6 hover:rotate-1 hover:scale-105',
      pos: 'left-[70%] top-[16%]'
    }
  ];

  return (
    <div className="w-full h-auto select-none pt-10 pb-11 flex flex-col items-center relative">
      {/* 1. Oak Wooden Display Cabinet Table Top Desk (Perspective structured box) */}
      <div className="w-full max-w-5xl relative px-2 sm:px-4">

        {/* ----------------- CORE TABLE SURFACE (Flat Illustration Version) ----------------- */}
        <div className="relative w-full h-36 border-[4px] border-black rounded-t-[14px] bg-[#fbfaee] z-1 flex items-center justify-center overflow-visible shadow-none">
          {/* Flat shadows and retro stripe borders */}
          <div className="absolute inset-x-0 bottom-0 h-3 bg-black/10 border-t-[3px] border-black pointer-events-none" />
          
          {/* Decorative Comic-strip Sunburst or Angle lines on the illustrated panel */}
          <div className="absolute left-6 top-6 w-12 h-12 border-l-4 border-t-4 border-black/10 pointer-events-none" />
          <div className="absolute right-6 bottom-6 w-12 h-12 border-r-4 border-b-4 border-black/10 pointer-events-none" />

          {/* Interactive Publications/Brochures Scattered on top as in the uploaded photograph */}
          <div className="absolute inset-0 w-full h-full">
            {/* Guestbook/Message Sketchbook Button placed on the desktop surface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              whileHover={{ scale: 1.1, rotate: -3, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenGuestbook) onOpenGuestbook();
              }}
              className="absolute left-[1%] top-[-18px] sm:top-[-26px] z-20 w-22 sm:w-[110px] md:w-[130px] hover:cursor-pointer select-none"
              title={isEn ? "Open Guestbook / Leave a message" : "打开留言薄 / 给Penny留言"}
            >
              <div className="relative group">
                {/* Subtle hover tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-900 border border-stone-700 text-stone-100 text-[8.5px] font-mono px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap uppercase tracking-widest font-black">
                  {isEn ? "✍️ Guestbook" : "✍️ 给Penny留言"}
                </div>

                <svg
                  viewBox="0 0 140 100"
                  className="w-full h-auto drop-shadow-[5px_5px_0_rgba(0,0,0,1)] group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                >
                  {/* Outer spine backing / covers */}
                  <rect x="5" y="10" width="62" height="78" rx="5" fill="#8c6239" stroke="black" strokeWidth="4" />
                  <rect x="73" y="10" width="62" height="78" rx="5" fill="#8c6239" stroke="black" strokeWidth="4" />
                  
                  {/* Inner pages with solid cream color exactly matching the cabinet elements */}
                  <rect x="10" y="14" width="53" height="70" rx="3" fill="#faf6ee" stroke="black" strokeWidth="3" />
                  <rect x="77" y="14" width="53" height="70" rx="3" fill="#faf6ee" stroke="black" strokeWidth="3" />
                  
                  {/* Subtle page lines inside left page */}
                  <line x1="16" y1="24" x2="53" y2="24" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="16" y1="34" x2="53" y2="34" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="16" y1="44" x2="53" y2="44" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="16" y1="54" x2="53" y2="54" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="16" y1="64" x2="53" y2="64" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="16" y1="74" x2="53" y2="74" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  
                  {/* Subtle page lines inside right page */}
                  <line x1="83" y1="24" x2="120" y2="24" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="83" y1="34" x2="120" y2="34" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="83" y1="44" x2="120" y2="44" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="83" y1="54" x2="120" y2="54" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="83" y1="64" x2="120" y2="64" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
                  <line x1="83" y1="74" x2="120" y2="74" stroke="black" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />

                  {/* Red bookmark ribbon handing out from spine center onto left page */}
                  <path d="M 70 20 Q 55 45 35 60" fill="none" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Star decal / heart symbol to make it charming and illustrated */}
                  <path d="M 112 55 L 114 49 L 120 49 L 115 45 L 117 39 L 112 43 L 107 39 L 109 45 L 104 49 L 110 49 Z" fill="#eab308" stroke="black" strokeWidth="1" strokeLinejoin="round" />

                  {/* Wire rings (the spiral center) connecting the split pages */}
                  <path d="M 64 22 C 67 25 73 25 76 22" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 64 34 C 67 37 73 37 76 34" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 64 46 C 67 49 73 49 76 46" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 64 58 C 67 61 73 61 76 58" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 64 70 C 67 73 73 73 76 70" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>

            {scatteredBooklets.map((b) => (
              <button
                id={`booklet-${b.id}`}
                key={b.id}
                onClick={() => onOpenBooklet(b.id)}
                className={`absolute ${b.pos} ${b.tilt} ${b.bgClass} px-3.5 py-3 sm:px-5 sm:py-3.5 rounded-lg text-xs font-sans font-bold tracking-tight cursor-pointer shadow-none transition-all duration-300 select-none hidden sm:flex flex-col gap-1 items-start max-w-[160px] filter drop-shadow-[3px_3px_0_rgba(0,0,0,1)]`}
              >
                {b.hasSticker && (
                  <div className="absolute right-2 top-2 w-6 h-6 rounded-full bg-[#f97316] border-[2.5px] border-black flex items-center justify-center transform rotate-12">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                )}
                <div className="w-4 h-0.5 bg-black/40 rounded-full" />
                <span className="leading-tight text-left font-black z-10 transition-colors">
                  {isEn ? b.titleEn : b.titleZh}
                </span>
                <span className="text-[8px] font-mono opacity-80 font-black self-end mt-1 uppercase tracking-wider z-10">OPEN ↗</span>
              </button>
            ))}
          </div>
        </div>

        {/* ----------------- THE PULL-OUT DRAWERS FRAME (Flat Cartoon Edition) ----------------- */}
        <div className="relative w-full border-x-[4px] border-b-[4px] border-black bg-[#edd8bc] grid grid-cols-5 h-56 shadow-none rounded-b-[14px] overflow-visible">
          {/* Clean flat comic shadow block at the top */}
          <div className="absolute inset-x-0 top-0 h-4 bg-black/20 z-0 pointer-events-none" />

          {drawers.map((drawer, index) => {
            const state = drawerStates[drawer.id];
            
            // Map states to pulled-out visual offset values (Y movement makes it look like it pulls forward in 2D projection, or X in a vertical layout)
            const yOffset = state === 'closed' ? 0 : state === 'peek' ? 18 : 124; // Slide downward in px!
            
            return (
              <div 
                key={drawer.id}
                className="relative h-full border-r-[3.5px] border-black last:border-0 overflow-visible flex flex-col items-center justify-start z-10"
              >
                {/* Comic joint lines */}
                <div className="absolute inset-x-0 top-0 h-2 bg-black/35 pointer-events-none" />

                {/* 
                  The Pull-Out Sliding Body.
                  We use motion.div and animate Y position based on state calculations.
                  Flat style: thick borders, bright contrasting flat backgrounds, zero realistic shadows.
                */}
                <motion.div
                  id={`drawer-body-${drawer.id}`}
                  animate={{ y: yOffset }}
                  transition={{ type: 'spring', damping: 20, stiffness: 130 }}
                  className="absolute top-0 w-[94%] h-[190px] border-x-[3.5px] border-b-[3.5px] border-black bg-[#faf8f5] select-none hover:cursor-grab active:cursor-grabbing origin-top flex flex-col justify-between filter drop-shadow-[0_4px_0_rgba(0,0,0,0.15)]"
                  style={{
                    zIndex: state === 'pulled' ? 30 : 10
                  }}
                  onPointerOver={() => handleHoverStart(drawer.id)}
                  onPointerOut={() => handleHoverEnd(drawer.id)}
                >
                  {/* 
                    A. WOODEN DRAWER FRONT (FLAT ILLUSTRATED FACE BOARD) - Moved to top
                  */}
                  <div 
                    onClick={() => handleDrawerInteraction(drawer.id)}
                    className="h-11 w-full relative border-b-[3.5px] border-black bg-[#fbeada] hover:bg-[#ffe4cc] cursor-pointer select-none overflow-hidden"
                  >
                    {/* Bevel inset line */}
                    <div className="absolute inset-1 border-[2.5px] border-black/10 pointer-events-none rounded-md" />
                    
                    {/* Modern flat handle drawing - Centered vertically on the wooden panel */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55px] h-[16px] rounded-full bg-stone-300 border-[2.5px] border-black flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    </div>

                    {/* Outlined label lettering - Positioned nicely at bottom */}
                    <div className="absolute right-2.5 bottom-[4px] font-mono text-[9px] font-black text-black pointer-events-none uppercase">
                      CAB.0{index + 1}
                    </div>
                    
                    <div className="absolute left-2.5 bottom-[4px] font-mono text-[9px] font-black text-black pointer-events-none uppercase">
                      0{index + 1} // {drawer.titleEn.substring(0, 3)}
                    </div>
                  </div>

                  {/* 
                    B. INSIDE LINING (FLAT COLOR BLOCKS) - Moved to bottom
                  */}
                  <div 
                    onClick={(e) => {
                      if (state === 'pulled') {
                        e.stopPropagation();
                        onOpenDrawer(drawer.id);
                      }
                    }}
                    className={`w-full flex-1 relative overflow-hidden flex flex-col justify-between p-2 ${
                      state === 'pulled' ? 'cursor-pointer hover:brightness-95 transition-all' : ''
                    }`}
                  >
                    {/* Plain contrasting background from flat theme styles */}
                    <div className={`absolute inset-0 ${drawer.flatBg} z-0`} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent z-1 pointer-events-none" />

                    {/* Dynamic inside illumination effect when drawer is pulled open */}
                    {state === 'pulled' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="absolute inset-0 z-2 pointer-events-none"
                      >
                        {/* Smooth radial flare representing direct beam illumination */}
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: 'radial-gradient(circle at 50% 15%, rgba(255, 255, 235, 0.85) 0%, rgba(255, 250, 195, 0.5) 40%, rgba(255, 255, 255, 0) 80%)'
                          }}
                        />
                        {/* Soft ambient overlay brightener to make colors pop under light */}
                        <div className="absolute inset-0 bg-yellow-100/10 mix-blend-overlay" />
                        {/* Glowing highlight frame at the drawer bounding edge */}
                        <div className="absolute inset-0 border-[3px] border-[#fffae0]/75 rounded-sm shadow-[inset_0_0_18px_rgba(255,255,224,0.7)]" />
                      </motion.div>
                    )}

                    {/* Inside Display Content previewing cartoon catalog books - shifted down with mt-6 */}
                    <div className="relative z-10 font-sans text-center mt-6 flex flex-col items-center gap-1 select-none pointer-events-none">
                      {/* Bold flat paper tag card */}
                      <div className="w-11/12 h-[66px] bg-white border-[3px] border-black rounded-lg p-2 flex flex-col justify-between text-left transform rotate-1 select-none">
                        <div className="w-full flex justify-between items-center">
                          <span className="text-[8px] font-mono text-black font-extrabold uppercase tracking-widest leading-none">
                            SLOT.0{index + 1}
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] border-2 border-black" />
                        </div>
                        <span className="text-[11px] sm:text-[12px] font-sans font-black text-black leading-none block truncate">
                          {isEn ? drawer.titleEn : drawer.titleZh}
                        </span>
                        <div className="flex justify-between items-center leading-none">
                          <span className="text-[8px] font-mono text-black font-black">
                            {drawer.itemsCount} ITEMS
                          </span>
                          <span className="text-[8px] font-mono text-white bg-black px-1.5 py-0.5 rounded-sm">ARCHIVE</span>
                        </div>
                      </div>

                      {/* Drop shadow indicator */}
                      <div className="w-8 h-1 mt-2.5 bg-black/35 rounded-full shrink-0" />
                    </div>
                  </div>
                </motion.div>

                {/* Comic style thick back shadow slot containing clickable styled project thumbnail */}
                <div 
                  className={`absolute inset-x-0.5 top-0 bottom-4 bg-[#141413] z-0 border-b-[3.5px] border-black rounded-b-md overflow-visible flex flex-col justify-start items-center p-2 pt-3 transition-all duration-300 pointer-events-auto cursor-pointer group/slot hover:bg-[#1a1a19] ${
                    state !== 'pulled' ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                  onClick={() => onOpenDrawer(drawer.id)}
                  title={isEn ? `Inspect ${drawer.titleEn} collection` : `阅览 ${drawer.titleZh} 归档`}
                >
                  {/* Miniature Stacked Polaroids (Image Stack style matching project details) */}
                  <div className="relative w-full h-[150px] mt-1 flex items-center justify-center overflow-visible select-none pb-2">
                    {drawerStacks[drawer.id].map((stackItem, sIdx) => {
                      const count = drawerStacks[drawer.id].length;
                      const ratio = count > 1 ? (sIdx / (count - 1)) - 0.5 : 0;
                      
                      // Precise fan values for larger, slightly staggered cabinet cards
                      const rotation = ratio * 20 + [-4, 3, -1][sIdx % 3];
                      const translateX = ratio * 32 + [-1, 2, -1][sIdx % 3]; // wider stack spread in px
                      const translateY = Math.abs(ratio) * 8 + [-12, -8, -4][sIdx % 3]; // pulled up slightly for larger view
                      
                      const floatDuration = 4.2 + (sIdx * 0.7);
                      const wobbleDuration = 4.9 + (sIdx * 0.9);
                      const floatOffset = 1.8 + (sIdx * 0.5);
                      const wobbleOffset = 1.2 + (sIdx * 0.3);

                      return (
                        <motion.div
                          key={sIdx}
                          initial={{ rotate: rotation, x: translateX, y: translateY, scale: 0.95 }}
                          animate={{
                            x: translateX,
                            y: [translateY - floatOffset, translateY + floatOffset],
                            rotate: [rotation - wobbleOffset, rotation + wobbleOffset]
                          }}
                          transition={{
                            y: {
                              duration: floatDuration,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut",
                              delay: sIdx * 0.15
                            },
                            rotate: {
                              duration: wobbleDuration,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut",
                              delay: sIdx * 0.25
                            },
                            scale: { duration: 0.25 }
                          }}
                          whileHover={{
                            scale: 1.15,
                            rotate: rotation * 0.25,
                            y: translateY - 22,
                            zIndex: 42,
                            transition: { type: 'spring', stiffness: 200, damping: 15 }
                          }}
                          style={{
                            zIndex: 10 + sIdx
                          }}
                          className="absolute w-[130px] sm:w-[150px] md:w-[165px] aspect-[1/1.12] rounded-md border-[2px] border-black bg-[#faf6ee] p-1.5 shadow-[2px_2px_0_rgba(0,0,0,0.85)] flex flex-col justify-between"
                        >
                          <div className="w-full h-[76%] rounded border-[1.2px] border-black bg-stone-200 overflow-hidden">
                            <img
                              src={stackItem.image}
                              alt={isEn ? stackItem.titleEn : stackItem.titleZh}
                              className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          {/* Minimal Label */}
                          <div className="text-[7.5px] sm:text-[8.5px] font-sans font-black text-black leading-none truncate text-center select-none uppercase tracking-tighter mt-0.5">
                            {isEn ? stackItem.titleEn : stackItem.titleZh}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Tiny instruction text */}
                  <div className="mt-2 text-center text-[7.5px] font-mono leading-tight max-w-[95%] text-[#dfcb9f] select-none uppercase tracking-tight group-hover/slot:text-amber-300 transition-colors pointer-events-none font-bold">
                    [ {isEn ? 'Inspect ↗' : '点击详情 ↗'} ]
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ----------------- TABLE SUPPORT LEGS ASSEMBLY (FLAT COMIC BLOCK) ----------------- */}
        <div className="absolute inset-x-0 -bottom-11 h-12 z-0 pointer-events-none px-6 flex justify-between">
          {/* Leg Left */}
          <div className="w-6 h-full bg-[#edd8bc] border-x-[3.5px] border-b-[3.5px] border-black relative rounded-b-md">
            <div className="absolute inset-y-1 left-1.5 w-1 bg-black/10 pointer-events-none" />
          </div>
          {/* Leg Center supporting frame */}
          <div className="hidden sm:block w-4 h-2 bg-black mt-0.5" />
          {/* Leg Right */}
          <div className="w-6 h-full bg-[#edd8bc] border-x-[3.5px] border-b-[3.5px] border-black relative rounded-b-md">
            <div className="absolute inset-y-1 right-1.5 w-1 bg-black/10 pointer-events-none" />
          </div>
        </div>

        {/* ------------- RETRO CROSLEY WOOD RECORD PLAYER CONSOLE TABLE (MUSIC PLAYBACK BUTTON) ------------- */}
        <div 
          id="interactive-gramophone"
          className="absolute right-[-25px] sm:right-[-385px] md:right-[-495px] lg:right-[-555px] xl:right-[-595px] bottom-[-54px] w-[140px] sm:w-[370px] md:w-[480px] lg:w-[540px] xl:w-[580px] z-30 select-none cursor-pointer group pointer-events-auto flex flex-col items-center"
          onClick={handleToggleMusic}
          title={isMusicPlaying ? (isEn ? "Pause retro record player console" : "暂停复古唱片机柜") : (isEn ? "Play retro record player console" : "播放复古唱片机柜")}
        >
          {/* Animated Sound Wave Notes */}
          {isMusicPlaying && (
            <div className="absolute top-[-40px] left-1/2 -translate-x-[55px] pointer-events-none select-none w-[110px] h-[110px] z-30">
              <motion.span
                className="absolute text-amber-500 font-sans text-lg font-bold drop-shadow-sm select-none"
                custom={0.3}
                variants={floatingNoteVariants}
                initial="initial"
                animate="animate"
              >
                ♫
              </motion.span>
              <motion.span
                className="absolute text-rose-400 font-sans text-base font-bold drop-shadow-sm select-none"
                custom={0.8}
                variants={floatingNoteVariants}
                initial="initial"
                animate="animate"
              >
                ♪
              </motion.span>
              <motion.span
                className="absolute text-emerald-400 font-sans text-sm font-bold drop-shadow-sm select-none"
                custom={1.3}
                variants={floatingNoteVariants}
                initial="initial"
                animate="animate"
              >
                ♬
              </motion.span>
              <motion.span
                className="absolute text-amber-600 font-sans text-base font-bold drop-shadow-sm select-none"
                custom={1.8}
                variants={floatingNoteVariants}
                initial="initial"
                animate="animate"
              >
                ♩
              </motion.span>
            </div>
          )}

          {/* New Crosley Turntable Console Image with programmatic BFS transparency and responsive scale */}
          <motion.img 
            src={transparentGramophone || crosleyImg}
            alt="Crosley Turntable Console"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain pointer-events-none drop-shadow-[8px_8px_0_rgba(0,0,0,0.15)] filter transition-all duration-300 group-hover:scale-[1.03] group-hover:drop-shadow-[10px_10px_0_rgba(0,0,0,0.2)]"
            animate={isMusicPlaying ? {
              rotate: [-0.4, 0.4, -0.3, 0.3, -0.4],
              scale: [1, 1.012, 0.995, 1.008, 1]
            } : { rotate: 0, scale: 1 }}
            transition={{
              duration: 2.0,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Subtle Hover Indicator tooltip */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-stone-900 border border-stone-700 text-stone-100 text-[8.5px] font-mono px-2.5 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap uppercase tracking-widest font-black">
            {isMusicPlaying ? (isEn ? "⏸ Pause Console" : "⏸ 暂停音乐") : (isEn ? "▶ Play Console" : "▶ 播放音乐")}
          </div>
        </div>

      </div>

    </div>
  );
}

const floatingNoteVariants = {
  initial: { x: 25, y: 55, opacity: 0, scale: 0.5 },
  animate: (delayOffset: number) => ({
    x: [25, 2, -22, -45],
    y: [55, 20, -25, -65],
    opacity: [0, 0.9, 0.85, 0],
    scale: [0.5, 1.25, 0.9, 0.6],
    transition: {
      duration: 3.2,
      repeat: Infinity,
      delay: delayOffset * 1.1,
      ease: "easeOut",
    }
  })
};

