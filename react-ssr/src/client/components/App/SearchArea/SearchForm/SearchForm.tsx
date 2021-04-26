import React, {
    ChangeEvent,
    FunctionComponent,
    useState,
    MouseEvent,
} from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../../../../redux/data/dataSlice';
import Button from '../../../common/Button/Button';

const SearchForm: FunctionComponent = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string>('');

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
    };

    const onSearchPerformed = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(setSearchValue(search.trim()));
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
