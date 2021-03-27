import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { resetCurrentFilmDisplayed } from '../../../../redux/data/dataSlice';
import Search from '../Search/Search';
import MovieCard from '../MovieCard/MovieCard';
import './MovieDetails.scss';
import { FilmData } from '../../../../staticData/filmData';
import Button from '../../../common/Button/Button';

interface MovieDetailsProps {
    currentFilmDisplayed: FilmData;
}

const MovieDetails: FunctionComponent<MovieDetailsProps> = ({
    currentFilmDisplayed,
}) => {
    const dispatch = useDispatch();

    const handleBackHomeClick = () => {
        dispatch(resetCurrentFilmDisplayed());
    };

    return (
        <div className="movie-details wrapper">
            <div className="actions">
                <Search />
                <Button
                    text="arrow_back"
                    className="material-icons back"
                    onClick={handleBackHomeClick}
                    isLowerCase
                />
            </div>

            <MovieCard card={currentFilmDisplayed} />
        </div>
    );
};

export default MovieDetails;
