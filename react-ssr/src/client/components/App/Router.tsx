import React, { FunctionComponent, useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import loadable from '@loadable/component';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchSortedFilteredSearchedMovies,
    resetFirstRenderFlag
} from '../../../redux/data/dataSlice';

const HomePage = loadable(() => import('../../pages/HomePage'));
const MoviePage = loadable(() => import('../../pages/MoviePage'));
const MovieNotFound = loadable(() => import('../../pages/MovieNotFound'));
const ErrorPage = loadable(() => import('../../pages/ErrorPage'));

const Router: FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data.data);
    const sortData = useSelector((state) => state.data.sortData);
    const filterValue = useSelector((state) => state.data.filterValue);
    const searchValue = useSelector((state) => state.data.searchValue);
    const isFirstRender = useSelector((state) => state.data.isFirstRender);

    useEffect(() => {
        if(isFirstRender) {
            dispatch(resetFirstRenderFlag());
        } else {
            dispatch(
                fetchSortedFilteredSearchedMovies({
                    searchValue,
                    filterValue,
                    sortData,
                })
            );
        }
    }, [sortData, filterValue, searchValue, dispatch]);

    return (
        <Switch>
            <Route exact path="/" >
                <HomePage data={data} sortData={sortData} filter={filterValue} />
            </Route>
            <Route path="/film/:id" >
                <MoviePage data={data} sortData={sortData} filter={filterValue} />
            </Route>
            <Route path="/not_found">
                <MovieNotFound />
            </Route>
            <Route path="/error_404">
                <ErrorPage />
            </Route>
            <Redirect to="/error_404" />
        </Switch>
    );
};

export default Router;
