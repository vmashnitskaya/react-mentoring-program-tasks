import React, { FunctionComponent } from 'react';
import './MovieCard.scss';
import { FilmData } from '../../../../staticData/filmData';

interface MovieCardProps {
    card: FilmData;
}

const MovieCard: FunctionComponent<MovieCardProps> = ({ card }) => {
    return (
        <div className="card">
            <img className="card-image" src={card.poster_path} alt="poster" />
            <div className="card-details">
                <div className="title">
                    <span className="film-title">{card.title}</span>
                    <span className="film-rating">{card.vote_average}</span>
                    <div className="film-tagline">{card.tagline}</div>
                </div>
                <div className="numbers">
                    <span className="year">
                        {card.release_date.slice(0, 4)}
                    </span>
                    <span className="runtime">{card.runtime} min</span>
                </div>
                <p className="description">{card.overview}</p>
            </div>
        </div>
    );
};

export default MovieCard;
