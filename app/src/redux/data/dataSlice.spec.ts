import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import store from '../store';
import * as movieHttp from "./movieHttp";
import {
    setSortData, setDefaultSortData, DEFAULT_SORT, setFilterValue, setDefaultFilterValue,
    DEFAULT_FILTER_VALUE, setSearchValue, setDefaultSearchValue, setCurrentFilmDisplayed, resetErrorState,
    fetchSortedFilteredSearchedMovies, INITIAL_STATE, updateMovie, deleteMovie, addMovie
} from './dataSlice';
import { updatedSortValue, updatedCurrentFilmDisplayed, fetchedData } from "./testData";

jest.mock('./movieHttp');
const mockStore = configureMockStore([thunk]);

describe('test sync actions', () =>{
    test('test setSortData', () => {
        store.dispatch(setSortData(updatedSortValue));

        const newSortData = store.getState().data.sortData;
        expect(newSortData).toHaveProperty('direction', 'desc');
    });

    test('test setDefaultSortData', () => {
        store.dispatch(setDefaultSortData());

        const newSortData = store.getState().data.sortData;
        expect(newSortData).toEqual(DEFAULT_SORT);
    });

    test('test setFilterValue', () => {
        const newFilterValue = 'Drama';
        store.dispatch(setFilterValue(newFilterValue));

        const newFilter = store.getState().data.filterValue;
        expect(newFilter).toBe(newFilterValue);
    });

    test('test setDefaultFilterValue', () => {
        store.dispatch(setDefaultFilterValue());

        const newFilter = store.getState().data.filterValue;
        expect(newFilter).toBe(DEFAULT_FILTER_VALUE);
    });

    test('test setSearchValue', () => {
        const newSearchValue = 'Search value';
        store.dispatch(setSearchValue(newSearchValue));

        const newSearch = store.getState().data.searchValue;
        expect(newSearch).toBe(newSearchValue);
    });

    test('test setDefaultSearchValue', () => {
        store.dispatch(setDefaultSearchValue());

        const newSearch = store.getState().data.searchValue;
        expect(newSearch).toBeFalsy();
    });

    test('test setCurrentFilmDisplayed', () => {
        store.dispatch(setCurrentFilmDisplayed(updatedCurrentFilmDisplayed));

        const newCurrent = store.getState().data.currentFilmDisplayed;
        expect(newCurrent).toEqual(updatedCurrentFilmDisplayed);
    });

    test('test resetErrorState', () => {
        store.dispatch(resetErrorState());

        const newError = store.getState().data.error;
        expect(newError).toBeUndefined();
    });
});

describe('test async actions', () =>{
    const mockedStore = mockStore(INITIAL_STATE);

    test('test fetchSortedFilteredSearchedMovies', async () => {
        (movieHttp.fetchMovies as any).mockImplementation(() => Promise.resolve(fetchedData));

        const expectedActions = ["data/fetchCustomData/pending", 'data/fetchCustomData/fulfilled'];

        return (mockedStore as any).dispatch(fetchSortedFilteredSearchedMovies({sortData: DEFAULT_SORT, filterValue: '', searchValue: ''})).then(() => {
            expect(mockedStore.getActions().map((el) =>  el.type)).toEqual(expectedActions);
        })
    });

    test('test updateMovie', async () => {
        (movieHttp.fetchMovies as any).mockImplementationOnce(() => Promise.resolve());

        const expectedActions = ["data/updateMovie/pending", "data/updateMovie/fulfilled"];

        return (mockedStore as any).dispatch(updateMovie(fetchedData.data[0])).then(() => {
            const tested = mockedStore.getActions().map((el) =>  el.type);
            expect(tested).toContain(expectedActions[0]);
            expect(tested).toContain(expectedActions[1]);
        })
    });

    test('test deleteMovie reject', async () => {
        (movieHttp.fetchMovies as any).mockImplementationOnce(() => Promise.reject());

        const expectedActions = ["data/deleteMovie/pending", "data/deleteMovie/rejected"];

        return (mockedStore as any).dispatch(deleteMovie(fetchedData.data[0].id)).then(() => {
            const tested = mockedStore.getActions().map((el) =>  el.type);
            expect(tested).toContain(expectedActions[0]);
            expect(tested).toContain(expectedActions[1]);
        })
    });

    test('test addMovie reject', async () => {
        (movieHttp.fetchMovies as any).mockImplementationOnce(() => Promise.reject());

        const expectedActions = ["data/addMovie/pending", "data/addMovie/rejected"];

        return (mockedStore as any).dispatch(addMovie(fetchedData.data[0])).then(() => {
            const tested = mockedStore.getActions().map((el) =>  el.type);
            expect(tested).toContain(expectedActions[0]);
            expect(tested).toContain(expectedActions[1]);
        })
    });
})
