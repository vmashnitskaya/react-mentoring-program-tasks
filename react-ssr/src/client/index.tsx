import * as React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux';
import {
    BrowserRouter
} from "react-router-dom";
import configureStore from '../redux/store';
import {DefaultRootState} from "react-redux";
import 'material-icons/iconfont/material-icons.scss';
import App from '../shared/index';
import { loadableReady } from '@loadable/component';

declare global {
    interface Window {
        PRELOADED_STATE: DefaultRootState;
    }
}

const store = configureStore(window.PRELOADED_STATE);

loadableReady(() => {
    hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>, document.getElementById('root'));
});
