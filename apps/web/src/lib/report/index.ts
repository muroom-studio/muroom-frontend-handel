import { ReportReasonResponseProps } from '@/types/report';
import { customFetch } from '@/utils/customFetch';

export const getReportReason = async () => {
  const responseData = await customFetch<ReportReasonResponseProps>(
    '/report-reason',
    {
      method: 'GET',
    },
  );

  return responseData;
};
