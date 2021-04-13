import React, { FunctionComponent } from 'react';
import './ErrorPage404.scss';
import { Link } from "react-router-dom";
import Button from '../../common/Button/Button';


const ErrorPage404: FunctionComponent = () => {
        return <div className="page-not-found wrapper">
            <img src="/images/404.svg" alt="404 error" />
            <Link to={"/home"}>
                <Button text="Go back home" />
            </Link>
        </div>
};

export default ErrorPage404;
