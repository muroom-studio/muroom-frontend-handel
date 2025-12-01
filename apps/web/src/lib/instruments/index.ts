import { InstrumentsResponse } from '@/types/instruments';
import { customFetch } from '@/utils/customFetch';

export const getInstruments = async () => {
  const responseData = await customFetch<InstrumentsResponse>('/instruments', {
    method: 'GET',
  });

  return responseData;
};
