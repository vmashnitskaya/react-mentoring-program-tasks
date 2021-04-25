import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

declare module 'react-redux' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultRootState extends RootState {}
}
