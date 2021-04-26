import React, { FunctionComponent } from 'react';
import SearchArea from "../components/App/SearchArea";
import NoFilmsFound from "../components/common/NoFilmsFound/NoFilmsFound";

const MovieNotFound: FunctionComponent = () => {

  return (
      <>
          <SearchArea />
          <NoFilmsFound />
      </>
  );
};

export default MovieNotFound;
