import React, {FunctionComponent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from "react-router";
import { fetchMovie, resetErrorState } from '../../../../redux/data/dataSlice';
import Search from '../Search/Search';
import MovieCard from '../MovieCard/MovieCard';
import './MovieDetails.scss';
import Button from '../../../common/Button/Button';

interface UseParamsProps {
    id: string
}

const MovieDetails: FunctionComponent<any> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentFilmDisplayed = useSelector(
        (state) => state.data.currentFilmDisplayed
    );
    const error = useSelector((state) => state.data.error);

    let { id } = useParams<UseParamsProps>();

    useEffect(() => {
        dispatch(fetchMovie(id));
    }, [id])

    useEffect(() => {
        if (error) {
            history.push("/error_404");
            dispatch(resetErrorState());
        }
    }, [error])

    const handleBackHomeClick = () => {
        history.push("/home");
    };

    return (<div className="movie-details wrapper">
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
