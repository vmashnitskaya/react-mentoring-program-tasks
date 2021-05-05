import React, { FunctionComponent } from 'react';
import loadable from '@loadable/component';

const SearchArea = loadable(() => import('../components/App/SearchArea'));
const NoFilmsFound = loadable(() => import('../components/common/NoFilmsFound/NoFilmsFound'));

const MovieNotFound: FunctionComponent = () => {

  return (
      <>
          <SearchArea />
          <NoFilmsFound />
      </>
  );
};

export default MovieNotFound;
