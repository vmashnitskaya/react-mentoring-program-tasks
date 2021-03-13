import React, { FunctionComponent, useState, useRef, ChangeEvent } from 'react';
import clsx from 'clsx';
import './Search.scss';
import Button from '../../../common/Button/Button';
import useSearchState from '../../../../hooks/useSearchState';

interface SearchProps {
    handleSearchSubmit: (value: string) => void;
}

const Search: FunctionComponent<SearchProps> = ({ handleSearchSubmit }) => {
    const [isSearchExpanded, setIsSearchExpanded] = useSearchState(false);
    const [searchValue, setSearchValue] = useState('');
    const inputElement = useRef<HTMLInputElement>(null);

    const handleSearchButtonClick = () => {
        if (!isSearchExpanded) {
            setIsSearchExpanded(true);
            if (inputElement.current) {
                inputElement.current.focus();
            }
        } else {
            handleSearchSubmit(searchValue);
        }
    };

    const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            const newValue = e.target.value;
            setSearchValue(newValue);
        }
    };

    const handleFocusOut = () => {
        if (!searchValue && isSearchExpanded) {
            setIsSearchExpanded(false);
        }
    };

    return (
        <div className="search-input">
            <Button
                text="search"
                className="material-icons"
                isLowerCase
                onClick={handleSearchButtonClick}
            />

            <input
                className={clsx('search', isSearchExpanded && 'is-expanded')}
                type="text"
                ref={inputElement}
                value={searchValue}
                onChange={handleSearchValueChange}
                onBlur={handleFocusOut}
            />
        </div>
    );
};

export default Search;
