import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';
import { addMovie } from '../../../../../redux/data/dataSlice';
import './SearchArea.scss';
import { FilmData } from '../../../filmData';
import { toggleOverflowHidden } from '../../../utils/toggleOverflowHidden';

const Button = loadable(() => import('../../../common/Button/Button'));
const SearchForm = loadable(() => import('../SearchForm/SearchForm'));
const ModifyModal = loadable(() => import('../../ModifyModal/ModifyModal'));

const DEFAULT_VALUE: FilmData = {
    id: 0,
    title: '',
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '',
    poster_path: '',
    overview: '',
    budget: 0,
    revenue: 0,
    genres: [],
    runtime: 0,
};

const SearchArea: FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const [newMovie, setNewMovie] = useState<FilmData>(DEFAULT_VALUE);
    const [isAddModalOpened, setIsAddModalOpened] = useState<boolean>(false);

    const toggleModal = () => {
        const newIsAddModalOpened = !isAddModalOpened;
        setIsAddModalOpened(newIsAddModalOpened);
        toggleOverflowHidden();
    };

    const handleEditReset = () => {
        setNewMovie(DEFAULT_VALUE);
    };

    const handleNewMovieSave = (filmValue: FilmData) => {
        toggleModal();
        dispatch(addMovie(filmValue));
        setNewMovie(DEFAULT_VALUE);
    };

    return (
        <>
            <div className="search-area wrapper" style={{"backgroundImage": "url('/images/bg.jpg')"}}>
                <div className="search-area-add">
                    <Button text="+ ADD MOVIE" onClick={toggleModal} />
                </div>
                <div className="search-area-search">
                    <p className="search-area-title">FIND YOUR MOVIE</p>
                    <SearchForm />
                </div>
            </div>

            {isAddModalOpened && (
                <ModifyModal
                    toggleModalClose={toggleModal}
                    newMovieData={newMovie}
                    handleEditReset={handleEditReset}
                    handleNewMovieSave={handleNewMovieSave}
                />
            )}
        </>
    );
};

export default SearchArea;
