import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from "./App";


test('greeting renders correctly', async () => {
    const { getByText } = render(<App />)

    expect(getByText('greeting')).toBeInTheDocument();
})
