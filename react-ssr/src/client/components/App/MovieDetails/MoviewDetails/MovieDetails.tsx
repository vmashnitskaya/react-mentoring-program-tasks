import React, {FunctionComponent} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from "react-router";
import Search from '../Search/Search';
import MovieCard from '../MovieCard/MovieCard';
import './MovieDetails.scss';
import Button from '../../../common/Button/Button';

const MovieDetails: FunctionComponent<any> = () => {
    const history = useHistory();
    const currentFilmDisplayed = useSelector(
        (state) => state.data.currentFilmDisplayed
    );

    const handleBackHomeClick = () => {
        history.push("/");
    };

    return (<div className="movie-details wrapper" style={{"backgroundImage": "url('/images/bg.jpg')"}}>
                <div className="actions">
                    <Search />
                    <Button
                        text="arrow_back"
                        className="material-icons back"
                        onClick={handleBackHomeClick}
                        isLowerCase
                    />
                </div>

                {currentFilmDisplayed && <MovieCard card={currentFilmDisplayed}/>}
            </div>);
};

export default MovieDetails;
