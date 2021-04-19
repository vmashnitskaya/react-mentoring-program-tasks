import { FilmData } from '../../components/filmData';

export const fetchMovies = async (
    url: string,
    method = 'GET',
    film?: Partial<FilmData>
) => {
    try {
        const body = film ? JSON.stringify(film) : undefined;
        const response = await fetch(url, {
            method,
            body,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        if (method !== 'DELETE') {
            const data = await response.json();
            return data;
        }
        return 'Film was deleted';
    } catch (e) {
        throw new Error(e.message || 'Something went wrong.');
    }
};
