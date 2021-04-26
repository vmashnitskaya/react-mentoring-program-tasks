import React, { FunctionComponent } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ResultActionBar from '../ResultActionBar/ResultActionBar';
import Results from '../Results/Results';
import { FilmData } from '../../../filmData';
import './ResultArea.scss';
import { SortData, resetErrorState } from '../../../../../redux/data/dataSlice';
import Loader from '../../../common/Loader/Loader';
import {useHistory} from "react-router";

interface ResultAreaProps {
    data: Array<FilmData> | undefined;
    sortData: SortData;
    filter: string;
}

const ResultArea: FunctionComponent<ResultAreaProps> = ({
    data,
    sortData,
    filter,
}): JSX.Element => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.data.loading);
    const error = useSelector((state) => state.data.error);
    let history = useHistory();

    if (error) {
        dispatch(resetErrorState());
        history.push("/not_found");
    }

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

                    {data && data.length && <Results
                        filmsData={data}
                    />}

                </>
            )}
        </div>
    );
};

export default ResultArea;
