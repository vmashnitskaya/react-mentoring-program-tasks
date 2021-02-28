import React, { FunctionComponent } from 'react';
import './SearchArea.scss';
import SearchForm from './SearchForm';
import Button from '../../common/Button';

interface SearchAreaProps {
    handleSearchPerformed: (searchValue: string) => void;
}

const SearchArea: FunctionComponent<SearchAreaProps> = ({
    handleSearchPerformed,
}): JSX.Element => {
    return (
        <div className="search-area wrapper">
            <div className="search-area-add">
                <Button text="+ ADD MOVIE" />
            </div>
            <div className="search-area-search">
                <p className="search-area-title">FIND YOUR MOVIE</p>
                <SearchForm handleSearchPerformed={handleSearchPerformed} />
            </div>
        </div>
    );
};

export default SearchArea;
