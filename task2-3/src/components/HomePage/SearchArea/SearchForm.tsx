import React, {
    ChangeEvent,
    FunctionComponent,
    useState,
    MouseEvent,
} from 'react';
import Button from '../../common/Button';

interface SearchFormProps {
    handleSearchPerformed: (searchValue: string) => void;
}

const SearchForm: FunctionComponent<SearchFormProps> = ({
    handleSearchPerformed,
}) => {
    const [search, setSearch] = useState<string>('');

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
    };

    const onSearchPerformed = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        handleSearchPerformed(search.trim());
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
