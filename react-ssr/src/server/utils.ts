import {SortData} from "../redux/data/dataSlice";
import tabsHeaders from "../client/staticData/tabsHeaders";

export const getQueryParams = (queryParams) => {
    const query: {
        searchValue: string;
        filterValue: string;
        sortData: SortData;
    } = {
        filterValue: undefined,
        searchValue: undefined,
        sortData: undefined
    };

    if(queryParams.filter && tabsHeaders.includes((queryParams.filter as string))) {
        query.filterValue = queryParams.filter as string;
    }

    if(queryParams.search) {
        query.searchValue = queryParams.search as string;
    }

    if(queryParams.sort && queryParams.sortDirection) {
        if((queryParams.sortDirection === 'asc' || queryParams.sortDirection === 'desc')
            && (queryParams.sort === 'title' || queryParams.sort === 'release_date')){
            query.sortData = {
                title: queryParams.sort === 'title' ? 'Title' : 'Release date',
                value: queryParams.sort,
                direction: queryParams.sortDirection
            }
        }
    }

    return query;
}
