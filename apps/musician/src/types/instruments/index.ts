export type InstrumentType =
  | 'VOCAL'
  | 'GUITAR'
  | 'BASS'
  | 'KEYBOARD'
  | 'DRUM'
  | 'PIANO'
  | 'BRASS_WIND'
  | 'WOOD_WIND'
  | 'STRINGS'
  | 'VOCAL_PERFORMANCE'
  | 'KR_TRADITIONAL'
  | 'MIDI'
  | 'ETC';

export interface InstrumentItem {
  id: number;
  code: InstrumentType;
  description: string;
}

export type InstrumentsResponse = InstrumentItem[];
