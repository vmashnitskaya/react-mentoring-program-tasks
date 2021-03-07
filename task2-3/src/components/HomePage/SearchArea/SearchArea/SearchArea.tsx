import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import './SearchArea.scss';
import SearchForm from '../SearchForm/SearchForm';
import Button from '../../../common/Button/Button';
import { FilmData } from '../../../../staticData/filmData';
import ModifyModal from '../../ModifyModal/ModifyModal';

const DEFAULT_VALUE: FilmData = {
    id: Math.floor(Math.random() * Math.floor(10000000000)),
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

interface SearchAreaProps {
    handleSearchPerformed: (searchValue: string) => void;
    handleNewMovieAdd: (data: FilmData) => void;
}

const SearchArea: FunctionComponent<SearchAreaProps> = ({
    handleSearchPerformed,
    handleNewMovieAdd,
}): JSX.Element => {
    const [newMovie, setNewMovie] = useState<FilmData>(DEFAULT_VALUE);
    const [isAddModalOpened, setIsAddModalOpened] = useState<boolean>(false);

    const handleValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: newValue, id: field } = event.target;
        setNewMovie((prevState) => ({ ...prevState, [field]: newValue }));
    };

    const setOverflowHidden = (newState: boolean) => {
        const body = document.querySelector('body');
        const isOverflowHiddenClass = 'is-overflow-hidden';

        if (body) {
            if (newState) {
                body.classList.add(isOverflowHiddenClass);
            } else {
                body.classList.remove(isOverflowHiddenClass);
            }
        }
    };

    const toggleModal = () => {
        const newIsAddModalOpened = !isAddModalOpened;
        setIsAddModalOpened(newIsAddModalOpened);
        setOverflowHidden(newIsAddModalOpened);
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
        handleNewMovieAdd(newMovie);
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
                    <SearchForm handleSearchPerformed={handleSearchPerformed} />
                </div>
            </div>

            {isAddModalOpened && (
                <ModifyModal
                    toggleModalClose={toggleModal}
                    newMovieData={newMovie}
                    onValueChanged={handleValueChanged}
                    handleCheckboxChecked={handleCheckboxChecked}
                    handleEditReset={handleEditReset}
                    handleNewMovieSave={handleNewMovieSave}
                />
            )}
        </>
    );
};

export default SearchArea;
