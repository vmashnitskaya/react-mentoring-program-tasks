import React, { FunctionComponent } from 'react';
import Search from '../Search/Search';
import MovieCard from '../MovieCard/MovieCard';
import './MovieDetails.scss';
import { FilmData } from '../../../../staticData/filmData';

interface MovieDetailsProps {
    currentFilmDisplayed: FilmData;
    handleSearchSubmit: (value: string) => void;
}

const MovieDetails: FunctionComponent<MovieDetailsProps> = ({
    currentFilmDisplayed,
    handleSearchSubmit,
}) => {
    return (
        <div className="movie-details wrapper">
            <Search handleSearchSubmit={handleSearchSubmit} />
            <MovieCard card={currentFilmDisplayed} />
        </div>
    );
};

export default MovieDetails;
