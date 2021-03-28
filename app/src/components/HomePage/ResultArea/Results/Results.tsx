import React, { FunctionComponent } from 'react';
import FilmCard from '../FilmCard/FilmCard';
import { FilmData } from '../../../filmData';
import './Results.scss';

interface ResultsProps {
    filmsData: Array<FilmData>;
    handleMovieOpen: (data: FilmData) => void;
}

const Results: FunctionComponent<ResultsProps> = ({
    filmsData,
    handleMovieOpen,
}) => {
    return (
        <div className="results">
            {filmsData.map((film) => (
                <FilmCard
                    key={film.id}
                    cardInfo={film}
                    handleMovieOpen={handleMovieOpen}
                />
            ))}
        </div>
    );
};

export default Results;
