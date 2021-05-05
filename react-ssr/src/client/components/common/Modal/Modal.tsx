import React, { PureComponent } from 'react';
import loadable from '@loadable/component';
import ReactDOM from 'react-dom';
import './Modal.scss';

const Button = loadable(() => import('../Button/Button'));

const isClient = typeof window !== 'undefined' && window.document && window.document.createElement;

export let modalRoot;

if(isClient) {
    modalRoot = document.getElementById('modal-root') as HTMLElement;
    if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(modalRoot);
    }
}


interface ModalProps {
    headerText: string;
    children: JSX.Element;
    handleModalClose: () => void;
}

interface ModalState {
    mounted: boolean
}

class Modal extends PureComponent<ModalProps, ModalState> {

    constructor(props) {
        super(props);
        this.state = { mounted: false };
    }

    componentDidMount() {
        this.setState({mounted: true});
    }

    render(): JSX.Element {
        const { headerText, children, handleModalClose } = this.props;

        return this.state.mounted ? ReactDOM.createPortal(
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
        ) : null;
    }
}

export default Modal;
