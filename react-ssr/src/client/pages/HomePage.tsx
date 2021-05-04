import React, {FunctionComponent} from 'react';
import {FilmData} from "../components/filmData";
import {SortData} from "../../redux/data/dataSlice";
import loadable from '@loadable/component';

const SearchArea = loadable(() => import('../components/App/SearchArea'));
const ResultArea = loadable(() => import('../components/App/ResultArea'));

interface HomePageProps {
    data: Array<FilmData>;
    sortData: SortData;
    filter: string
}

const HomePage: FunctionComponent<HomePageProps> = ({data, sortData, filter}) => {
    return (
        <>
            <SearchArea/>
            <ResultArea data={data} sortData={sortData} filter={filter} />
        </>
    )
}

export default HomePage;
