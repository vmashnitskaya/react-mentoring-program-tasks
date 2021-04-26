import React, { FunctionComponent, useEffect } from 'react';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchSortedFilteredSearchedMovies,
    resetFirstRenderFlag
} from '../../../redux/data/dataSlice';
import SearchArea from './SearchArea';
import ResultArea from './ResultArea';
import MovieDetails from './MovieDetails';
import NoFilmsFound from "../common/NoFilmsFound/NoFilmsFound";
import ErrorPage404 from "../common/ErrorPage404/ErrorPage404";

const HomePage: FunctionComponent = (): JSX.Element => {
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
                        <Route exact path="/" render={() =>
                            <>
                                <SearchArea />
                                <ResultArea
                                    data={data}
                                    sortData={sortData}
                                    filter={filterValue}
                                />
                            </>
                        } />
                        <Route path="/film/:id" render={(props) =>
                            <>
                                <MovieDetails {...props}/>
                                <ResultArea
                                    data={data}
                                    sortData={sortData}
                                    filter={filterValue}
                                />
                            </>
                        } />
                        <Route path="/not_found" render={() =>
                            <>
                                <SearchArea />
                                <NoFilmsFound />
                            </>
                        } />
                        <Route path="/error_404">
                            <ErrorPage404 />
                        </Route>
                        <Redirect to="/error_404" />
                    </Switch>
    );
};

export default HomePage;
