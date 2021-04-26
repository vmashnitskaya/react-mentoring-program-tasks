import React, {FunctionComponent, useEffect} from 'react';
import {
    DEFAULT_SORT,
    setQueryData,
} from '../../redux/data/dataSlice';
import SearchArea from "./SearchArea";
import ResultArea from "./ResultArea";
import {FilmData} from "../filmData";
import {SortData} from "../../redux/data/dataSlice";
import {useLocation} from "react-router";
import {useDispatch} from "react-redux";
import tabsHeaders from "../../staticData/tabsHeaders";

interface MainPageProps {
    data: Array<FilmData>;
    sort: SortData;
    filter: string;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const MainPage: FunctionComponent<MainPageProps> = ({data, sort, filter}) => {
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
      const queryParams: {[key: string]: any} = {
          sortData: DEFAULT_SORT,
          filterValue: 'All',
          searchValue: ''
      };

      if (query.get('sort') && query.get('sortDirection')) {
          const sort = (query.get('sort') as any).toLowerCase();
          const direction = (query.get('sortDirection') as any).toLowerCase();
          if((sort === 'title' || sort === 'release_date') && (direction === 'asc' || direction === 'desc')){
              queryParams.sortData = {
                  title: sort === 'title' ? 'Title' : 'Release Date',
                  direction: direction,
                  value: sort
              }
          }
      }

      if (query.get('filter')) {
          queryParams.filterValue = query.get('filter');
      }

      if (query.get('filter') && tabsHeaders.includes(query.get('filter') as string)) {
          queryParams.filterValue = query.get('filter');
      }

      if (query.get('search')) {
          queryParams.searchValue = query.get('search');
      }

      dispatch(setQueryData(queryParams));
  }, []);

  return (
      <>
          <SearchArea />
          <ResultArea
              data={data}
              sortData={sort}
              filter={filter}
          />
      </>
  );
};

export default MainPage;
