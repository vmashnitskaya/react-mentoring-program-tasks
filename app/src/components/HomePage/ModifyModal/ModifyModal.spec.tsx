import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModifyModal from './ModifyModal';
import {FilmData} from '../../filmData';

const DEFAULT_VALUE: FilmData = {
    id: 0,
    title: '',
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '',
    poster_path: '',
    overview: '',
    budget: 0,
    revenue: 0,
    genres: [],
    runtime: 0,
};

describe('Modify modal', () => {
    const toggleModalClose = jest.fn();
    const handleNewMovieSave = jest.fn();

    test('renders modify modal', () => {
        const {asFragment} = render(<ModifyModal toggleModalClose={toggleModalClose} newMovieData={DEFAULT_VALUE} handleNewMovieSave={handleNewMovieSave} />);

        expect(asFragment()).toMatchSnapshot();
    });
    test('renders modify modal text input', () => {
        render(<ModifyModal toggleModalClose={toggleModalClose} newMovieData={DEFAULT_VALUE} handleNewMovieSave={handleNewMovieSave} />);

        const newValue = 'Test';
        const titleInput = screen.getByTestId('title') as HTMLInputElement;

        expect(titleInput.value).toBe('');
        fireEvent.change(titleInput, { target: { value: newValue } });
        expect(titleInput.value).toBe(newValue);

        fireEvent.change(titleInput, { target: { value: '' } });
        expect(titleInput.value).toBe('');
    });
    test('renders modify modal number input', () => {
        render(<ModifyModal toggleModalClose={toggleModalClose} newMovieData={DEFAULT_VALUE} handleNewMovieSave={handleNewMovieSave} />);

        const newValue = '1';
        const voteAverageInput = screen.getByTestId('vote_average') as HTMLInputElement;

        expect(voteAverageInput.value).toBe('0');
        fireEvent.change(voteAverageInput, { target: { value: newValue } });
        expect(voteAverageInput.value).toBe(newValue);
    });

    test('do not submit empty modal input', () => {
        render(<ModifyModal toggleModalClose={toggleModalClose} newMovieData={DEFAULT_VALUE} handleNewMovieSave={handleNewMovieSave} />);

        const submitButton = screen.getByText('Save');
        fireEvent.click(submitButton);

        expect(handleNewMovieSave).toHaveBeenCalledTimes(0);
        expect(toggleModalClose).toHaveBeenCalledTimes(0);
    });
    test('submit modal input', async () => {
        render(<ModifyModal toggleModalClose={toggleModalClose} newMovieData={{...DEFAULT_VALUE, genres: ['Drama']}} handleNewMovieSave={handleNewMovieSave} />);

        const submitButton = screen.getByText('Save');
        fireEvent.change(screen.getByTestId('title'), {target: {value: 'Title'}});
        fireEvent.change(screen.getByTestId('tagline'), {target: {value: 'Tagline'}});
        fireEvent.change(screen.getByTestId('vote_average'), {target: {value: '1'}});
        fireEvent.change(screen.getByTestId('vote_count'), {target: {value: '1'}});
        fireEvent.change(screen.getByTestId('release_date'), {target: {value: '2016-12-29'}});
        fireEvent.change(screen.getByTestId('poster_path'), {target: {value: 'https://image.tmdb.org/t/p/w500/ylXCdC106IKiarftHkcacasaAcb.jpg'}});
        fireEvent.change(screen.getByTestId('overview'), {target: {value: 'Overview'}});
        fireEvent.change(screen.getByTestId('budget'), {target: {value: '3000'}});
        fireEvent.change(screen.getByTestId('revenue'), {target: {value: '445435700'}});
        fireEvent.change(screen.getByTestId('runtime'), { target: {value: ['1']}});
        fireEvent.submit(submitButton);

        await waitFor(() => {
            expect(handleNewMovieSave).toHaveBeenCalledTimes(1);
        });
    });
    test('close modal', async () => {
        render(<ModifyModal toggleModalClose={toggleModalClose} newMovieData={{...DEFAULT_VALUE, genres: ['Drama']}} handleNewMovieSave={handleNewMovieSave} />);

        const submitButton = screen.getByTestId('close').firstChild;

        if (submitButton) {
            fireEvent.click(submitButton);
            expect(toggleModalClose).toHaveBeenCalledTimes(1);
        }
    });
});
