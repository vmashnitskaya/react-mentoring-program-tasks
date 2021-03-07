import React, {
    FunctionComponent,
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';
import clsx from 'clsx';
import Button from '../../../common/Button/Button';
import './SortDropdown.scss';
import sortData from '../../../../staticData/sortData';
import { SortData as SortDataSelected } from '../../HomePage';

export const DROPDOWN_CONTAINER_CLASS = 'dropdown-container';

interface SortDropdownProps {
    onSortPerformed: (title: string, direction: string, value: string) => void;
    sortDataSelected: SortDataSelected;
}

const SortDropdown: FunctionComponent<SortDropdownProps> = ({
    onSortPerformed,
    sortDataSelected,
}): JSX.Element => {
    const [isDropdownClosed, setIsDropdownClosed] = useState<boolean>(true);
    const dropdownElement = useRef<HTMLDivElement>(null);

    const handleDropdownClose = useCallback(
        (event: Event) => {
            const targetElement = event.target;
            if (
                !isDropdownClosed &&
                dropdownElement.current &&
                !dropdownElement.current.contains(targetElement as Node)
            ) {
                setIsDropdownClosed(true);
            }
        },
        [isDropdownClosed]
    );

    useEffect(() => {
        window.addEventListener('click', handleDropdownClose);
    });

    const toggleDropdown = () => {
        setIsDropdownClosed(!isDropdownClosed);
    };

    const handleSortPerformed = (
        title: string,
        direction: string,
        value: string
    ): void => {
        onSortPerformed(title, direction, value);
        toggleDropdown();
    };

    return (
        <div className="sort">
            <span className="uppercase">Sort by</span>

            <div className={DROPDOWN_CONTAINER_CLASS} ref={dropdownElement}>
                <Button
                    text={sortDataSelected.title}
                    className="dropdown-toggle"
                    onClick={toggleDropdown}
                >
                    <span className="material-icons direction">
                        {sortDataSelected.direction === 'ascending'
                            ? 'south'
                            : 'north'}
                    </span>
                </Button>

                <button
                    className="material-icons arrow-down"
                    onClick={toggleDropdown}
                    type="button"
                >
                    arrow_drop_down
                </button>

                <ul
                    className={clsx(
                        'dropdown-list',
                        isDropdownClosed && 'hidden'
                    )}
                >
                    <div className="close-area">
                        <Button
                            className="material-icons"
                            onClick={toggleDropdown}
                            text="close"
                            isLowerCase
                        />
                    </div>

                    {sortData.map((data) => {
                        return (
                            <li key={`${data.value}_${data.direction}`}>
                                <Button
                                    className="dropdown-list-item"
                                    text={data.title}
                                    value={data.value}
                                    onClick={() =>
                                        handleSortPerformed(
                                            data.title,
                                            data.direction,
                                            data.value
                                        )
                                    }
                                >
                                    <span className="material-icons direction">
                                        {data.direction === 'ascending'
                                            ? 'south'
                                            : 'north'}
                                    </span>
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SortDropdown;
