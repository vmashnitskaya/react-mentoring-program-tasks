import React, { FunctionComponent } from 'react';
import loadable from '@loadable/component';

const Button = loadable(() => import('../../../common/Button/Button'));
const Modal = loadable(() => import('../../../common/Modal/Modal'));

interface DeleteModalProps {
    toggleDeleteModalClose: () => void;
    onMovieDelete: () => void;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
    toggleDeleteModalClose,
    onMovieDelete,
}) => {
    return (
        <Modal
            headerText="Delete movie"
            handleModalClose={toggleDeleteModalClose}
        >
            <>
                <div className="modal-body">
                    <p>Are you sure to delete this movie?</p>
                </div>
                <div className="modal-actions">
                    <Button
                        text="Confirm"
                        className="confirm-delete"
                        onClick={onMovieDelete}
                    />
                </div>
            </>
        </Modal>
    );
};

export default DeleteModal;
