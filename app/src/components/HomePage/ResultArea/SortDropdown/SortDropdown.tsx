import React, {
    FunctionComponent,
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { setSortData, SortData } from '../../../../redux/data/dataSlice';
import Button from '../../../common/Button/Button';
import './SortDropdown.scss';
import sortDataStatic from '../../../../staticData/sortData';

export const DROPDOWN_CONTAINER_CLASS = 'dropdown-container';

interface SortDropdownProps {
    sortDataSelected: SortData;
}

const SortDropdown: FunctionComponent<SortDropdownProps> = ({
    sortDataSelected,
}): JSX.Element => {
    const dispatch = useDispatch();
    const sortData = useSelector((state) => state.data.sortData);
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
        if (direction !== sortData.direction || title !== sortData.title) {
            dispatch(setSortData({ ...sortData, direction, title, value }));
        }
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
                        {sortDataSelected.direction === 'asc'
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

                    {sortDataStatic.map((data) => {
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
                                        {data.direction === 'asc'
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
