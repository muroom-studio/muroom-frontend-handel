import { create } from 'zustand';

import { MusiciansRegisterRequestProps } from '@/types/musicians';

interface MusicianStoreProps {
  dto: MusiciansRegisterRequestProps;
  setRegisterDTO: (dto: Partial<MusiciansRegisterRequestProps>) => void;
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
