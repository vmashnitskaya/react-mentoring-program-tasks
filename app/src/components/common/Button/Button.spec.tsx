import React from 'react';
import { render } from '@testing-library/react';
import Button from "./Button";

describe('Button', () =>{
    test('renders button snapshot', () => {
        const {asFragment} = render(<Button text={"Button"}/>);

        expect(asFragment()).toMatchSnapshot();
    });
});
