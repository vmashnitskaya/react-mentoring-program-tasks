import React, {
    ChangeEvent,
    FunctionComponent,
    useState,
    MouseEvent, useEffect,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setSearchValue } from '../../../../redux/data/dataSlice';
import Button from '../../../common/Button/Button';

const SearchForm: FunctionComponent = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.data.searchValue);
    const [search, setSearch] = useState<string>(searchValue);

    useEffect(() => {
        setSearch(searchValue);
    }, [searchValue])

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
    };

    const onSearchPerformed = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(setSearchValue(search.trim()));
        setSearch('');
    };

    return (
        <form className="search-area-container">
            <input
                placeholder="What do you want to watch?"
                onChange={handleFormChange}
                value={search}
            />
            <Button text="SEARCH" submit onClick={onSearchPerformed} />
        </form>
    );
};

export default SearchForm;
