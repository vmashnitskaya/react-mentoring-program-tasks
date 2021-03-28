import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../../../redux/data/dataSlice';
import './SearchArea.scss';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../../../common/Button/Button';
import { FilmData } from '../../../filmData';
import ModifyModal from '../../ModifyModal/ModifyModal';
import { toggleOverflowHidden } from '../../../utils/toggleOverflowHidden';

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

    const handleValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: newValue, id: field } = event.target;
        setNewMovie((prevState) => ({ ...prevState, [field]: newValue }));
    };

    const handleNumberValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: newValue, id: field } = event.target;
        setNewMovie((prevState) => ({
            ...prevState,
            [field]: Number(newValue),
        }));
    };

    const toggleModal = () => {
        const newIsAddModalOpened = !isAddModalOpened;
        setIsAddModalOpened(newIsAddModalOpened);
        toggleOverflowHidden();
    };

    const handleCheckboxChecked = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: checkboxValue, checked } = event.target;

        if (checked) {
            setNewMovie((prevState) => ({
                ...prevState,
                genres: [...prevState.genres, checkboxValue],
            }));
        } else {
            setNewMovie((prevState) => ({
                ...prevState,
                genres: prevState.genres.filter((el) => el !== checkboxValue),
            }));
        }
    };

    const handleEditReset = () => {
        setNewMovie(DEFAULT_VALUE);
    };

    const handleNewMovieSave = () => {
        toggleModal();
        dispatch(addMovie(newMovie));
        setNewMovie(DEFAULT_VALUE);
    };

    return (
        <>
            <div className="search-area wrapper">
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
                    onValueChanged={handleValueChanged}
                    onNumberValueChanged={handleNumberValueChanged}
                    handleCheckboxChecked={handleCheckboxChecked}
                    handleEditReset={handleEditReset}
                    handleNewMovieSave={handleNewMovieSave}
                />
            )}
        </>
    );
};

export default SearchArea;
