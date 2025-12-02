import { create } from 'zustand';

import { MusicianRegisterRequestProps } from '@/types/musician';

interface MusicianStoreProps {
  dto: MusicianRegisterRequestProps;
  setRegisterDTO: (dto: Partial<MusicianRegisterRequestProps>) => void;
  resetRegisterDTO: () => void;
}

const initialMusicianState = {
  name: '',
  phoneNumber: '',
  detailJuso: '',
  juso: '',
  studioName: '',
  nickname: '',
  instrumentId: 0,
  termIds: [],
  signupToken: '',
};

export const useMusicianStore = create<MusicianStoreProps>((set) => ({
  dto: initialMusicianState,
  setRegisterDTO: (newDtoPart) =>
    set((state) => ({
      dto: {
        ...state.dto,
        ...newDtoPart,
      },
    })),
  resetRegisterDTO: () =>
    set(() => ({
      dto: initialMusicianState,
    })),
}));
