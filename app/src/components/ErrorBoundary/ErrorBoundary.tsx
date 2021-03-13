import React, { FunctionComponent } from 'react';
import './ErrorBoundary.scss';
import Button from '../common/Button/Button';

interface ErrorBoundaryProps {
    isEverythingOk: boolean;
    children: JSX.Element;
}

const ErrorBoundary: FunctionComponent<ErrorBoundaryProps> = ({
    isEverythingOk,
    children,
}) => {
    return isEverythingOk ? (
        children
    ) : (
        <div className="page-not-found wrapper">
            <img src="/images/404.svg" alt="404 error" />
            <Button text="Go back home" />
        </div>
    );
};

export default ErrorBoundary;
