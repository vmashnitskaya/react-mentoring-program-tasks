import React, { FunctionComponent } from 'react';
import loadable from '@loadable/component';
const ErrorPage404 = loadable(() => import('../components/common/ErrorPage404/ErrorPage404'));

const ErrorPage: FunctionComponent = () => {
  return <ErrorPage404 />;
};

export default ErrorPage;
