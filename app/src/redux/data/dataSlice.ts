import { createSlice } from '@reduxjs/toolkit';
import filmsData from '../../staticData/filmData';

const DEFAULT_SORT = {
    title: 'Release date',
    direction: 'ascending',
    value: 'release_date',
};

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        baseData: filmsData,
        data: [],
        sortData: DEFAULT_SORT,
        filterValue: 'All',
        searchValue: '',
        currentFilmDisplayed: undefined,
    },
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
} = dataSlice.actions;

export default dataSlice.reducer;
