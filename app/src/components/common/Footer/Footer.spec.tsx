import React from 'react';
import { render } from '@testing-library/react';
import Footer from "./Footer";

describe('Button', () =>{
    test('renders button snapshot', () => {
        const {asFragment} = render(<Footer />);

        expect(asFragment()).toMatchSnapshot();
    })
})
