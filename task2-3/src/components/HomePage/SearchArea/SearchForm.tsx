import React, { FunctionComponent } from 'react';
import Button from '../../common/Button';

const SearchForm: FunctionComponent = () => {
    return (
        <form className="search-area-container">
            <input placeholder="What do you want to watch?" />
            <Button text="SEARCH" submit />
        </form>
    );
};

export default SearchForm;
