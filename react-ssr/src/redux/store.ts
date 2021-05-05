import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export default (initialState) => {
    const store = configureStore({reducer: rootReducer, preloadedState: {data: initialState}, middleware: getDefaultMiddleware({
            thunk: true,
        })});

    return store;
};


export type RootState = ReturnType<typeof rootReducer>;

declare module 'react-redux' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultRootState extends RootState {}
}
