import React, { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setBaseData,
    setData,
    setDefaultSortData,
    setDefaultFilterValue,
    setDefaultSearchValue,
    setCurrentFilmDisplayed,
} from '../../redux/data/dataSlice';
import SearchArea from './SearchArea';
import ResultArea from './ResultArea';
import filmsData, { FilmData } from '../../staticData/filmData';
import MovieDetails from './MovieDetails';

export interface SortData {
    title: string;
    direction: string;
    value: string;
}

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

    const handleFiler = (
        dataToFilter: Array<FilmData>,
        filterToApply: string
    ): Array<FilmData> => {
        return filterToApply.toLowerCase() === 'all'
            ? dataToFilter
            : dataToFilter.filter((film) =>
                  film.genres.some((genre) =>
                      genre.toLowerCase().includes(filterToApply.toLowerCase())
                  )
              );
    };

    const handleSort = (
        dataToSort: Array<FilmData>,
        value: string,
        direction: string
    ): Array<FilmData> => {
        return dataToSort.sort((a, b) => {
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
    };

    const handleSearch = (dataToSearch: Array<FilmData>, sValue: string) => {
        return !sValue
            ? dataToSearch
            : dataToSearch.filter((film) => {
                  return film.title
                      .toLowerCase()
                      .includes(sValue.toLowerCase());
              });
    };

    useEffect(() => {
        if (baseData) {
            const { value, direction } = sortData;
            const searchData = handleSearch(baseData, searchValue);
            const filteredData = handleFiler(searchData, filterValue);

            const sortedData = handleSort(
                filteredData.slice(),
                value,
                direction
            );
            dispatch(setData(sortedData));
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
