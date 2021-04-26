import qs from 'qs';
import * as Express from 'express';
import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { renderToString  } from 'react-dom/server';
import { DefaultRootState } from "react-redux";
import configureStore from '../redux/store';
import {fetchSortedFilteredSearchedMovies} from '../redux/data/dataSlice';
import { INITIAL_STATE } from '../redux/data/dataSlice';

import App from '../shared/index'
const app = Express();

const html = ({ body, reduxState }: { body: string, reduxState: any }) => `
  <!DOCTYPE html>
  <html>
    <head>
        <link rel="stylesheet" href="main.css">
    </head>
    <body>
      <div id="root">${body}</div>
       <div id="root-modal"></div>
    </body>
    <script>
      window.PRELOADED_STATE = ${JSON.stringify(reduxState)}
    </script>
    <script src="main.bundle.js" defer></script>
  </html>
`;

app.use(Express.static(__dirname + '/public'));
app.get('*', (req: Express.Request, res: Express.Response) => {
    const store = configureStore(INITIAL_STATE);

    const promises = [Promise.resolve(store.dispatch(fetchSortedFilteredSearchedMovies({filterValue: undefined, searchValue: undefined, sortData: undefined})))];

    Promise.all(promises).then(() => {
        //const params = qs.parse((req as any).query);
        const location = req.url;
        const context: StaticRouterContext = {};

        const body = renderToString(
            <Provider store={store}>
                <StaticRouter context={context} location={location}>
                    <App/>
                </StaticRouter>
            </Provider>
        );

        if (context.url) {
            res.redirect(context.url);
            return;
        }

        const reduxState = store.getState().data;

        res
            .status(context.statusCode || 200)
            .send(html({body, reduxState}));
    }).catch(e => console.error(e));
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
