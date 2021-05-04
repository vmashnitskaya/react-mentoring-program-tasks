import React, { FunctionComponent } from 'react';
import loadable from '@loadable/component';
import './Footer.scss';

const Logo = loadable(() => import('../Logo/Logo'));

const Footer: FunctionComponent = () => {
    return (
        <footer>
            <Logo />
        </footer>
    );
};

export default Footer;
