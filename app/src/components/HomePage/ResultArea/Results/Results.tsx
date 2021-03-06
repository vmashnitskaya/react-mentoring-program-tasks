import React, { FunctionComponent } from 'react';
import FilmCard from '../FilmCard/FilmCard';
import { FilmData } from '../../../filmData';
import './Results.scss';

interface ResultsProps {
    filmsData: Array<FilmData>;
}

const Results: FunctionComponent<ResultsProps> = ({
    filmsData,
}) => {
    return (
        <div className="results">
            {filmsData.map((film) => (
                <FilmCard
                    key={film.id}
                    cardInfo={film}
                />
            ))}
        </div>
    );
};

export default Results;
