import React from 'react';
import { render } from '@testing-library/react';
import Input from "./Input";

describe('Input', () => {
    test('renders input snapshot', () => {
        const onChangeFunction = jest.fn();
        const {asFragment} = render(<Input id={"id"} value={'value'} onChange={onChangeFunction}/>);

        expect(asFragment()).toMatchSnapshot();
    });
});
