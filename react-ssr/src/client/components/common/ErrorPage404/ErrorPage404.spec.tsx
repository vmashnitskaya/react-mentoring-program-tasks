import React from 'react';
import { render } from '@testing-library/react';
import ErrorPage404 from "./ErrorPage404";

describe('ErrorPage404', () =>{
    test('renders error page 404 snapshot', () => {
        const {asFragment} = render(<ErrorPage404 />);

        expect(asFragment()).toMatchSnapshot();
    });
});
