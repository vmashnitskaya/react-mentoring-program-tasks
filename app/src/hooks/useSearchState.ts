import { useEffect, useState } from 'react';

const useSearchState = (
    baseValue: boolean
): [boolean, (value: boolean) => void] => {
    const [isSearchExpanded, setIsSearchExpanded] = useState(baseValue);

    useEffect(() => {
        setIsSearchExpanded(false);
    }, []);

    return [isSearchExpanded, setIsSearchExpanded];
};

export default useSearchState;
