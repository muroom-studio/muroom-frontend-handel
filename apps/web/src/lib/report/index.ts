import { ReportReasonResponseProps } from '@/types/report';
import { customFetch } from '@/utils/customFetch';

export const getReportReasons = async () => {
  const responseData = await customFetch<ReportReasonResponseProps>(
    '/report-reasons',
    {
      method: 'GET',
    },
  );

  return responseData;
};
