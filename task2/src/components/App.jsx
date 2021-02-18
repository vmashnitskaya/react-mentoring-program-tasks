import React from 'react';

export const GREETING = 'Hello world';
export const GREETING_TEST_ID = 'greeting';

const App = () => {
    return <div className={GREETING_TEST_ID}>{GREETING}</div>;
}

export default App;
