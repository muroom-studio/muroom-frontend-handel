import { NextPage } from 'next';

import ErrorTemplate from '@/components/common/error-template';

const NotFound: NextPage = () => {
  return <ErrorTemplate status={404} />;
};

export default NotFound;
