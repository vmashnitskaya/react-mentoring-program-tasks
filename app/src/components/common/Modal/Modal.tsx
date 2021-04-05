import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';
import './Modal.scss';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface ModalProps {
    headerText: string;
    children: JSX.Element;
    handleModalClose: () => void;
}

class Modal extends PureComponent<ModalProps, unknown> {
    render(): JSX.Element {
        const { headerText, children, handleModalClose } = this.props;

        return ReactDOM.createPortal(
            <div className="overlay-modal">
                <div className="modal">
                    <div className="close">
                        <Button
                            className="material-icons select-toggle"
                            onClick={handleModalClose}
                            text="close"
                            isLowerCase
                        />
                    </div>

                    <div className="modal-header">{headerText}</div>
                    {children}
                </div>
            </div>,
            modalRoot
        );
    }
}

export default Modal;
