import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import SearchArea from './SearchArea';
import ResultArea from './ResultArea';
import Footer from '../Footer';
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

const HomePage: FunctionComponent = (): JSX.Element => {
    const [baseData, setBaseData] = useState<Array<FilmData> | undefined>();
    const [data, setData] = useState<Array<FilmData> | undefined>();
    const [sortData, setSortData] = useState<SortData>(DEFAULT_SORT);
    const [filter, setFilter] = useState<string>('All');

    useEffect(() => {
        setBaseData(filmsData);
    }, []);

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

    useEffect(() => {
        if (baseData) {
            const { value, direction } = sortData;
            const filteredData = handleFiler(baseData, filter);

            const sortedData = handleSort(
                filteredData.slice(),
                value,
                direction
            );
            setData(sortedData);
        } else {
            setData(undefined);
        }
    }, [sortData, baseData, filter]);

    const handleSortPerformed = useCallback(
        (title: string, direction: string, value: string) => {
            if (direction !== sortData.direction || title !== sortData.title) {
                setSortData({ ...sortData, direction, title, value });
            }
        },
        [sortData]
    );

    return (
        <div className="home-page">
            <SearchArea />
            <ResultArea
                handleGenreChange={setFilter}
                data={data}
                handleSortPerformed={handleSortPerformed}
                sortData={sortData}
                filter={filter}
            />
            <Footer />
        </div>
    );
};

export default HomePage;
