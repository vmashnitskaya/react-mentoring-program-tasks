import React, { FunctionComponent, KeyboardEvent, useRef } from 'react';
import { FilmData } from '../../../filmData';
import MoreDropdown from '../MoreDropdown/MoreDropdown';
import './FilmCard.scss';
import {useHistory} from "react-router";

interface FilmCardProps {
    cardInfo: FilmData;
}

const FilmCard: FunctionComponent<FilmCardProps> = ({
    cardInfo,
}): JSX.Element => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const history = useHistory();

    const handleCardSelected = () => {
        history.push(`/film/${cardInfo.id}`);
    };

    const handleCardSelectedByKeyboard = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Enter') {
            history.push(`/film/${cardInfo.id}`);
        }
    };

    const handleImageError = () => {
        if (imageRef && imageRef.current) {
            imageRef.current.src = '/images/coming-soon.png';
        }
    };

    return (
        cardInfo && (
            <div className="card-wrapper">
                <MoreDropdown cardInfo={cardInfo} />
                <div
                    className="card-image"
                    role="article"
                    tabIndex={0}
                    onClick={handleCardSelected}
                    onKeyDown={handleCardSelectedByKeyboard}
                >
                    <img
                        ref={imageRef}
                        src={cardInfo.poster_path}
                        alt="poster"
                        onError={handleImageError}
                    />
                </div>
                <div className="card-info">
                    <div>
                        <div className="card-title">{cardInfo.title}</div>
                        <div className="card-genres">
                            {cardInfo.genres.join(', ')}
                        </div>
                    </div>
                    <div className="card-numbers">
                        <div className="card-year">
                            {cardInfo.release_date.slice(0, 4)}
                        </div>
                        <div className="card-rating">
                            <span className="material-icons">star_rate</span>
                            <span>{cardInfo.vote_average}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default FilmCard;
