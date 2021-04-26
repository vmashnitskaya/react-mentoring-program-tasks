import React, { FunctionComponent } from 'react';
import './ErrorPage404.scss';
import Button from '../Button/Button';


const ErrorPage404: FunctionComponent = () => {
        return <div className="page-not-found wrapper">
            <img src="/images/404.svg" alt="404 error" />
            <a href="/">
                <Button text="Go back home" />
            </a>
        </div>
};

export default ErrorPage404;
