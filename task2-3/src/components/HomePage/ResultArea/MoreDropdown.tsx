import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';
import Button from '../../common/Button';
import './MoreDropdown.scss';
import moreData from '../../../staticData/moreData';

const MORE_DROPDOWN_CONTAINER_CLASS = 'more-dropdown-container-class';

const MoreDropdown: FunctionComponent = () => {
    const [isMoreDropdownClosed, setIsMoreDropdownClosed] = useState<boolean>(
        true
    );
    const dropdownElement = useRef<HTMLDivElement>(null);

    const handleDropdownClose = useCallback(
        (event: Event) => {
            const targetElement = event.target;
            if (
                !isMoreDropdownClosed &&
                dropdownElement.current &&
                !dropdownElement.current.contains(targetElement as Node)
            ) {
                setIsMoreDropdownClosed(true);
            }
        },
        [isMoreDropdownClosed]
    );

    useEffect(() => {
        window.addEventListener('click', handleDropdownClose);
    });

    const toggleDropdown = () => {
        setIsMoreDropdownClosed(!isMoreDropdownClosed);
    };

    return (
        <div className="more">
            <div
                className={MORE_DROPDOWN_CONTAINER_CLASS}
                ref={dropdownElement}
            >
                <button
                    type="button"
                    className="more-button"
                    onClick={toggleDropdown}
                >
                    <span className="material-icons">more_vert</span>
                </button>

                <ul
                    className={clsx(
                        'dropdown-list',
                        isMoreDropdownClosed && 'hidden'
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

                    {moreData.map((data) => {
                        return (
                            <li key={data.value}>
                                <Button
                                    className="dropdown-list-item"
                                    text={data.title}
                                    value={data.value}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default MoreDropdown;
