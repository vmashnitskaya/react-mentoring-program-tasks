import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import ResultActionBar from '../ResultActionBar/ResultActionBar';
import Results from '../Results/Results';
import NoFilmsFound from '../../NoFilmsFound/NoFilmsFound';
import { FilmData } from '../../../filmData';
import './ResultArea.scss';
import { SortData } from '../../../../redux/data/dataSlice';
import Loader from '../../../common/Loader/Loader';

interface ResultAreaProps {
    data: Array<FilmData> | undefined;
    sortData: SortData;
    filter: string;
    handleMovieOpen: (data: FilmData) => void;
}

const ResultArea: FunctionComponent<ResultAreaProps> = ({
    data,
    sortData,
    filter,
    handleMovieOpen,
}): JSX.Element => {
    const loading = useSelector((state) => state.data.loading);
    return (
        <div className="result-area wrapper">
            {loading ? (
                <Loader />
            ) : (
                <>
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
                        />
                    ) : (
                        <NoFilmsFound />
                    )}
                </>
            )}
        </div>
    );
};

export default ResultArea;
