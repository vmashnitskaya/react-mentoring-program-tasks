import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setBaseData,
    setData,
    setDefaultSortData,
    setDefaultFilterValue,
    setDefaultSearchValue,
    setCurrentFilmDisplayed,
    handleBaseDataSearch,
    SortData,
    handleDataSort,
    handleDataFiler,
} from '../../redux/data/dataSlice';
import SearchArea from './SearchArea';
import ResultArea from './ResultArea';
import filmsData, { FilmData } from '../../staticData/filmData';
import MovieDetails from './MovieDetails';

interface HomePageProps {
    handleEverythingOkChange: (value: boolean) => void;
}

const HomePage: FunctionComponent<HomePageProps> = ({
    handleEverythingOkChange,
}): JSX.Element => {
    const dispatch = useDispatch();
    const baseData: Array<FilmData> = useSelector(
        (state) => state.data.baseData
    );
    const data: Array<FilmData> | undefined = useSelector(
        (state) => state.data.data
    );
    const sortData: SortData = useSelector((state) => state.data.sortData);
    const filterValue: string = useSelector((state) => state.data.filterValue);
    const searchValue: string = useSelector((state) => state.data.searchValue);
    const currentFilmDisplayed: FilmData | undefined = useSelector(
        (state) => state.data.currentFilmDisplayed
    );

    useEffect(() => {
        let newFilmsData: Array<FilmData> = [];

        try {
            newFilmsData = filmsData;
        } catch (e) {
            handleEverythingOkChange(false);
        }

        dispatch(setBaseData(newFilmsData));
        dispatch(setDefaultSearchValue());
        dispatch(setDefaultFilterValue());
        dispatch(setDefaultSortData());
    }, [handleEverythingOkChange, dispatch]);

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
