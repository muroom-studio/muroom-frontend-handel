export interface GalleryImages {
  main: string[];
  building: string[];
  room: string[];
}

export type GalleryCategory = keyof GalleryImages;
export type GalleryViewMode = 'NONE' | 'GROUP' | 'SINGLE';

export const CATEGORY_TITLES: Record<GalleryCategory, string> = {
  main: '대표사진',
  building: '건물사진',
  room: '방사진',
};
