/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe2, Sparkles, FolderOpen } from 'lucide-react';
import { CategoryId } from '../types';
import { 
  ObjectsView, 
  ImagesView, 
  FragmentsView, 
  NotesView, 
  ExperimentsView 
} from './DrawerContents';

interface DrawerViewerProps {
  categoryId: CategoryId | null;
  onClose: () => void;
  isEn: boolean;
  onToggleLang: () => void;
}

export default function DrawerViewer({ categoryId, onClose, isEn, onToggleLang }: DrawerViewerProps) {
  if (!categoryId) return null;

  // Metadata associated with each category folder
  const meta: Record<CategoryId, {
    titleZh: string;
    titleEn: string;
    descZh: string;
    descEn: string;
    patternClass: string;
    accentColor: string;
    textColor: string;
  }> = {
    objects: {
      titleZh: '物 ｜ Projects & Objects',
      titleEn: 'Objects & Curations ｜ 物',
      descZh: '物理器物设计、工业原型以及触感材料的实体探寻。',
      descEn: 'A portfolio of physical creations, tangible models and material studies.',
      patternClass: 'felt-objects-pattern',
      accentColor: 'bg-[#5c6f68]',
      textColor: 'text-[#e2e8f0]',
    },
    images: {
      titleZh: '影 ｜ Frames & Images',
      titleEn: 'Optical Images ｜ 影',
      descZh: '用黑白中大画幅工艺和微距记录建筑 voids、材料微观及光影切片。',
      descEn: 'Capturing sensory architectural absences, micro textures, and refraction scripts on film.',
      patternClass: 'felt-images-pattern',
      accentColor: 'bg-[#df9e2c]',
      textColor: 'text-[#2e2617]',
    },
    fragments: {
      titleZh: '碎 ｜ Notes & Fragments',
      titleEn: 'Fragments & Chips ｜ 碎',
      descZh: '写在砂纸、草图纸里的灵感流、GLSL着色器断片和工艺碎语。',
      descEn: 'Unfiltered procedural streams, GLSL shaders, material boards, and craftsman thoughts.',
      patternClass: 'felt-fragments-pattern',
      accentColor: 'bg-[#9c3f3a]',
      textColor: 'text-[#fdf2f2]',
    },
    notes: {
      titleZh: '拟 ｜ AI & Generative Simulation',
      titleEn: 'Generative Mimicry ｜ 拟',
      descZh: '基于人工智能、机器学习与机器触觉共生演化的探索作品、设计随笔与履历。',
      descEn: 'Critiques on generative AI systems, symbiotic machine haptics, other architectural concepts, and curriculum vitae.',
      patternClass: 'felt-notes-pattern',
      accentColor: 'bg-[#2b3a30]',
      textColor: 'text-[#f1f5f2]',
    },
    experiments: {
      titleZh: '试 ｜ Active Experiments',
      titleEn: 'Active Experiments ｜ 试',
      descZh: '可现场玩的流体力学重力波画布、五音共鸣频率波合成引擎。',
      descEn: 'Real-time playable gravitational fluid simulations and pure pentatonic Web Audio synthesis.',
      patternClass: 'felt-experiments-pattern',
      accentColor: 'bg-[#1e293b]',
      textColor: 'text-[#e2e8f0]',
    }
  };

  const currentMeta = meta[categoryId];

  const renderContent = () => {
    switch(categoryId) {
      case 'objects':
        return <ObjectsView isEn={isEn} />;
      case 'images':
        return <ImagesView isEn={isEn} />;
      case 'fragments':
        return <FragmentsView isEn={isEn} />;
      case 'notes':
        return <NotesView isEn={isEn} />;
      case 'experiments':
        return <ExperimentsView isEn={isEn} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 md:p-10 lg:p-14 overflow-hidden">
        {/* Semi-transparent Glass Backdrop */}
        <motion.div
          id="viewer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#141413]/60 backdrop-blur-md cursor-pointer"
        />

        {/* Dynamic Center Unfolding Paint Scroll (画卷) */}
        <motion.div
          id="viewer-panel"
          initial={{ scaleX: 0.1, scaleY: 0.85, opacity: 0 }}
          animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
          exit={{ scaleX: 0.1, scaleY: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 140 }}
          style={{ transformOrigin: 'center' }}
          className="relative w-full max-w-5xl h-[85vh] bg-[#FBF6EE] border-[3.8px] border-black rounded-2xl flex flex-col justify-between filter drop-shadow-[8px_8px_0_rgba(0,0,0,1)] overflow-hidden"
        >
          {/* Decorative Left Scroll Axis (Wood roller) */}
          <div className="absolute -left-3.5 top-3 bottom-3 w-5 bg-gradient-to-r from-amber-900 to-amber-700 border-[3px] border-black rounded-full z-40 select-none pointer-events-none hidden md:block">
            <div className="absolute -top-3.5 -left-[4.5px] w-7 h-4 bg-amber-950 border-[2.5px] border-black rounded-sm" />
            <div className="absolute -bottom-3.5 -left-[4.5px] w-7 h-4 bg-amber-950 border-[2.5px] border-black rounded-sm" />
          </div>

          {/* Decorative Right Scroll Axis (Wood roller) */}
          <div className="absolute -right-3.5 top-3 bottom-3 w-5 bg-gradient-to-r from-amber-700 to-amber-900 border-[3px] border-black rounded-full z-40 select-none pointer-events-none hidden md:block">
            <div className="absolute -top-3.5 -right-[4.5px] w-7 h-4 bg-amber-950 border-[2.5px] border-black rounded-sm" />
            <div className="absolute -bottom-3.5 -right-[4.5px] w-7 h-4 bg-amber-950 border-[2.5px] border-black rounded-sm" />
          </div>

          {/* Background fine paper pattern decoration */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none z-0" />

          {/* 1. Curated Tactile Header with Thick Borders */}
          <div className="relative w-full overflow-hidden shrink-0 border-b-[3.5px] border-black bg-white/70 z-10">
            {/* Background color block for theme accent */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 ${currentMeta.accentColor}`} />

            {/* Content info layout */}
            <div className="relative z-10 p-5 md:p-7 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="inline-flex items-center gap-1.5 font-mono text-[9px] text-white bg-black uppercase px-2 py-0.5 rounded-sm font-black tracking-widest leading-none">
                  <FolderOpen className="w-3 h-3 stroke-[3px]" />
                  <span>Drawer // {categoryId.toUpperCase()}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-stone-900 tracking-tight leading-tight mt-1.5">
                  {isEn ? currentMeta.titleEn : currentMeta.titleZh}
                </h2>
                <p className="text-xs text-stone-600 leading-relaxed font-sans font-bold">
                  {isEn ? currentMeta.descEn : currentMeta.descZh}
                </p>
              </div>

              {/* Functional Controls right */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                {/* Language translation key */}
                <button
                  id="toggle-lang-btn"
                  onClick={onToggleLang}
                  className="flex items-center gap-1.5 text-[11px] font-mono font-black text-black bg-white hover:bg-amber-50 border-[2.5px] border-black px-3 py-1.5 rounded-xl cursor-pointer transition-all shadow-none filter drop-shadow-[2.5px_2.5px_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:drop-shadow-[0.5px_0.5px_0_rgba(0,0,0,1)]"
                >
                  <Globe2 className="w-3.5 h-3.5 stroke-[2.5px]" />
                  <span>{isEn ? 'ZH' : 'EN'}</span>
                </button>

                {/* Close Drawer Button */}
                <button
                  id="close-drawer-btn"
                  onClick={onClose}
                  className="flex items-center justify-center w-9 h-9 rounded-xl border-[2.5px] border-black bg-white text-black hover:bg-red-50 cursor-pointer transition-all filter drop-shadow-[2.5px_2.5px_0_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:drop-shadow-[0.5px_0.5px_0_rgba(0,0,0,1)]"
                  title="Close Drawer"
                >
                  <X className="w-4 h-4 stroke-[3px]" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Scrollable Body Contents Details */}
          <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8 bg-[#FBF6EE]/40 relative z-10 select-text">
            {renderContent()}
          </div>

          {/* 3. Bottom wooden rod border bar */}
          <div className="h-11 border-t-[3.5px] border-black bg-white/80 flex items-center justify-between px-6 md:px-8 shrink-0 text-[10px] font-mono font-black text-black select-none z-10">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600 stroke-[3px]" />
              {isEn ? 'ROOM 03 — MULTIMEDIAL CABINET SCROLL' : '3号展厅 — 展陈抽屉画卷'}
            </span>
            <span>{categoryId.toUpperCase()} // DEPLOYED-OUT-OF-BOX</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
