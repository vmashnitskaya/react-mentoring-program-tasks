import React, {
    ChangeEvent,
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';
import Button from '../../../common/Button/Button';
import { FilmData } from '../../../../staticData/filmData';
import DeleteModal from '../DeleteModal/DeleteModal';
import './MoreDropdown.scss';
import ModifyModal from '../../ModifyModal/ModifyModal';

const MORE_DROPDOWN_CONTAINER_CLASS = 'more-dropdown-container-class';

interface MoreDropdownProps {
    cardIndex: number;
    handleDelete: (index: number) => void;
    cardInfo: FilmData;
    handleEditSave: (data: FilmData, index: number) => void;
}

const MoreDropdown: FunctionComponent<MoreDropdownProps> = ({
    cardIndex,
    handleDelete,
    cardInfo,
    handleEditSave,
}) => {
    const [isMoreDropdownClosed, setIsMoreDropdownClosed] = useState<boolean>(
        true
    );
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(
        false
    );
    const [isEditModalOpened, setIsEditModalOpened] = useState<boolean>(false);
    const [baseMovieData] = useState(cardInfo);
    const [newMovieData, setNewMovieData] = useState<FilmData>({
        ...cardInfo,
    });

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

    const setOverflowHidden = (newState: boolean) => {
        const body = document.querySelector('body');
        const isOverflowHiddenClass = 'is-overflow-hidden';

        if (body) {
            if (newState) {
                body.classList.add(isOverflowHiddenClass);
            } else {
                body.classList.remove(isOverflowHiddenClass);
            }
        }
    };

    const toggleDeleteModal = () => {
        const newIsEditModalOpened = !isDeleteModalOpened;
        setIsDeleteModalOpened(newIsEditModalOpened);

        setOverflowHidden(newIsEditModalOpened);
    };

    const onMovieDelete = () => {
        handleDelete(cardIndex);
        toggleDeleteModal();
    };

    const toggleEditModal = () => {
        const newIsEditModalOpened = !isEditModalOpened;
        setIsEditModalOpened(newIsEditModalOpened);

        setOverflowHidden(newIsEditModalOpened);
    };

    const onValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: newValue, id: field } = event.target;
        setNewMovieData((prevState) => ({ ...prevState, [field]: newValue }));
    };

    const handleCheckboxChecked = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: checkboxValue, checked } = event.target;

        if (checked) {
            setNewMovieData((prevState) => ({
                ...prevState,
                genres: [...prevState.genres, checkboxValue],
            }));
        } else {
            setNewMovieData((prevState) => ({
                ...prevState,
                genres: prevState.genres.filter((el) => el !== checkboxValue),
            }));
        }
    };

    const onEditSave = () => {
        handleEditSave(newMovieData, cardIndex);
        toggleEditModal();
    };

    const handleEditReset = () => {
        setNewMovieData({ ...baseMovieData });
    };

    return (
        <>
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

                        <li>
                            <Button
                                className="dropdown-list-item"
                                text="Edit"
                                value="edit"
                                onClick={toggleEditModal}
                            />
                        </li>

                        <li>
                            <Button
                                className="dropdown-list-item"
                                text="Delete"
                                value="delete"
                                onClick={toggleDeleteModal}
                            />
                        </li>
                    </ul>
                </div>
            </div>

            {isDeleteModalOpened && (
                <DeleteModal
                    toggleDeleteModalClose={toggleDeleteModal}
                    onMovieDelete={onMovieDelete}
                />
            )}

            {isEditModalOpened && (
                <ModifyModal
                    toggleModalClose={toggleEditModal}
                    newMovieData={newMovieData}
                    onValueChanged={onValueChanged}
                    handleCheckboxChecked={handleCheckboxChecked}
                    handleEditSave={onEditSave}
                    handleEditReset={handleEditReset}
                />
            )}
        </>
    );
};

export default MoreDropdown;
