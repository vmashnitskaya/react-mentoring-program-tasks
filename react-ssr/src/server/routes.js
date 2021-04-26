import HomePage from "../client/pages/HomePage";
import MoviePage from "../client/pages/MoviePage";
import MovieNotFound from "../client/pages/MovieNotFound";
import ErrorPage from "../client/pages/ErrorPage";

const Routes = [
    {
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        path: '/film/:id',
        component: MoviePage,
    },
    {
        path: '/not_found',
        component: MovieNotFound,
    },
    {
        path: '/error_404',
        component: ErrorPage
    },
    {
        component: ErrorPage
    }
];

export default Routes;
