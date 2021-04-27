import React, { FunctionComponent } from 'react';
import './Logo.scss';

const Logo: FunctionComponent = () => {
    return (
        <a href="/" className="logo">
            <span className="logo-netflix">netflix</span>
            <span>roulette</span>
        </a>
    );
};

export default Logo;
