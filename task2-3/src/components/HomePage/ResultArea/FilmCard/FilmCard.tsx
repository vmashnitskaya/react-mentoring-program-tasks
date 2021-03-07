import React, { FunctionComponent } from 'react';
import { FilmData } from '../../../../staticData/filmData';
import MoreDropdown from '../MoreDropdown/MoreDropdown';
import './FilmCard.scss';

interface FilmCardProps {
    cardInfo: FilmData;
    index: number;
    handleDelete: (index: number) => void;
    handleEditSave: (data: FilmData, index: number) => void;
}

const FilmCard: FunctionComponent<FilmCardProps> = ({
    cardInfo,
    index,
    handleDelete,
    handleEditSave,
}): JSX.Element => {
    return (
        cardInfo && (
            <div className="card-wrapper">
                <MoreDropdown
                    cardIndex={index}
                    handleDelete={handleDelete}
                    cardInfo={cardInfo}
                    handleEditSave={handleEditSave}
                />
                <div className="card-image">
                    <img src={cardInfo.poster_path} alt="poster" />
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
