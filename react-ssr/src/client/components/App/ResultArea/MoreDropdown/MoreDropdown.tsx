import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import loadable from '@loadable/component';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { deleteMovie, updateMovie } from '../../../../../redux/data/dataSlice';
import Button from '../../../common/Button/Button';
import { FilmData } from '../../../filmData';
import './MoreDropdown.scss';
import { toggleOverflowHidden } from '../../../utils/toggleOverflowHidden';

const DeleteModal = loadable(() => import('../DeleteModal/DeleteModal'));
const ModifyModal = loadable(() => import('../../ModifyModal/ModifyModal'));

const MORE_DROPDOWN_CONTAINER_CLASS = 'more-dropdown-container-class';

interface MoreDropdownProps {
    cardInfo: FilmData;
}

const MoreDropdown: FunctionComponent<MoreDropdownProps> = ({ cardInfo }) => {
    const dispatch = useDispatch();
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

    const toggleDeleteModal = () => {
        const newIsEditModalOpened = !isDeleteModalOpened;
        setIsDeleteModalOpened(newIsEditModalOpened);

        toggleOverflowHidden();
    };

    const onMovieDelete = () => {
        if (cardInfo && cardInfo.id) {
            dispatch(deleteMovie(cardInfo.id));
        }
        toggleDeleteModal();
    };

    const toggleEditModal = () => {
        const newIsEditModalOpened = !isEditModalOpened;
        setIsEditModalOpened(newIsEditModalOpened);
        toggleOverflowHidden();
    };

    const onEditSave = (filmValue: FilmData) => {
        dispatch(updateMovie(filmValue));
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
                    handleEditSave={onEditSave}
                    handleEditReset={handleEditReset}
                />
            )}
        </>
    );
};

export default MoreDropdown;
