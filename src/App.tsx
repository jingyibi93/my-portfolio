/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CategoryId } from './types';
import GallerySpace from './components/GallerySpace';
import DrawerViewer from './components/DrawerViewer';

export default function App() {
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId | null>(null);
  const [isEn, setIsEn] = useState<boolean>(false); // Defaults to beautiful Chinese layout, supports full English toggle

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
      {/* 1. Main Ambient Exhibition Space with the new integrated Floating Showcase detail state */}
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
