import React, { FunctionComponent } from 'react';
import { FilmData } from '../../../staticData/filmData';
import './FilmCard.scss';

interface FilmCardProps {
    cardInfo: FilmData;
}

const FilmCard: FunctionComponent<FilmCardProps> = ({
    cardInfo,
}): JSX.Element => {
    return (
        cardInfo && (
            <div className="card-wrapper">
                <button type="button" className="more-button">
                    <span className="material-icons">more_vert</span>
                </button>

                <div className="card-image">
                    <img src={cardInfo.poster_path} alt="poster" />
                </div>
                <div className="card-info">
                    <div>
                        <div className="card-title">{cardInfo.title}</div>
                        <div className="card-genres">
                            {cardInfo.genres.slice(0, 3).join(', ')}
                        </div>
                    </div>
                    <div className="card-year">
                        {cardInfo.release_date.slice(0, 4)}
                    </div>
                </div>
            </div>
        )
    );
};

export default FilmCard;
