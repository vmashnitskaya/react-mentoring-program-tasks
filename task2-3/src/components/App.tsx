import React, { useState } from 'react';
import HomePage from './HomePage';
import Logo from './common/Logo/Logo';
import Footer from './common/Footer/Footer';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

const App = (): JSX.Element => {
    const [isEverythingOk, setIsEverythingOk] = useState(true);

    const handleEverythingOkChange = (value: boolean) => {
        setIsEverythingOk(value);
    };

    return (
        <>
            <Logo />
            <ErrorBoundary isEverythingOk={isEverythingOk}>
                <HomePage handleEverythingOkChange={handleEverythingOkChange} />
            </ErrorBoundary>
            <Footer />
        </>
    );
};

export default App;
