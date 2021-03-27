import { createSlice } from '@reduxjs/toolkit';
import filmsData, { FilmData } from '../../staticData/filmData';

export interface SortData {
    title: string;
    direction: string;
    value: string;
}

interface DataSliceInterface {
    baseData: Array<FilmData>;
    data: Array<FilmData>;
    sortData: SortData;
    filterValue: string;
    searchValue: string;
    currentFilmDisplayed: FilmData | undefined;
}

const DEFAULT_SORT = {
    title: 'Release date',
    direction: 'ascending',
    value: 'release_date',
};

const INITIAL_STATE: DataSliceInterface = {
    baseData: filmsData,
    data: [],
    sortData: DEFAULT_SORT,
    filterValue: 'All',
    searchValue: '',
    currentFilmDisplayed: undefined,
};

export const dataSlice = createSlice({
    name: 'data',
    initialState: INITIAL_STATE,
    reducers: {
        setBaseData: (state, action) => {
            state.baseData = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setSortData: (state, action) => {
            state.sortData = action.payload;
        },
        setDefaultSortData: (state) => {
            state.sortData = DEFAULT_SORT;
        },
        setFilterValue: (state, action) => {
            state.filterValue = action.payload;
        },
        setDefaultFilterValue: (state) => {
            state.filterValue = 'All';
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setDefaultSearchValue: (state) => {
            state.searchValue = '';
        },
        setCurrentFilmDisplayed: (state, action) => {
            state.currentFilmDisplayed = action.payload;
        },
        resetCurrentFilmDisplayed: (state) => {
            state.currentFilmDisplayed = undefined;
        },
        handleBaseDataSearch: (state, action) => {
            if (action.payload.value) {
                state.data = state.baseData.filter((film) => {
                    return film.title
                        .toLowerCase()
                        .includes(action.payload.value.toLowerCase());
                });
            } else {
                state.data = state.baseData;
            }
        },
        handleDataFiler: (state, action) => {
            const filterToApply = action.payload.value;
            state.data =
                filterToApply.toLowerCase() === 'all'
                    ? state.data
                    : state.data.filter((film) =>
                          film.genres.some((genre) =>
                              genre
                                  .toLowerCase()
                                  .includes(filterToApply.toLowerCase())
                          )
                      );
        },
        handleDataSort: (state, action) => {
            const { value, direction } = action.payload;
            const dataToSort = state.data.slice();

            state.data = dataToSort.sort((a, b) => {
                let valueA = a[value as keyof FilmData];
                let valueB = b[value as keyof FilmData];
                const directionNumber = direction === 'ascending' ? 1 : -1;

                if (value === 'release_date') {
                    valueA = Number((valueA as string).slice(0, 4));
                    valueB = Number((valueB as string).slice(0, 4));
                }

                if (valueA < valueB) {
                    return -1 * directionNumber;
                }
                if (valueA > valueB) {
                    return 1 * directionNumber;
                }
                return 0;
            });
        },
    },
});

export const {
    setBaseData,
    setData,
    setSortData,
    setDefaultSortData,
    setFilterValue,
    setDefaultFilterValue,
    setSearchValue,
    setDefaultSearchValue,
    setCurrentFilmDisplayed,
    resetCurrentFilmDisplayed,
    handleBaseDataSearch,
    handleDataFiler,
    handleDataSort,
} = dataSlice.actions;

export default dataSlice.reducer;
