import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        thunk: true,
    }),
});

type RootState = ReturnType<typeof rootReducer>;

declare module 'react-redux' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultRootState extends RootState {}
}

export default store;
