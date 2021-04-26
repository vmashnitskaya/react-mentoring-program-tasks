import React from 'react';
import { render } from '@testing-library/react';
import Footer from "./Footer";

describe('Footer', () =>{
    test('renders footer snapshot', () => {
        const {asFragment} = render(<Footer />);

        expect(asFragment()).toMatchSnapshot();
    });
});
