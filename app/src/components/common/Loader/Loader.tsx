import React, { FunctionComponent } from 'react';
import './Loader.scss';

const Loader: FunctionComponent = () => {
    return (
        <div className="loader-wrapper">
            <div className="lds-ring">
                <div />
                <div />
                <div />
                <div />
            </div>
        </div>
    );
};

export default Loader;
