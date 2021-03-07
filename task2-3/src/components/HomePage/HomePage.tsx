import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import SearchArea from './SearchArea';
import ResultArea from './ResultArea';
import filmsData, { FilmData } from '../../staticData/filmData';

const DEFAULT_SORT = {
    title: 'Release date',
    direction: 'ascending',
    value: 'release_date',
};

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
    const [baseData, setBaseData] = useState<Array<FilmData> | undefined>();
    const [data, setData] = useState<Array<FilmData> | undefined>();
    const [sortData, setSortData] = useState<SortData>(DEFAULT_SORT);
    const [filterValue, setFilterValue] = useState<string>('All');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        let newFilmsData: Array<FilmData> = [];

        try {
            newFilmsData = filmsData;
        } catch (e) {
            handleEverythingOkChange(false);
        }

        setBaseData(newFilmsData);
        setSearchValue('');
        setFilterValue('All');
        setSortData(DEFAULT_SORT);
    }, [handleEverythingOkChange]);

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
            setData(sortedData);
        } else {
            setData(undefined);
        }
    }, [sortData, baseData, filterValue, searchValue]);

    const handleSortPerformed = useCallback(
        (title: string, direction: string, value: string) => {
            if (direction !== sortData.direction || title !== sortData.title) {
                setSortData({ ...sortData, direction, title, value });
            }
        },
        [sortData]
    );

    const handleDelete = (index: number) => {
        setData((prevState) => {
            if (prevState) {
                const newArray = prevState.slice();
                newArray.splice(index, 1);
                return newArray;
            }
            return prevState;
        });
    };

    const handleEditSave = (filmData: FilmData, index: number) => {
        setData((prevState) => {
            if (prevState) {
                const newArray = prevState.slice();
                newArray.splice(index, 1, filmData);
                return newArray;
            }
            return prevState;
        });
    };

    const handleNewMovieAdd = (filmData: FilmData) => {
        setData((prevState) =>
            prevState ? [...prevState, filmData] : prevState
        );
    };

    return (
        <>
            <SearchArea
                handleSearchPerformed={setSearchValue}
                handleNewMovieAdd={handleNewMovieAdd}
            />
            <ResultArea
                handleGenreChange={setFilterValue}
                data={data}
                handleSortPerformed={handleSortPerformed}
                sortData={sortData}
                filter={filterValue}
                handleDelete={handleDelete}
                handleEditSave={handleEditSave}
            />
        </>
    );
};

export default HomePage;
