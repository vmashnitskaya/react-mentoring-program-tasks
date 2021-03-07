import React, { FunctionComponent } from 'react';
import FilmCard from '../FilmCard/FilmCard';
import { FilmData } from '../../../../staticData/filmData';
import './Results.scss';

interface ResultsProps {
    filmsData: Array<FilmData>;
    handleDelete: (index: number) => void;
    handleEditSave: (data: FilmData, index: number) => void;
}

const Results: FunctionComponent<ResultsProps> = ({
    filmsData,
    handleDelete,
    handleEditSave,
}) => {
    return (
        <div className="results">
            {filmsData.map((film, index) => (
                <FilmCard
                    key={film.id}
                    cardInfo={film}
                    index={index}
                    handleDelete={handleDelete}
                    handleEditSave={handleEditSave}
                />
            ))}
        </div>
    );
};

export default Results;
