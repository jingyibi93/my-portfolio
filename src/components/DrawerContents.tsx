/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ImageItem, NoteItem } from '../types';
import { 
  OBJECTS_DATA, 
  IMAGES_DATA, 
  FRAGMENTS_DATA, 
  NOTES_DATA, 
  EXPERIMENTS_DATA, 
  CV_DATA 
} from '../data';
import { 
  Maximize2, 
  MapPin, 
  Camera, 
  Copy, 
  Check, 
  ArrowRight, 
  FileText, 
  User, 
  Award, 
  Briefcase, 
  ExternalLink,
  Cpu,
  Bookmark,
  Disc,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  Film
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import InteractiveExperiments from './InteractiveExperiments';

interface ContentProps {
  isEn: boolean;
}

/* ==========================================================
 * 1. OBJECTS VIEW
 * ========================================================== */
export function ObjectsView({ isEn }: ContentProps) {
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const selectedItem = OBJECTS_DATA.find(item => item.id === selectedObjectId);

  // Color combinations inspired directly by traditional library card catalogs (beige manila, soft blue/green guides, and brick guides)
  const FOLDER_THEMES = [
    { bg: 'bg-[#f5ebd5]', text: 'text-[#4a321a]', tabBg: 'bg-[#f5ebd5]', stampColor: 'border-[#a35212] text-[#a35212]', stampText: 'QIANTAN.31' },
    { bg: 'bg-[#e9e6df]', text: 'text-[#383d2c]', tabBg: 'bg-[#e9e6df]', stampColor: 'border-[#4f5d22] text-[#4f5d22]', stampText: 'HUAFANG.RENO' },
    { bg: 'bg-[#e3ecf5]', text: 'text-[#1c2e42]', tabBg: 'bg-[#e3ecf5]', stampColor: 'border-[#1b4b73] text-[#1b4b73]', stampText: 'CUL.CITY' },
    { bg: 'bg-[#e4ebec]', text: 'text-[#1e3436]', tabBg: 'bg-[#e4ebec]', stampColor: 'border-[#1f5c61] text-[#1f5c61]', stampText: 'PHUKET.RES' },
    { bg: 'bg-[#f5e9dc]', text: 'text-[#442c17]', tabBg: 'bg-[#f5e9dc]', stampColor: 'border-[#b55811] text-[#b55811]', stampText: 'EAGLE.WEST' },
    { bg: 'bg-[#fcedeb]', text: 'text-[#5a2e28]', tabBg: 'bg-[#fcedeb]', stampColor: 'border-[#b13d2f] text-[#b13d2f]', stampText: 'ZOOTOPIA.CO' },
    { bg: 'bg-[#eef2e6]', text: 'text-[#2b3a1a]', tabBg: 'bg-[#eef2e6]', stampColor: 'border-[#4b6a22] text-[#4b6a22]', stampText: 'MUSEUM.IS' },
    { bg: 'bg-[#fcf7ed]', text: 'text-[#4e3c27]', tabBg: 'bg-[#fcf7ed]', stampColor: 'border-[#8f4f22] text-[#8f4f22]', stampText: 'JOINTS.HOUS' },
    { bg: 'bg-[#e9f1f1]', text: 'text-[#253f41]', tabBg: 'bg-[#e9f1f1]', stampColor: 'border-[#2d6f73] text-[#2d6f73]', stampText: 'HUB.HIGH' }
  ];

  const FOLDER_LABELS = [
    { tabZh: '馆-01 // 前滩31', tabEn: '01 // QIANTAN.31' },
    { tabZh: '改-02 // 华纺小区', tabEn: '02 // HUAFANG' },
    { tabZh: '都-03 // 文化都市', tabEn: '03 // CUL.CITY' },
    { tabZh: '度-04 // 普吉度假', tabEn: '04 // PHUKET' },
    { tabZh: '高-05 // 西鹰大厦', tabEn: '05 // EAGLE.WEST' },
    { tabZh: '学-06 // 动物世界', tabEn: '06 // ZOOTOPIA' },
    { tabZh: '博-07 // 博物馆岛', tabEn: '07 // MUSEUM.IS' },
    { tabZh: '连-08 // 连接之处', tabEn: '08 // JOINTS' },
    { tabZh: '枢-09 // 城市枢纽', tabEn: '09 // HUB' }
  ];

  return (
    <div className="py-2 space-y-4">
      {/* Drawer Title Section */}
      <div className="flex flex-col items-center text-center space-y-1 select-none pb-2">
        <span className="font-mono text-[9px] font-black text-white bg-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {isEn ? "DRAWER-01 // CORNERSTONE INDEX" : "一号抽屉 // 特色工件与结构索引"}
        </span>
        <h3 className="text-xs font-sans font-extrabold text-stone-500 leading-tight">
          {isEn 
            ? "Click on any floating card below to inspect its detailed technical dossier"
            : "轻触下方任一悬浮卡片，即可拉取详实的技术设计档案"
          }
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {!selectedObjectId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* The Elegant Architectural Exhibition Board Container */}
            <div className="relative bg-[#fbfaee] border-[3px] border-black rounded-3xl p-5 sm:p-7 md:p-9 filter drop-shadow-[5px_5px_0_rgba(0,0,0,1)] overflow-hidden">
              {/* Subtle technical background grid lining */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-3xl" />
              
              {/* Left Badge Indicator */}
              <div className="absolute top-4 left-4 bg-[#755030] border-2 border-black text-white px-2.5 py-0.5 rounded-md text-[8px] font-mono font-black uppercase tracking-widest leading-none z-10">
                {isEn ? "SUSPENDED FILES // CABINET STAND" : "浮托展台 // 一号工件架"}
              </div>

              {/* Right System Info */}
              <div className="absolute top-4 right-4 text-[8px] font-mono text-stone-400 font-extrabold uppercase tracking-wider z-10">
                DATA.REF.01G
              </div>

              {/* Responsive showcase grid for the 12 items with lovely vertical staggered floating animations */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-4 md:gap-5 pt-8 pb-3 relative z-10">
                {OBJECTS_DATA.map((item, index) => {
                  const theme = FOLDER_THEMES[index];
                  const label = FOLDER_LABELS[index];

                  // Physics-like float offset setups
                  const floatY = [0, index % 2 === 0 ? -6 : -4, 0];
                  const floatDuration = index % 2 === 0 ? 3.6 : 4.4;
                  const floatDelay = index * 0.22;

                  return (
                    <motion.div
                      key={item.id}
                      className="relative cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => setSelectedObjectId(item.id)}
                      animate={{
                        y: hoveredIndex === index ? -18 : floatY,
                        scale: hoveredIndex === index ? 1.05 : 1,
                        rotate: hoveredIndex === index ? -1.8 : (index % 2 === 0 ? 0.7 : -0.7)
                      }}
                      transition={{
                        y: hoveredIndex === index 
                          ? { type: "spring", stiffness: 220, damping: 18 }
                          : { repeat: Infinity, duration: floatDuration, ease: "easeInOut", delay: floatDelay },
                        scale: { type: "spring", stiffness: 220, damping: 18 },
                        rotate: { type: "spring", stiffness: 220, damping: 18 }
                      }}
                    >
                      {/* FILE FOLDER CARD BODY */}
                      <div className={`w-full aspect-[3/4.6] ${theme.bg} border-[3px] border-black rounded-2xl p-2.5 flex flex-col justify-between relative filter ${
                        hoveredIndex === index 
                          ? 'drop-shadow-[6.5px_6.5px_0_rgba(0,0,0,1)] ring-1 ring-black/5' 
                          : 'drop-shadow-[3px_3px_0_rgba(0,0,0,0.95)]'
                      } transition-all overflow-hidden`}>
                        
                        {/* Folder Tab Header Style tag */}
                        <div className="absolute top-1.5 left-2 bg-[#fbfaee]/95 border border-black/15 px-1 py-0.5 rounded-sm scale-90 origin-left">
                          <span className="font-mono text-[6.5px] font-black text-[#755030] leading-none uppercase">
                            {isEn ? label.tabEn.split('//')[0] : label.tabZh.split('//')[0]}
                          </span>
                        </div>

                        {/* Top-right serial code tag */}
                        <div className="text-right select-none">
                          <span className="font-mono text-[6.5px] text-stone-500 font-extrabold uppercase bg-black/5 px-1 py-0.5 rounded-sm">
                            S.0{index+1}
                          </span>
                        </div>

                        {/* Illustration bounded in a polaroid frame casing */}
                        <div className="w-full aspect-square bg-[#fbfbfa]/95 border-[1.8px] border-black p-1 rounded-xl shadow-inner rotate-[-1deg] relative flex-shrink-0 group-hover:rotate-0 transition-transform duration-300">
                          <div className="w-full h-full overflow-hidden bg-stone-100 border border-black/10 rounded-lg relative">
                            <img 
                              src={item.image} 
                              alt={isEn ? item.titleEn : item.titleZh} 
                              className="w-full h-full object-cover grayscale brightness-[1.03] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300 ease-out"
                              referrerPolicy="no-referrer"
                            />
                            {/* Paper overlay inside image */}
                            <div className="absolute inset-0 bg-neutral-900/5 mix-blend-overlay pointer-events-none" />
                          </div>
                        </div>

                        {/* Visual typography footer section of card */}
                        <div className="border-t border-black/10 pt-1.5 space-y-0.5 text-left">
                          <h4 className="text-[10px] md:text-[11px] font-sans font-black tracking-tight leading-none uppercase text-stone-900 line-clamp-1">
                            {isEn ? item.titleEn.split(' "')[0] : item.titleZh.split(' “')[0]}
                          </h4>
                          <div className="flex items-center justify-between font-mono text-[6.5px] text-stone-500 font-black uppercase leading-none">
                            <span>VER: 2025</span>
                            <span>{item.date}</span>
                          </div>
                        </div>

                        {/* Bottom metal loop hoop grommet (L.B. Direct index drawer styling detail) */}
                        <div className="w-2.5 h-2.5 rounded-full bg-stone-950 border border-stone-400 absolute bottom-1.5 left-1/2 -translate-x-1/2 shadow-inner z-20 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-stone-800" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Split Technical Dossier Sheet layout */}
            {selectedItem && (
              <div className="max-w-4xl mx-auto space-y-6 pt-2">
                {/* Upper Dossier Navigation Bar */}
                <div className="flex justify-between items-center bg-[#fbfaee] border-[3px] border-black p-3.5 rounded-2xl filter drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
                  <button
                    onClick={() => setSelectedObjectId(null)}
                    className="flex items-center gap-1.5 bg-[#4a2f1c] hover:bg-[#5a3a23] text-[#faf6ee] border-2 border-black px-4 py-1.5 rounded-xl text-[10.5px] font-mono font-black active:translate-y-0.5 filter drop-shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all cursor-pointer uppercase select-none"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#faf6ee] stroke-[3.5px]" />
                    <span>{isEn ? "RETURN TO SHOWCASE" : "放回展柜"}</span>
                  </button>
                  
                  <span className="font-mono text-[9px] text-[#755030] font-black uppercase tracking-widest">
                    {isEn ? "TECHNICAL DOSSIER // REPERTOIRE" : "技术文献 // 档案阅览"}
                  </span>
                </div>

                {/* Main Dossier Split Board (Left: Art print, Right: Technical details log) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#fbfaee] border-[3px] border-black rounded-3xl p-5 md:p-8 relative overflow-hidden filter drop-shadow-[5px_5px_0_rgba(0,0,0,1)]">
                  {/* Grid overlay for Blueprint sketch vibe */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-3xl" />

                  {/* LEFT: Structural/Artistic Illustration Box (Column span 5) */}
                  <div className="md:col-span-5 flex flex-col justify-start space-y-4">
                    <div 
                      onClick={() => setSelectedPhoto(selectedItem.image)}
                      className="aspect-square w-full bg-white border-[3px] border-black rounded-2xl p-3 relative flex items-center justify-center cursor-zoom-in group hover:rotate-1 duration-200 transition-transform filter drop-shadow-[3.5px_3.5px_0_rgba(0,0,0,1)]"
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden border-2 border-black bg-stone-100 relative">
                        <img 
                          src={selectedItem.image} 
                          alt={isEn ? selectedItem.titleEn : selectedItem.titleZh} 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Material Spec parameters matrix block */}
                    <div className="bg-[#edd8bc] border-2 border-black rounded-xl p-3 font-mono text-[8.5px] font-bold text-[#755030] space-y-1 select-none text-left">
                      <p className="uppercase font-black border-b border-[#755030]/25 pb-1">SPECIFICATION MATRIX</p>
                      <div className="flex justify-between"><span>DIMENSIONS:</span> <span>{selectedItem.dimensions}</span></div>
                      <div className="flex justify-between"><span>ACQUIRED:</span> <span>{selectedItem.date}</span></div>
                      <div className="flex justify-between"><span>RECORD CODE:</span> <span>SLOT.0{OBJECTS_DATA.findIndex(item => item.id === selectedItem.id) + 1}</span></div>
                    </div>
                  </div>

                  {/* RIGHT: Curated Narrative Logs Sheet (Column span 7) */}
                  <div className="md:col-span-7 flex flex-col justify-between space-y-6 z-10">
                    <div className="space-y-4 text-left">
                      <div className="space-y-1.5">
                        <span className="font-mono text-[9px] text-stone-500 font-extrabold uppercase tracking-widest block bg-stone-200/50 w-max px-2 py-0.5 rounded-sm">
                          RECORD INDEX
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight leading-none">
                          {isEn ? selectedItem.titleEn : selectedItem.titleZh}
                        </h2>
                        <p className="font-mono text-[10px] text-[#755030] font-black uppercase tracking-wider">
                          {isEn ? selectedItem.materialsEn : selectedItem.materialsZh}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-800 font-sans font-bold leading-relaxed border-t border-dashed border-stone-300 pt-3 text-justify">
                        {isEn ? selectedItem.descriptionEn : selectedItem.descriptionZh}
                      </p>

                      {/* Technical/Physical details logs list */}
                      <div className="space-y-2.5 pt-2">
                        <span className="block font-mono text-[8.5px] font-black text-stone-400 uppercase tracking-wider">
                          {isEn ? "MATERIAL ARCHITECTURE LOG" : "工艺材质与生命周期手札 // ARCHIVE"}
                        </span>
                        <ul className="space-y-2 text-xs text-stone-700 font-semibold list-none pl-0">
                          {(isEn ? selectedItem.detailsEn : selectedItem.detailsZh)?.map((detail, idx) => (
                            <li key={idx} className="flex gap-2.5 leading-relaxed text-justify">
                              <span className="font-mono text-[9px] text-[#755030] bg-[#edd8bc] border border-black/15 px-1 h-max py-0.5 rounded-sm select-none font-bold">
                                VER.0{idx+1}
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer markings details */}
                    <div className="flex justify-between items-center pt-4 border-t border-stone-250 font-mono text-[8px] text-stone-400 uppercase font-bold">
                      <span>J.BI DESIGN LAB CATALOG SYSTEM</span>
                      <span className="text-[#a83232] border border-[#a83232] font-black tracking-widest px-1.5 py-0.5 rounded rotate-[-2deg] scale-95 uppercase select-none">
                        APPROVED.VERIFIED
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-150 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedPhoto(null)}
        >
          <img 
            src={selectedPhoto} 
            alt="Maximized detail"
            className="max-w-full max-h-[90vh] object-contain rounded-xl border-[4px] border-black filter drop-shadow-[8px_8px_0_rgba(0,0,0,1)]"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
}

/* ==========================================================
 * 2. IMAGES VIEW
 * ========================================================== */
export function ImagesView({ isEn }: ContentProps) {
  const [lightboxImg, setLightboxImg] = useState<ImageItem | null>(null);

  return (
    <div className="space-y-12 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {IMAGES_DATA.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col justify-between bg-white border-[3.3px] border-black rounded-2xl overflow-hidden filter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:drop-shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all cursor-zoom-in"
            onClick={() => setLightboxImg(item)}
          >
            {/* Aspect container */}
            <div className="relative aspect-square overflow-hidden bg-stone-200 border-b-[3px] border-black">
              <img 
                src={item.image} 
                alt={isEn ? item.titleEn : item.titleZh} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-center">
                <span className="text-[10px] text-white font-mono bg-black hover:bg-black/90 px-2 py-1 rounded-sm uppercase tracking-widest flex items-center gap-1 font-black">
                  <Maximize2 className="w-3 h-3 stroke-[3px]" /> {isEn ? 'PEER IN CLOSEUP' : '查看原片'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between bg-white">
              <div>
                <span className="inline-block font-sans text-[8px] font-black text-white bg-black uppercase px-2 py-0.5 rounded-sm tracking-widest mb-2">
                  {item.date}
                </span>
                <h4 className="text-sm font-sans font-black text-stone-900 tracking-tight leading-snug">
                  {isEn ? item.titleEn : item.titleZh}
                </h4>
              </div>

              <div className="pt-3 border-t-[2px] border-black space-y-1.5 font-mono text-[10px] text-black font-extrabold">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-black shrink-0 stroke-[2.5px]" />
                  <span className="truncate">{isEn ? item.locationEn : item.locationZh}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-black shrink-0 stroke-[2.5px]" />
                  <span className="truncate">{item.camera}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Frame */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-150 flex flex-col justify-between p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setLightboxImg(null)}
        >
          {/* Header Info */}
          <div className="flex justify-between items-start text-stone-300 font-mono text-xs z-10 p-2 pointer-events-none">
            <div className="space-y-1">
              <p className="text-[10px] tracking-widest text-[#dfcb9f] font-black">{lightboxImg.date}</p>
              <h3 className="text-stone-100 font-sans text-base font-black">
                {isEn ? lightboxImg.titleEn : lightboxImg.titleZh}
              </h3>
            </div>
            <p className="text-right text-[10px] text-stone-400 font-black uppercase">
              Click anywhere to close
            </p>
          </div>

          {/* Core Image framed beautifully */}
          <div className="flex-1 flex items-center justify-center p-2">
            <div className="bg-white p-3 rounded-2xl border-[4px] border-black filter drop-shadow-[10px_10px_0_rgba(0,0,0,1)]">
              <img 
                src={lightboxImg.image} 
                alt={isEn ? lightboxImg.titleEn : lightboxImg.titleZh} 
                className="max-w-full max-h-[62vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="grid grid-cols-2 text-[10px] font-mono text-stone-400 border-t border-stone-800 pt-4 z-10 max-w-4xl mx-auto w-full pointer-events-none">
            <div>
              <span className="block text-stone-500 font-black">CAMERA DETAILS</span>
              <span className="block mt-0.5 text-stone-200 font-bold">{lightboxImg.camera}</span>
            </div>
            <div className="text-right">
              <span className="block text-stone-500 font-black">EXPOSURE ARCHIVE</span>
              <span className="block mt-0.5 text-stone-200 font-bold">{isEn ? lightboxImg.locationEn : lightboxImg.locationZh}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================
 * 3. FRAGMENTS VIEW
 * ========================================================== */
export function FragmentsView({ isEn }: ContentProps) {
  const [lightboxImg, setLightboxImg] = useState<any | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);

  const openLightbox = (item: any) => {
    setLightboxImg(item);
    setActiveImgIndex(0);
  };

  const imagesList = lightboxImg && lightboxImg.galleryImages && lightboxImg.galleryImages.length > 0
    ? lightboxImg.galleryImages
    : lightboxImg ? [lightboxImg.image] : [];
  const currentImg = lightboxImg ? (imagesList[activeImgIndex] || lightboxImg.image) : '';

  return (
    <div className="space-y-12 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {FRAGMENTS_DATA.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col justify-between bg-white border-[3.3px] border-black rounded-2xl overflow-hidden filter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:drop-shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all cursor-zoom-in"
            onClick={() => openLightbox(item)}
          >
            {/* Aspect container */}
            <div className="relative aspect-square overflow-hidden bg-stone-200 border-b-[3px] border-black">
              <img 
                src={item.image} 
                alt={isEn ? item.titleEn : item.titleZh} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-center">
                <span className="text-[10px] text-white font-mono bg-black hover:bg-black/90 px-2 py-1 rounded-sm uppercase tracking-widest flex items-center gap-1 font-black">
                  <Maximize2 className="w-3 h-3 stroke-[3px]" /> {isEn ? 'PEER IN CLOSEUP' : '查看细节'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between bg-white">
              <div>
                <span className="inline-block font-sans text-[8px] font-black text-white bg-black uppercase px-2 py-0.5 rounded-sm tracking-widest mb-2">
                  {item.date}
                </span>
                <h4 className="text-sm font-sans font-black text-stone-900 tracking-tight leading-snug">
                  {isEn ? item.titleEn : item.titleZh}
                </h4>
              </div>

              <div className="pt-3 border-t-[2px] border-black space-y-1.5 font-mono text-[10px] text-black font-extrabold">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-black shrink-0 stroke-[2.5px]" />
                  <span className="truncate">{isEn ? item.locationEn : item.locationZh}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-black shrink-0 stroke-[2.5px]" />
                  <span className="truncate">Instructor: {isEn ? item.instructorEn : item.instructorZh}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Backdrop Overlay */}
      {lightboxImg && (
        <div 
          id="item-lightbox-portal"
          className="fixed inset-0 z-150 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 select-none"
          onClick={() => setLightboxImg(null)}
        >
          <div 
            className="relative bg-white border-[4px] border-black rounded-3xl p-4 sm:p-5 max-w-full sm:max-w-xl md:max-w-2xl filter drop-shadow-[8px_8px_0_rgba(0,0,0,1)] flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close trigger button */}
            <button 
              id="close-lightbox-btn"
              onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full border-3 border-black text-xs font-serif font-black flex items-center justify-center shadow-[2px_2px_0_rgba(0,0,0,1)] bg-[#fff5f5] hover:bg-stone-100 transition-all cursor-pointer text-stone-900 z-10"
            >
              ✕
            </button>

            {/* Framed image with carousel navigation */}
            <div className="relative border-[3px] border-black rounded-2xl overflow-hidden aspect-square bg-stone-100 max-h-[50vh] sm:max-h-[55vh]">
              <img 
                src={currentImg} 
                className="w-full h-full object-cover" 
                alt={isEn ? lightboxImg.titleEn : lightboxImg.titleZh} 
                referrerPolicy="no-referrer"
              />
              
              {/* Carousel Next/Prev Controls */}
              {imagesList.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImgIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1))}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black bg-white hover:bg-stone-100 flex items-center justify-center font-bold text-sm shadow-[2px_2px_0_rgba(0,0,0,1)] active:translate-y-[-45%] active:shadow-[1px_1px_0_rgba(0,0,0,1)] transition-all cursor-pointer z-10"
                  >
                    ←
                  </button>
                  <button 
                    onClick={() => setActiveImgIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-black bg-white hover:bg-stone-100 flex items-center justify-center font-bold text-sm shadow-[2px_2px_0_rgba(0,0,0,1)] active:translate-y-[-45%] active:shadow-[1px_1px_0_rgba(0,0,0,1)] transition-all cursor-pointer z-10"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails list if there are multiple images */}
            {imagesList.length > 1 && (
              <div id="carousel-thumbnails" className="flex gap-2 justify-center py-0.5 overflow-x-auto min-h-12">
                {imagesList.map((imgUrl: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-11 h-11 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImgIndex === idx 
                        ? 'border-rose-600 scale-105 ring-2 ring-rose-300' 
                        : 'border-stone-900 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      className="w-full h-full object-cover" 
                      alt="" 
                      referrerPolicy="no-referrer" 
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Metadata overlay text */}
            <div className="text-left py-1 text-black">
              <span className="text-[9px] font-sans font-black text-rose-600 uppercase tracking-widest block mb-0.5">
                {lightboxImg.date} — {isEn ? "GSD ACADEMIC STUDY" : "哈佛GSD学术设计研究"}
              </span>
              <h3 className="text-[17px] font-sans font-black tracking-tight leading-tight mb-2">
                {isEn ? lightboxImg.titleEn : lightboxImg.titleZh}
              </h3>
              <p className="text-[11px] font-sans font-bold text-stone-600 leading-relaxed mb-4">
                {isEn ? lightboxImg.contentEn : lightboxImg.contentZh}
              </p>
              
              {/* Detailed specification list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 border-t-[2px] border-black pt-3.5 font-mono text-[10px] font-black text-stone-950">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 stroke-[2.5px] text-stone-800" />
                  <span className="truncate">{isEn ? lightboxImg.locationEn : lightboxImg.locationZh}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 shrink-0 stroke-[2.5px] text-stone-800" />
                  <span className="truncate">{isEn ? `Instructor: ${lightboxImg.instructorEn}` : `指导者: ${lightboxImg.instructorZh}`}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <User className="w-3.5 h-3.5 shrink-0 stroke-[2.5px] text-stone-800" />
                  <span className="truncate">{isEn ? `Partner: ${lightboxImg.partner}` : `合作者: ${lightboxImg.partner}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================
 * 4. NOTES VIEW (MIMICRY / AI)
 * ========================================================== */
export function NotesView({ isEn }: ContentProps) {
  const [lightboxImg, setLightboxImg] = useState<any | null>(null);

  return (
    <div className="space-y-12 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {NOTES_DATA.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col justify-between bg-white border-[3.3px] border-black rounded-2xl overflow-hidden filter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:drop-shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all cursor-zoom-in"
            onClick={() => setLightboxImg(item)}
          >
            {/* Aspect container */}
            <div className="relative aspect-video overflow-hidden bg-stone-200 border-b-[3px] border-black flex items-center justify-center">
              <img 
                src={item.image} 
                alt={isEn ? item.titleEn : item.titleZh} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Play Button Overlay */}
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-all group-hover:bg-black/35">
                <div className="w-12 h-12 bg-white border-[3px] border-black rounded-full flex items-center justify-center filter drop-shadow-[2.5px_2.5px_0_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                  <Play className="w-4.5 h-4.5 text-black fill-black ml-0.5 stroke-[2.5px]" />
                </div>
              </div>

              <div className="absolute bottom-3 left-3 bg-black text-white text-[8px] font-mono font-black uppercase px-2 py-0.5 tracking-wider rounded-sm flex items-center gap-1">
                <Film className="w-2.5 h-2.5" /> {isEn ? 'VIDEO STUDY' : '视频作品'}
              </div>
            </div>

            {/* Description */}
            <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between bg-white">
              <div>
                <span className="inline-block font-sans text-[8px] font-black text-white bg-black uppercase px-2 py-0.5 rounded-sm tracking-widest mb-2">
                  {item.date} — {item.category}
                </span>
                <h4 className="text-sm font-sans font-black text-stone-900 tracking-tight leading-snug">
                  {isEn ? item.titleEn : item.titleZh}
                </h4>
              </div>

              <div className="pt-3 border-t-[2px] border-black space-y-1.5 font-mono text-[10px] text-black font-extrabold flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-stone-700 shrink-0 stroke-[2.5px]" />
                  <span className="truncate text-stone-700">{isEn ? item.readTime : '生成式仿真交互'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Video Player Modal */}
      {lightboxImg && (
        <div 
          id="notes-lightbox-portal"
          className="fixed inset-0 z-150 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 select-none"
          onClick={() => setLightboxImg(null)}
        >
          <div 
            className="relative bg-white border-[4px] border-black rounded-3xl p-4 sm:p-5 w-full max-w-full sm:max-w-2xl md:max-w-3xl filter drop-shadow-[8px_8px_0_rgba(0,0,0,1)] flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close trigger button */}
            <button 
              id="close-notes-lightbox-btn"
              onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full border-3 border-black text-xs font-serif font-black flex items-center justify-center shadow-[2px_2px_0_rgba(0,0,0,1)] bg-[#fff5f5] hover:bg-stone-100 transition-all cursor-pointer text-stone-900"
            >
              ✕
            </button>

            {/* Bilibili or Native MP4 Video Embed Layer */}
            <div className="flex flex-col gap-2 w-full">
              <div className="border-[3px] border-black rounded-2xl overflow-hidden aspect-video bg-black max-h-[50vh] filter drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
                {lightboxImg?.videoUrl && (lightboxImg.videoUrl.toLowerCase().split('?')[0].endsWith('.mp4') || lightboxImg.videoUrl.toLowerCase().includes('.mp4')) ? (
                  <video 
                    src={lightboxImg.videoUrl} 
                    controls 
                    autoPlay 
                    muted 
                    playsInline 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe 
                    src={`//player.bilibili.com/player.html?bvid=${(() => {
                      const url = lightboxImg?.videoUrl;
                      if (!url) return 'BV1S4Ew6METQ';
                      const match = url.match(/(BV[a-zA-Z0-9]+)/);
                      return match ? match[1] : 'BV1S4Ew6METQ';
                    })()}&p=1&high_quality=1&autoplay=1&t=1`}
                    scrolling="no" 
                    frameBorder="0" 
                    allowFullScreen={true}
                    allow="autoplay; encrypted-media; fullscreen"
                    sandbox="allow-top-navigation allow-same-origin allow-scripts allow-forms allow-popups"
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="text-[10px] sm:text-xs text-stone-500 font-sans font-medium flex items-start gap-1 px-1 py-1">
                <span className="text-stone-700 font-bold shrink-0">💡 {isEn ? "Tip:" : "小提示："}</span>
                <span>
                  {lightboxImg?.videoUrl && (lightboxImg.videoUrl.toLowerCase().split('?')[0].endsWith('.mp4') || lightboxImg.videoUrl.toLowerCase().includes('.mp4')) ? (
                    isEn ? "MP4 video direct link is active. Use controls to adjust sound or play speed." : "MP4 直链视频播放中。您可以使用播放器控制条调整音量与进度。"
                  ) : (
                    isEn 
                      ? "Modern browsers block sound by default for autoplaying videos. Simply click the speaker icon in Bilibili's bottom right control bar once to restore sound. Your browser will remember this setting for subsequent visits!"
                      : "由于浏览器自带的媒体保护机制，自动播放时会默认静音。只需手动点击播放器右下角喇叭图标恢复声音一次，后续每次进入即可自动带声播放。"
                  )}
                </span>
              </div>
            </div>

            {/* Metadata overlay text */}
            <div className="text-left py-1 text-black">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div>
                  <span className="text-[9px] font-sans font-black text-rose-600 uppercase tracking-widest block mb-0.5">
                    {lightboxImg.date} — {isEn ? "GENERATIVE MIMICRY // AI & COMPUTATIONAL" : "生成式仿真 ｜ 拟态设计研讨"}
                  </span>
                  <h3 className="text-[17px] font-sans font-black tracking-tight leading-tight uppercase">
                    {isEn ? lightboxImg.titleEn : lightboxImg.titleZh}
                  </h3>
                </div>
                
                {/* Original Bilibili video outward toggle */}
                <a 
                  href={lightboxImg.videoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-[#f0f9ff] hover:bg-sky-100 border-[2.5px] border-black text-black hover:text-black px-2.5 py-1 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition-all shadow-[2px_2px_0_rgba(0,0,0,1)] hover:translate-y-[-1px] select-none"
                >
                  Watch on Bilibili <ExternalLink className="w-3.5 h-3.5 stroke-[2.5px] text-black" />
                </a>
              </div>

              <p className="text-[11px] font-sans font-semibold text-stone-600 leading-relaxed mb-4">
                {isEn ? lightboxImg.contentEn : lightboxImg.contentZh}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================
 * 5. EXPERIMENTS VIEW
 * ========================================================== */
export function ExperimentsView({ isEn }: ContentProps) {
  const [lightboxImg, setLightboxImg] = useState<any | null>(null);

  return (
    <div className="space-y-12 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {EXPERIMENTS_DATA.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col justify-between bg-white border-[3.3px] border-black rounded-2xl overflow-hidden filter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:drop-shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all cursor-zoom-in"
            onClick={() => setLightboxImg(item)}
          >
            {/* Aspect container */}
            <div className="relative aspect-video overflow-hidden bg-stone-200 border-b-[3px] border-black flex items-center justify-center">
              <img 
                src={item.image} 
                alt={isEn ? item.titleEn : item.titleZh} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Play Button Overlay */}
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-all group-hover:bg-black/35">
                <div className="w-12 h-12 bg-white border-[3px] border-black rounded-full flex items-center justify-center filter drop-shadow-[2.5px_2.5px_0_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                  <Play className="w-4.5 h-4.5 text-black fill-black ml-0.5 stroke-[2.5px]" />
                </div>
              </div>

              <div className="absolute bottom-3 left-3 bg-black text-white text-[8px] font-mono font-black uppercase px-2 py-0.5 tracking-wider rounded-sm flex items-center gap-1">
                <Film className="w-2.5 h-2.5" /> {isEn ? 'VIDEO STUDY' : '视频作品'}
              </div>
            </div>

            {/* Description */}
            <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between bg-white">
              <div>
                <span className="inline-block font-sans text-[8px] font-black text-white bg-black uppercase px-2 py-0.5 rounded-sm tracking-widest mb-2">
                  {item.date} — {item.type}
                </span>
                <h4 className="text-sm font-sans font-black text-stone-900 tracking-tight leading-snug">
                  {isEn ? item.titleEn : item.titleZh}
                </h4>
              </div>

              <div className="pt-3 border-t-[2px] border-black space-y-1.5 font-mono text-[10px] text-black font-extrabold">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-black shrink-0 stroke-[2.5px]" />
                  <span className="truncate">{isEn ? item.locationEn : item.locationZh}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-black shrink-0 stroke-[2.5px]" />
                  <span className="truncate">Instructor: {isEn ? item.instructorEn : item.instructorZh}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Video Player Modal */}
      {lightboxImg && (
        <div 
          id="item-lightbox-portal"
          className="fixed inset-0 z-150 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 select-none"
          onClick={() => setLightboxImg(null)}
        >
          <div 
            className="relative bg-white border-[4px] border-black rounded-3xl p-4 sm:p-5 w-full max-w-full sm:max-w-2xl md:max-w-3xl filter drop-shadow-[8px_8px_0_rgba(0,0,0,1)] flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close trigger button */}
            <button 
              id="close-lightbox-btn"
              onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full border-3 border-black text-xs font-serif font-black flex items-center justify-center shadow-[2px_2px_0_rgba(0,0,0,1)] bg-[#fff5f5] hover:bg-stone-100 transition-all cursor-pointer text-stone-900"
            >
              ✕
            </button>

            {/* Bilibili or Native MP4 Video Embed Layer */}
            <div className="flex flex-col gap-2 w-full">
              <div className="border-[3px] border-black rounded-2xl overflow-hidden aspect-video bg-black max-h-[50vh] filter drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
                {lightboxImg?.videoUrl && (lightboxImg.videoUrl.toLowerCase().split('?')[0].endsWith('.mp4') || lightboxImg.videoUrl.toLowerCase().includes('.mp4')) ? (
                  <video 
                    src={lightboxImg.videoUrl} 
                    controls 
                    autoPlay 
                    muted 
                    playsInline 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe 
                    src={`//player.bilibili.com/player.html?bvid=${(() => {
                      const url = lightboxImg?.videoUrl;
                      if (!url) return 'BV1ajEF6TEXE';
                      const match = url.match(/(BV[a-zA-Z0-9]+)/);
                      return match ? match[1] : 'BV1ajEF6TEXE';
                    })()}&p=1&high_quality=1&autoplay=1&t=1`}
                    scrolling="no" 
                    frameBorder="0" 
                    allowFullScreen={true}
                    allow="autoplay; encrypted-media; fullscreen"
                    sandbox="allow-top-navigation allow-same-origin allow-scripts allow-forms allow-popups"
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="text-[10px] sm:text-xs text-stone-500 font-sans font-medium flex items-start gap-1 px-1 py-1">
                <span className="text-stone-700 font-bold shrink-0">💡 {isEn ? "Tip:" : "小提示："}</span>
                <span>
                  {lightboxImg?.videoUrl && (lightboxImg.videoUrl.toLowerCase().split('?')[0].endsWith('.mp4') || lightboxImg.videoUrl.toLowerCase().includes('.mp4')) ? (
                    isEn ? "MP4 video direct link is active. Use controls to adjust sound or play speed." : "MP4 直链视频播放中。您可以使用播放器控制条调整音量与进度。"
                  ) : (
                    isEn 
                      ? "Modern browsers block sound by default for autoplaying videos. Simply click the speaker icon in Bilibili's bottom right control bar once to restore sound. Your browser will remember this setting for subsequent visits!"
                      : "由于浏览器自带的媒体保护机制，自动播放时会默认静音。只需手动点击播放器右下角喇叭图标恢复声音一次，后续每次进入即可自动带声播放。"
                  )}
                </span>
              </div>
            </div>

            {/* Metadata overlay text */}
            <div className="text-left py-1 text-black">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div>
                  <span className="text-[9px] font-sans font-black text-rose-600 uppercase tracking-widest block mb-0.5">
                    {lightboxImg.date} — {isEn ? "GSD ACADEMIC STUDY // VIDEO" : "哈佛GSD学术设计研究 // 视频"}
                  </span>
                  <h3 className="text-[17px] font-sans font-black tracking-tight leading-tight uppercase">
                    {isEn ? lightboxImg.titleEn : lightboxImg.titleZh}
                  </h3>
                </div>
                
                {/* Original Bilibili video outward toggle */}
                <a 
                  href={lightboxImg.videoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-[#f0f9ff] hover:bg-sky-100 border-[2.5px] border-black text-black hover:text-black px-2.5 py-1 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition-all shadow-[2px_2px_0_rgba(0,0,0,1)] hover:translate-y-[-1px] select-none"
                >
                  Watch on Bilibili <ExternalLink className="w-3.5 h-3.5 stroke-[2.5px] text-black" />
                </a>
              </div>

              <p className="text-[11px] font-sans font-bold text-stone-600 leading-relaxed mb-4">
                {isEn ? lightboxImg.descriptionEn : lightboxImg.descriptionZh}
              </p>
              
              {/* Detailed specification list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 border-t-[2px] border-black pt-3.5 font-mono text-[10px] font-black text-stone-950">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 stroke-[2.5px] text-stone-800" />
                  <span className="truncate">{isEn ? lightboxImg.locationEn : lightboxImg.locationZh}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 shrink-0 stroke-[2.5px] text-stone-800" />
                  <span className="truncate">{isEn ? `Instructor: ${lightboxImg.instructorEn}` : `指导者: ${lightboxImg.instructorZh}`}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <User className="w-3.5 h-3.5 shrink-0 stroke-[2.5px] text-stone-800" />
                  <span className="truncate">{isEn ? `Partner: ${lightboxImg.partner}` : `合作者: ${lightboxImg.partner}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
