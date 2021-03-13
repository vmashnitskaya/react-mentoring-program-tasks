import React, { FunctionComponent } from 'react';
import ResultActionBar from '../ResultActionBar/ResultActionBar';
import Results from '../Results/Results';
import { SortData } from '../../HomePage';
import NoFilmsFound from '../../NoFilmsFound/NoFilmsFound';
import { FilmData } from '../../../../staticData/filmData';
import './ResultArea.scss';

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
    handleDelete: (index: number) => void;
    handleEditSave: (data: FilmData, index: number) => void;
}

const ResultArea: FunctionComponent<ResultAreaProps> = ({
    handleGenreChange,
    data,
    handleSortPerformed,
    sortData,
    filter,
    handleDelete,
    handleEditSave,
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
            {data && data.length ? (
                <Results
                    filmsData={data}
                    handleDelete={handleDelete}
                    handleEditSave={handleEditSave}
                />
            ) : (
                <NoFilmsFound />
            )}
        </div>
    );
};

export default ResultArea;
