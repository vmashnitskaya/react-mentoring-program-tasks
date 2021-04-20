import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';
import './Modal.scss';

export let modalRoot = document.getElementById('modal-root') as HTMLElement;
if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
}

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
                    <div className="close" data-testid={"close"}>
                        <Button
                            className="material-icons select-toggle"
                            onClick={handleModalClose}
                            text="close"
                            isLowerCase
                        />
                    </div>

                    <div className="modal-header" data-testid='modal-header'>{headerText}</div>
                    {children}
                </div>
            </div>,
            modalRoot
        );
    }
}

export default Modal;
