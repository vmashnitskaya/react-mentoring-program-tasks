import React from 'react';
import { render } from '@testing-library/react';
import Select from "./Select";

describe('Select', () => {
    test('renders select snapshot', () => {
        const {asFragment} = render(<Select dropdownToggleMaterialIconTextClass={'close-icon'}>
            <ul>
                <li>Test item</li>
            </ul>
        </Select>);

        expect(asFragment()).toMatchSnapshot();
    });
});
