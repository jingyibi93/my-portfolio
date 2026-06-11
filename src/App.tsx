/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CategoryId } from './types';
import GallerySpace from './components/GallerySpace';
import DrawerViewer from './components/DrawerViewer';
import MuseumEntrance from './components/MuseumEntrance';

export default function App() {
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId | null>(null);
  const [isEn, setIsEn] = useState<boolean>(false); // Defaults to beautiful Chinese layout, supports full English toggle
  const [entered, setEntered] = useState<boolean>(false);

  const handleOpenDrawer = (categoryId: CategoryId) => {
    setActiveCategoryId(categoryId);
  };

  const handleCloseDrawer = () => {
    setActiveCategoryId(null);
  };

  const handleToggleLang = () => {
    setIsEn(prev => !prev);
  };

  return (
    <div className="w-full min-h-screen bg-white text-stone-900 overflow-hidden relative selection:bg-stone-200 selection:text-stone-900">
      {/* 1. Splash Page Entrance Overlay */}
      <AnimatePresence mode="wait">
        {!entered && (
          <motion.div
            key="entrance-overlay"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              filter: 'blur(18px)', 
              scale: 1.04,
              transition: { duration: 0.95, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[100]"
          >
            <MuseumEntrance 
              onEnter={() => setEntered(true)}
              isEn={isEn}
              onToggleLang={handleToggleLang}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Ambient Exhibition Space with the integrated Floating Showcase detail state */}
      <GallerySpace 
        onOpenDrawer={handleOpenDrawer}
        activeCategoryId={activeCategoryId}
        onCloseDrawer={handleCloseDrawer}
        isEn={isEn}
        onToggleLang={handleToggleLang}
      />
    </div>
  );
}
