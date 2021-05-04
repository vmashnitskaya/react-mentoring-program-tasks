import React, { FunctionComponent } from 'react';
import loadable from '@loadable/component';
import {useHistory} from "react-router-dom";
import './NoFilmsFound.scss';

const Button = loadable(() => import('../Button/Button'));

const NoFilmsFound: FunctionComponent = () => {
    const history = useHistory();

    const handleBackHome = () => {
        history.push("/");
    }

    return (
        <div className="no-films">
            <h2>No films found</h2>
            <Button text="Go back home" onClick={handleBackHome}/>
        </div>
    );
};

export default NoFilmsFound;
