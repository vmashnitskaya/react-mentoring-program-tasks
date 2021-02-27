import React, { FunctionComponent } from 'react';
import ResultActionBar from './ResultActionBar';
import Results from './Results';
import filmsData from '../../../staticData/filmData';
import './ResultArea.scss';

const ResultArea: FunctionComponent = () => {
    return (
        <div className="result-area wrapper">
            <ResultActionBar />
            <div className="result-counter">
                <span className="counter">{filmsData.length}</span>
                <span className="found">movies found</span>
            </div>
            <Results filmsData={filmsData} />
        </div>
    );
};

export default ResultArea;
