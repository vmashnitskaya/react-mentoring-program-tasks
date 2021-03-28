import React from 'react';
import HomePage from './HomePage';
import Logo from './common/Logo/Logo';
import Footer from './common/Footer/Footer';

const App = (): JSX.Element => {
    return (
        <>
            <Logo />
            <HomePage />
            <Footer />
        </>
    );
};

export default App;
