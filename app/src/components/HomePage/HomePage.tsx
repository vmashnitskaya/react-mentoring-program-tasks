import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setDefaultSortData,
    setDefaultFilterValue,
    setDefaultSearchValue,
    setCurrentFilmDisplayed,
    fetchSortedFilteredSearchedMovies,
} from '../../redux/data/dataSlice';
import SearchArea from './SearchArea';
import ResultArea from './ResultArea';
import { FilmData } from '../filmData';
import MovieDetails from './MovieDetails';

const HomePage: FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data.data);
    const sortData = useSelector((state) => state.data.sortData);
    const filterValue = useSelector((state) => state.data.filterValue);
    const searchValue = useSelector((state) => state.data.searchValue);
    const currentFilmDisplayed = useSelector(
        (state) => state.data.currentFilmDisplayed
    );

    useEffect(() => {
        dispatch(setDefaultSearchValue());
        dispatch(setDefaultFilterValue());
        dispatch(setDefaultSortData());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            fetchSortedFilteredSearchedMovies({
                searchValue,
                filterValue,
                sortData,
            })
        );
    }, [sortData, filterValue, searchValue, dispatch]);

    const handleMovieOpen = (film: FilmData) => {
        dispatch(setCurrentFilmDisplayed(film));
    };

    return (
        <>
            {currentFilmDisplayed ? (
                <MovieDetails currentFilmDisplayed={currentFilmDisplayed} />
            ) : (
                <SearchArea />
            )}

            <ResultArea
                data={data}
                sortData={sortData}
                filter={filterValue}
                handleMovieOpen={handleMovieOpen}
            />
        </>
    );
};

export default HomePage;
