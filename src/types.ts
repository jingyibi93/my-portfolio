/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryId = 'objects' | 'images' | 'fragments' | 'notes' | 'experiments';

export interface BaseItem {
  id: string;
  titleZh: string;
  titleEn: string;
  date: string;
  descriptionZh: string;
  descriptionEn: string;
  galleryImages?: string[];
  image?: string;
  videoUrl?: string;
}

export interface ObjectItem extends BaseItem {
  materialsZh: string;
  materialsEn: string;
  dimensions: string;
  image: string; // Unsplash url
  detailsZh: string[];
  detailsEn: string[];
}

export interface ImageItem extends BaseItem {
  locationZh: string;
  locationEn: string;
  camera: string;
  image: string; // Unsplash url
  // Optional custom artist parameters to avoid modifying core code
  typeZh?: string;
  typeEn?: string;
  instructorZh?: string;
  instructorEn?: string;
  mediumZh?: string;
  mediumEn?: string;
}

export interface FragmentItem {
  id: string;
  type: string;
  titleZh: string;
  titleEn: string;
  contentZh: string;
  contentEn: string;
  metadata?: string; // e.g. code language, color hexes, material parameters
  galleryImages?: string[];
  partner?: string;
  date?: string;
  locationZh?: string;
  locationEn?: string;
  image?: string;
  instructorZh?: string;
  instructorEn?: string;
  mediumZh?: string;
  mediumEn?: string;
  camera?: string;
}

export interface NoteItem extends BaseItem {
  category: string;
  contentZh: string;
  contentEn: string;
  readTime: string;
}

export interface ExperimentItem extends BaseItem {
  type: string;
  status?: string;
  interactionGuideZh?: string;
  interactionGuideEn?: string;
  partner?: string;
  instructorZh?: string;
  instructorEn?: string;
  locationZh?: string;
  locationEn?: string;
  image?: string;
  videoUrl?: string;
}

export interface CVSection {
  titleZh: string;
  titleEn: string;
  items: {
    period: string;
    organizationZh: string;
    organizationEn: string;
    roleZh: string;
    roleEn: string;
    detailsZh?: string[];
    detailsEn?: string[];
  }[];
}
