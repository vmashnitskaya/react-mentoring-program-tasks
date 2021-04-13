import React, { FunctionComponent } from 'react';
import {useHistory} from "react-router-dom";
import './NoFilmsFound.scss';
import Button from "../../common/Button/Button";

const NoFilmsFound: FunctionComponent = () => {
    const history = useHistory();

    const handleBackHome = () => {
        history.push("/home");
    }

    return (
        <div className="no-films">
            <h2>No films found</h2>
            <Button text="Go back home" onClick={handleBackHome}/>
        </div>
    );
};

export default NoFilmsFound;
