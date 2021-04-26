import React, { FunctionComponent } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from '../../common/Select/Select';
import Button from '../../common/Button/Button';
import { FilmData } from '../../filmData';
import selectCategory from '../../../staticData/select';
import Modal from '../../common/Modal/Modal';

interface EditModalProps {
    toggleModalClose: () => void;
    newMovieData: FilmData;
    handleEditReset?: () => void;
    handleEditSave?: (formValues: FilmData) => void;
    handleNewMovieSave?: (formValues: FilmData) => void;
}

const ModifyModal: FunctionComponent<EditModalProps> = ({
    toggleModalClose,
    newMovieData,
    handleEditReset,
    handleEditSave,
    handleNewMovieSave,
}) => {
    const DisplayingErrorMessagesSchema = Yup.object().shape({
        title: Yup.string().required('Required'),
        tagline: Yup.string().required('Required'),
        vote_average: Yup.number().max(100),
        vote_count: Yup.number(),
        release_date: Yup.date(),
        poster_path: Yup.string().url().required('Required'),
        overview: Yup.string().required('Required'),
        budget: Yup.number().min(0, 'Should be positive number'),
        revenue: Yup.number().min(0, 'Should be positive number'),
        runtime: Yup.number().min(0, 'Should be positive number').required('Required'),
        genres: Yup.array().of(Yup.string()).min(1, "Minimum 1 genre should be selected").required('Required')
    });

    return (
        <Modal headerText={handleEditSave ? "Edit movie" : "Add movie"} handleModalClose={toggleModalClose}>
                <div className="modal-body">
                    <Formik initialValues={newMovieData}
                            validationSchema={DisplayingErrorMessagesSchema}
                            onSubmit={(values) => {
                                const newValues = {...values};

                                ["vote_average", "vote_count", "budget", "revenue", "runtime"].forEach(value => {
                                    (newValues as any)[value] = Number((values as any)[value]);
                                });

                                if (handleEditSave) {
                                    handleEditSave(newValues);
                                }

                                if (handleNewMovieSave) {
                                    handleNewMovieSave(newValues);
                                }
                            }}>

                        {({values, errors, touched, submitForm}) => (
                            <Form>
                                <label>
                                    Title
                                    <Field name="title" id="title" data-testid='title'/>
                                </label>
                                <ErrorMessage name="title"  component="div" className="error"/>

                                <label>
                                    Tagline
                                    <Field name="tagline" id="tagline" data-testid='tagline'/>
                                </label>
                                <ErrorMessage name="tagline"  component="div" className="error"/>

                                <label>
                                    Vote average
                                    <Field name="vote_average" id="vote_average" data-testid='vote_average'/>
                                </label>
                                {errors.vote_average && touched.vote_average ? (
                                    <div className="error">Value should be a positive number less or equal to 100</div>
                                 ) : null}

                                <label>
                                    Vote count
                                    <Field name="vote_count" id="vote_count" data-testid='vote_count'/>
                                </label>
                                {errors.vote_count && touched.vote_count ? (
                                    <div className="error">Value should be positive a number</div>
                                ) : null}

                                <label>
                                    Release date
                                    <Field name="release_date" id="release_date" type="date" data-testid='release_date'/>
                                </label>
                                <ErrorMessage name="release_date"  component="div" className="error"/>

                                <label>
                                    Poster URL
                                    <Field name="poster_path" id="poster_path" data-testid='poster_path' />
                                </label>
                                {errors.poster_path && touched.poster_path ? (
                                    <div className="error">Poster path should be a valid URl</div>
                                ) : null}

                                <label>
                                    Genre
                                    <Field  value={values.genres.join(', ')} disabled  data-testid='genres'/>
                                    <Select dropdownToggleMaterialIconTextClass="keyboard_arrow_down">
                                        <ul className="select-body">
                                            {selectCategory.map((el) => (
                                                <li key={el.value}>
                                                    <label>
                                                        <Field name="genres" id="genres" type="checkbox" value={el.value} />
                                                        <span className="select-item-value">
                                                            {el.value}
                                                        </span>
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </Select>
                                </label>
                                <ErrorMessage name="genres"  component="div" className="error"/>

                                <label>
                                    Overview
                                    <Field name="overview" id="overview" data-testid='overview'/>
                                </label>
                                <ErrorMessage name="overview"  component="div" className="error"/>

                                <label>
                                    Budget
                                    <Field name="budget" id="budget" data-testid='budget'/>
                                </label>
                                {errors.budget && touched.budget ? (
                                    <div className="error">Value should be a positive number</div>
                                ) : null}

                                <label>
                                    Revenue
                                    <Field name="revenue" id="revenue" data-testid='revenue' />
                                </label>
                                {errors.revenue && touched.revenue ? (
                                    <div className="error">Value should be a positive number</div>
                                ) : null}

                                <label>
                                    Runtime
                                    <Field name="runtime" id="runtime" data-testid='runtime' />
                                </label>
                                {errors.runtime && touched.runtime ? (
                                    <div className="error">Value should be a positive number</div>
                                ) : null}

                                <div className="modal-actions">
                                    {handleEditReset && (
                                        <Button
                                            text="Reset"
                                            className="confirm-reset"
                                            onClick={handleEditReset}
                                        />
                                    )}
                                    {handleEditSave && (
                                        <Button
                                            submit
                                            text="Save"
                                            className="confirm-save"
                                            onClick={submitForm}
                                        />
                                    )}
                                    {handleNewMovieSave && (
                                        <Button
                                            submit
                                            text="Save"
                                            className="confirm-save"
                                            onClick={submitForm}
                                        />
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
        </Modal>
    );
};

export default ModifyModal;
