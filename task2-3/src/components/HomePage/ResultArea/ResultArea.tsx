import React, { FunctionComponent } from 'react';
import ResultActionBar from './ResultActionBar';
import Results from './Results';
import { FilmData } from '../../../staticData/filmData';

import './ResultArea.scss';
import { SortData } from '../HomePage';

interface ResultAreaProps {
    handleGenreChange: (value: string) => void;
    data: Array<FilmData> | undefined;
    sortData: SortData;
    handleSortPerformed: (
        title: string,
        direction: string,
        value: string
    ) => void;
    filter: string;
}

const ResultArea: FunctionComponent<ResultAreaProps> = ({
    handleGenreChange,
    data,
    handleSortPerformed,
    sortData,
    filter,
}): JSX.Element => {
    return (
        <div className="result-area wrapper">
            <ResultActionBar
                onGenreChanged={handleGenreChange}
                onSortPerformed={handleSortPerformed}
                sortData={sortData}
                filter={filter}
            />
            <div className="result-counter">
                <span className="counter">
                    {data && data.length ? data.length : 0}
                </span>
                <span className="found">movies found</span>
            </div>
            {data && data.length ? <Results filmsData={data} /> : null}
        </div>
    );
};

export default ResultArea;
