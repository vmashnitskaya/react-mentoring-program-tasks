import React, {
    FunctionComponent,
    useState,
    MouseEvent,
    useEffect,
    useRef,
    useCallback,
} from 'react';
import clsx from 'clsx';
import Button from './Button';
import sortData from '../../staticData/sortData';
import './Dropdown.scss';

export const DROPDOWN_CONTAINER_CLASS = 'dropdown-container';

const Dropdown: FunctionComponent = (): JSX.Element => {
    const [value, setValue] = useState<string>('value');
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
        event: MouseEvent<HTMLButtonElement>
    ): void => {
        setValue((event.target as HTMLButtonElement).innerText);
        toggleDropdown();
    };

    return (
        <div className="sort">
            <span className="uppercase">Sort by</span>

            <div className={DROPDOWN_CONTAINER_CLASS} ref={dropdownElement}>
                <Button
                    text={value}
                    className="dropdown-toggle"
                    onClick={toggleDropdown}
                />
                <button
                    className="material-icons"
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
                    {sortData.map((data) => {
                        return (
                            <li>
                                <Button
                                    className="dropdown-list-item"
                                    key={data.value}
                                    text={data.title}
                                    value={data.value}
                                    onClick={handleSortPerformed}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
