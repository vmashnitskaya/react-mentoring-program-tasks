import React, { FunctionComponent, KeyboardEvent, useRef } from 'react';
import { FilmData } from '../../../../staticData/filmData';
import MoreDropdown from '../MoreDropdown/MoreDropdown';
import './FilmCard.scss';

interface FilmCardProps {
    cardInfo: FilmData;
    index: number;
    handleDelete: (index: number) => void;
    handleEditSave: (data: FilmData, index: number) => void;
    handleMovieOpen: (data: FilmData) => void;
}

const FilmCard: FunctionComponent<FilmCardProps> = ({
    cardInfo,
    index,
    handleDelete,
    handleEditSave,
    handleMovieOpen,
}): JSX.Element => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const handleCardSelected = () => {
        handleMovieOpen(cardInfo);
    };

    const handleCardSelectedByKeyboard = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Enter') {
            handleMovieOpen(cardInfo);
        }
    };

    const handleImageError = () => {
        if (imageRef && imageRef.current) {
            imageRef.current.src = 'images/coming-soon.png';
        }
    };

    return (
        cardInfo && (
            <div
                className="card-wrapper"
                tabIndex={0}
                role="article"
                onClick={handleCardSelected}
                onKeyDown={handleCardSelectedByKeyboard}
            >
                <MoreDropdown
                    cardIndex={index}
                    handleDelete={handleDelete}
                    cardInfo={cardInfo}
                    handleEditSave={handleEditSave}
                />
                <div className="card-image">
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
                    <div className="card-year">
                        {cardInfo.release_date.slice(0, 4)}
                    </div>
                </div>
            </div>
        )
    );
};

export default FilmCard;
