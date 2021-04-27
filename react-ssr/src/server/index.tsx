import * as Express from 'express';
import * as React from 'react';
import { StaticRouter, matchPath  } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { renderToString  } from 'react-dom/server';
import configureStore from '../redux/store';
import Routes from './routes';
import {fetchMovie, fetchSortedFilteredSearchedMovies} from '../redux/data/dataSlice';
import { INITIAL_STATE } from '../redux/data/dataSlice';

import App from '../shared/index';
import {getQueryParams} from "./utils";

const app = Express();

const html = ({ body, reduxState }: { body: string, reduxState: any }) => `
  <!DOCTYPE html>
  <html>
    <head>
        <link rel="fav icon" href="/images/favicon.ico" type="image/x-icon">
        <link rel="stylesheet" href="/main.css">
    </head>
    <body>
      <div id="root">${body}</div>
       <div id="root-modal"></div>
    </body>
    <script>
      window.PRELOADED_STATE = ${JSON.stringify(reduxState)}
    </script>
    <script src="/main.bundle.js" defer></script>
  </html>
`;

app.use(Express.static(__dirname + '/public'));
app.get('*', (req: Express.Request, res: Express.Response) => {
    const store = configureStore(INITIAL_STATE);
    const promises = [];
    const queryParams = req.query;

    const currentRoute =
        Routes.find(route => matchPath(req.path, route));

    if(currentRoute) {
        if(currentRoute.isMovieLoaded) {
            promises.push(Promise.resolve(store.dispatch(fetchMovie((matchPath(req.path, currentRoute) as any).params.id))));
        }

        if(currentRoute.isDataLoaded) {
            const query = getQueryParams(queryParams);
            promises.push(Promise.resolve(store.dispatch(fetchSortedFilteredSearchedMovies(query))));
        }
    }

    Promise.all(promises).then(() => {
        const location = req.url;
        const context: StaticRouterContext = {};

        const body = renderToString(
            <Provider store={store}>
                <StaticRouter context={context} location={location}>
                    <App/>
                </StaticRouter>
            </Provider>
        );

        const reduxState = store.getState().data;

        res
            .status(context.statusCode || 200)
            .send(html({body, reduxState}));
    }).catch(e => console.error(e));
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
