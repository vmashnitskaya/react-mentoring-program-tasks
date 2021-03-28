const getMovies = async (url: string) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (e) {
        throw new Error(e.message || 'Something went wrong.');
    }
};

export { getMovies };
