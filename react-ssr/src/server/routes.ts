import HomePage from "../client/pages/HomePage";
import MoviePage from "../client/pages/MoviePage";
import MovieNotFound from "../client/pages/MovieNotFound";
import ErrorPage from "../client/pages/ErrorPage";
import {FunctionComponent} from "react";

interface IRoutes {
    path?: string;
    exact?: boolean;
    component: FunctionComponent;
    isDataLoaded?: boolean;
    isMovieLoaded?: boolean;
}

const Routes: Array<IRoutes> = [
    {
        path: '/not_found',
        component: MovieNotFound,
        exact: true
    },
    {
        path: 'film/:id',
        component: MoviePage,
        isMovieLoaded: true,
        isDataLoaded: true,
    },
    {
        path: '/',
        component: HomePage,
        isDataLoaded: true
    },
    {
        component: ErrorPage
    }
];

export default Routes;
