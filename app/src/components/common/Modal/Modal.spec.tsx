import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from "./Modal";

describe('Modal', () => {
    test('renders modal', () => {
        const handleModalClose = jest.fn();
        const modalHeader = 'Modal header';
        render(
            <Modal headerText={modalHeader} handleModalClose={handleModalClose}>
                <div>Children test</div>
            </Modal>);

        expect(screen.getByText(modalHeader)).toBeInTheDocument();
    });
});
