import React from 'react';
import { render } from '@testing-library/react';
import NoFilmsFound from "./NoFilmsFound";

describe('No films found', () => {
    test('renders no films found snapshot', () => {
        const {asFragment} = render(<NoFilmsFound />);

        expect(asFragment()).toMatchSnapshot();
    });
});
