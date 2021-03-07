import React, { ChangeEvent, FunctionComponent } from 'react';
import Select from '../../common/Select/Select';
import Button from '../../common/Button/Button';
import { FilmData } from '../../../staticData/filmData';
import selectCategory from '../../../staticData/select';
import Modal from '../../common/Modal/Modal';

interface EditModalProps {
    toggleModalClose: () => void;
    newMovieData: FilmData;
    onValueChanged: (event: ChangeEvent<HTMLInputElement>) => void;
    handleCheckboxChecked: (event: ChangeEvent<HTMLInputElement>) => void;
    handleEditReset?: () => void;
    handleEditSave?: () => void;
    handleNewMovieSave?: () => void;
}

const ModifyModal: FunctionComponent<EditModalProps> = ({
    toggleModalClose,
    newMovieData,
    onValueChanged,
    handleCheckboxChecked,
    handleEditReset,
    handleEditSave,
    handleNewMovieSave,
}) => {
    return (
        <Modal headerText="Edit movie" handleModalClose={toggleModalClose}>
            <>
                <div className="modal-body">
                    <form>
                        <label htmlFor="id">
                            Movie Id
                            <input
                                id="id"
                                value={newMovieData.id}
                                onChange={onValueChanged}
                                disabled
                            />
                        </label>

                        <label htmlFor="title">
                            Title
                            <input
                                id="title"
                                value={newMovieData.title}
                                onChange={onValueChanged}
                            />
                        </label>

                        <label htmlFor="release_date">
                            Release date
                            <input
                                id="release_date"
                                value={newMovieData.release_date}
                                onChange={onValueChanged}
                                type="date"
                            />
                        </label>

                        <label htmlFor="poster_path">
                            Movie URL
                            <input
                                id="poster_path"
                                value={newMovieData.poster_path}
                                onChange={onValueChanged}
                            />
                        </label>

                        <label htmlFor="genres">
                            Genre
                            <input
                                id="genres"
                                value={newMovieData.genres.join(', ')}
                                disabled
                            />
                            <Select dropdownToggleMaterialIconTextClass="keyboard_arrow_down">
                                <ul className="select-body">
                                    {selectCategory.map((el) => (
                                        <li key={el.value}>
                                            <label htmlFor={el.value}>
                                                <input
                                                    type="checkbox"
                                                    value={el.value}
                                                    checked={newMovieData.genres.includes(
                                                        el.value
                                                    )}
                                                    onChange={
                                                        handleCheckboxChecked
                                                    }
                                                />
                                                <span className="select-item-value">
                                                    {el.value}
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </Select>
                        </label>

                        <label htmlFor="overview">
                            Overview
                            <input
                                id="overview"
                                value={newMovieData.overview}
                                onChange={onValueChanged}
                            />
                        </label>

                        <label htmlFor="runtime">
                            Runtime
                            <input
                                id="runtime"
                                value={newMovieData.runtime}
                                onChange={onValueChanged}
                            />
                        </label>
                    </form>
                </div>
                <div className="modal-footer">
                    {handleEditReset && (
                        <Button
                            text="Reset"
                            className="confirm-reset"
                            onClick={handleEditReset}
                        />
                    )}
                    {handleEditSave && (
                        <Button
                            text="Save"
                            className="confirm-save"
                            onClick={handleEditSave}
                        />
                    )}
                    {handleNewMovieSave && (
                        <Button
                            text="Save"
                            className="confirm-save"
                            onClick={handleNewMovieSave}
                        />
                    )}
                </div>
            </>
        </Modal>
    );
};

export default ModifyModal;
