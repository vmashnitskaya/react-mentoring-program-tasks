import React, {FunctionComponent, PureComponent} from 'react';
import SearchArea from "../components/App/SearchArea";
import ResultArea from "../components/App/ResultArea";
import {FilmData} from "../components/filmData";
import {SortData} from "../../redux/data/dataSlice";

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
