export interface FilterOptionItem {
  code: string;
  description: string;
}

export interface StudioFilterOptionsResponseProps {
  floorOptions: FilterOptionItem[];
  restroomOptions: FilterOptionItem[];
  studioCommonOptions: FilterOptionItem[];
  studioIndividualOptions: FilterOptionItem[];
  unavailableInstrumentOptions: FilterOptionItem[];
}
