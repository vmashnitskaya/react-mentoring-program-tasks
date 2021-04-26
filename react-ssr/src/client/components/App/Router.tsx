import React, { FunctionComponent, useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect, useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchSortedFilteredSearchedMovies,
    resetFirstRenderFlag
} from '../../../redux/data/dataSlice';
import HomePage from "../../pages/HomePage";
import MoviePage from "../../pages/MoviePage";
import MovieNotFound from "../../pages/MovieNotFound";
import ErrorPage from "../../pages/ErrorPage";

const Router: FunctionComponent = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
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

        let urlString = '';
        urlString += searchValue ? `?search=${searchValue}` : '';
        urlString += filterValue ? `${searchValue ? '&': '?'}filter=${filterValue}` : '';
        urlString += `${filterValue ? '&': '?'}sort=${sortData.value}&sortDirection=${sortData.direction}`;

        history.push({
            pathname: '/',
            search: urlString
        })

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
