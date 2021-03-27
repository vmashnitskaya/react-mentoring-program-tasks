import React, { FunctionComponent } from 'react';
import ResultActionBar from '../ResultActionBar/ResultActionBar';
import Results from '../Results/Results';
import NoFilmsFound from '../../NoFilmsFound/NoFilmsFound';
import { FilmData } from '../../../../staticData/filmData';
import './ResultArea.scss';
import { SortData } from '../../../../redux/data/dataSlice';

interface ResultAreaProps {
    data: Array<FilmData> | undefined;
    sortData: SortData;
    filter: string;
    handleDelete: (index: number) => void;
    handleEditSave: (data: FilmData, index: number) => void;
    handleMovieOpen: (data: FilmData) => void;
}

const ResultArea: FunctionComponent<ResultAreaProps> = ({
    data,
    sortData,
    filter,
    handleDelete,
    handleEditSave,
    handleMovieOpen,
}): JSX.Element => {
    return (
        <div className="result-area wrapper">
            <ResultActionBar sortData={sortData} filter={filter} />
            <div className="result-counter">
                <span className="counter">
                    {data && data.length ? data.length : 0}
                </span>
                <span className="found">movies found</span>
            </div>
            {data && data.length ? (
                <Results
                    handleMovieOpen={handleMovieOpen}
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
