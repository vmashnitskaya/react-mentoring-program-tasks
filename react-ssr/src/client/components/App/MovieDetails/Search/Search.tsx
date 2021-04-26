import React, { FunctionComponent, useState, useRef, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import {
    setSearchValue,
} from '../../../../../redux/data/dataSlice';
import './Search.scss';
import Button from '../../../common/Button/Button';
import useSearchState from '../../../../hooks/useSearchState';

const Search: FunctionComponent = () => {
    const dispatch = useDispatch();
    const [isSearchExpanded, setIsSearchExpanded] = useSearchState(false);
    const [search, setSearch] = useState('');
    const inputElement = useRef<HTMLInputElement>(null);

    const handleSearchButtonClick = () => {
        if (!isSearchExpanded) {
            setIsSearchExpanded(true);
            if (inputElement.current) {
                inputElement.current.focus();
            }
        } else {
            dispatch(setSearchValue(search));
        }
    };

    const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            const newValue = e.target.value;
            setSearch(newValue);
        }
    };

    const handleFocusOut = () => {
        if (!search && isSearchExpanded) {
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
                value={search}
                onChange={handleSearchValueChange}
                onBlur={handleFocusOut}
            />
        </div>
    );
};

export default Search;
