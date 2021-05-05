import React, { FunctionComponent } from 'react';
import loadable from '@loadable/component';
import { FilmData } from '../../../filmData';
import './Results.scss';

const FilmCard = loadable(() => import('../FilmCard/FilmCard'));

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
