import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setData,
    setDefaultSortData,
    setDefaultFilterValue,
    setDefaultSearchValue,
    setCurrentFilmDisplayed,
    handleBaseDataSearch,
    handleDataSort,
    handleDataFiler,
    fetchMovies,
} from '../../redux/data/dataSlice';
import SearchArea from './SearchArea';
import ResultArea from './ResultArea';
import { FilmData } from '../../staticData/filmData';
import MovieDetails from './MovieDetails';

const HomePage: FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const baseData = useSelector((state) => state.data.baseData);
    const data = useSelector((state) => state.data.data);
    const sortData = useSelector((state) => state.data.sortData);
    const filterValue = useSelector((state) => state.data.filterValue);
    const searchValue = useSelector((state) => state.data.searchValue);
    const currentFilmDisplayed = useSelector(
        (state) => state.data.currentFilmDisplayed
    );

    useEffect(() => {
        dispatch(fetchMovies());
        dispatch(setDefaultSearchValue());
        dispatch(setDefaultFilterValue());
        dispatch(setDefaultSortData());
    }, [dispatch]);

    useEffect(() => {
        if (baseData) {
            dispatch(handleBaseDataSearch({ value: searchValue }));
            dispatch(handleDataFiler({ value: filterValue }));
            dispatch(handleDataSort(sortData));
        } else {
            dispatch(setData(undefined));
        }
    }, [sortData, baseData, filterValue, searchValue, dispatch]);

    const handleDelete = (index: number) => {
        let newData = [];
        if (data) {
            const newArray = data.slice();
            newArray.splice(index, 1);
            newData = newArray;
        } else {
            newData = data;
        }
        dispatch(setData(newData));
    };

    const handleEditSave = (filmData: FilmData, index: number) => {
        let newData = [];

        if (data) {
            const newArray = data.slice();
            newArray.splice(index, 1, filmData);
            newData = newArray;
        } else {
            newData = data;
        }
        dispatch(setData(newData));
    };

    const handleNewMovieAdd = (filmData: FilmData) => {
        const newData = data ? [...data, filmData] : data;
        dispatch(setData(newData));
    };

    const handleMovieOpen = (film: FilmData) => {
        dispatch(setCurrentFilmDisplayed(film));
    };

    return (
        <>
            {currentFilmDisplayed ? (
                <MovieDetails currentFilmDisplayed={currentFilmDisplayed} />
            ) : (
                <SearchArea handleNewMovieAdd={handleNewMovieAdd} />
            )}

            <ResultArea
                data={data}
                sortData={sortData}
                filter={filterValue}
                handleDelete={handleDelete}
                handleEditSave={handleEditSave}
                handleMovieOpen={handleMovieOpen}
            />
        </>
    );
};

export default HomePage;
