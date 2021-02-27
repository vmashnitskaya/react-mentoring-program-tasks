import React, { FunctionComponent } from 'react';
import SearchArea from './SearchArea';
import ResultArea from './ResultArea';

const HomePage: FunctionComponent = (): JSX.Element => {
    return (
        <div className="home-page">
            <SearchArea />
            <ResultArea />
        </div>
    );
};

export default HomePage;
