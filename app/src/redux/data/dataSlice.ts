import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FilmData } from '../../components/filmData';
import fetchMovies from './movieHttp';

export interface SortData {
    title: string;
    direction: string;
    value: string;
}

interface DataSliceInterface {
    loading: boolean;
    error: string | undefined;
    data: Array<FilmData>;
    sortData: SortData;
    filterValue: string;
    searchValue: string;
    currentFilmDisplayed: FilmData | undefined;
}

const DEFAULT_SORT = {
    title: 'Release date',
    direction: 'asc',
    value: 'release_date',
};

const INITIAL_STATE: DataSliceInterface = {
    loading: false,
    error: '',
    data: [],
    sortData: DEFAULT_SORT,
    filterValue: 'All',
    searchValue: '',
    currentFilmDisplayed: undefined,
};

export const fetchSortedFilteredSearchedMovies = createAsyncThunk<
    Array<FilmData>,
    {
        searchValue: string;
        filterValue: string;
        sortData: SortData;
    }
>('data/fetchCustomData', async (args) => {
    const { searchValue, filterValue, sortData } = args;
    let url = 'http://localhost:4000/movies?';

    url += searchValue ? `search=${searchValue}&searchBy=title&` : '';
    url +=
        filterValue && filterValue.toLowerCase() !== 'all'
            ? `filter=${filterValue}&`
            : '';
    url += sortData
        ? `sortBy=${sortData.value}&sortOrder=${sortData.direction}&`
        : '';
    url += 'limit=200';

    const response = await fetchMovies(encodeURI(url));
    return response.data;
});

const fetchUpdatedData = (state: any, dispatch: any) => {
    const { searchValue, filterValue, sortData } = state;

    dispatch(
        fetchSortedFilteredSearchedMovies({
            searchValue,
            filterValue,
            sortData,
        })
    );
};

export const deleteMovie = createAsyncThunk<void, number, { state: any }>(
    'data/deleteMovie',
    async (id, { getState, dispatch }) => {
        const url = `http://localhost:4000/movies/${id}`;
        await fetchMovies(encodeURI(url), 'DELETE');

        fetchUpdatedData(getState().data, dispatch);
    }
);

export const updateMovie = createAsyncThunk<void, FilmData, { state: any }>(
    'data/updateMovie',
    async (film, { getState, dispatch }) => {
        const url = `http://localhost:4000/movies`;
        await fetchMovies(encodeURI(url), 'PUT', film);

        fetchUpdatedData(getState().data, dispatch);
    }
);

export const addMovie = createAsyncThunk<void, FilmData, { state: any }>(
    'data/addMovie',
    async (film, { getState, dispatch }) => {
        const { id, ...filmData } = film;
        const url = `http://localhost:4000/movies`;
        await fetchMovies(encodeURI(url), 'POST', filmData);

        fetchUpdatedData(getState().data, dispatch);
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState: INITIAL_STATE,
    reducers: {
        setSortData: (state, action) => {
            state.sortData = action.payload;
        },
        setDefaultSortData: (state) => {
            state.sortData = DEFAULT_SORT;
        },
        setFilterValue: (state, action) => {
            state.filterValue = action.payload;
        },
        setDefaultFilterValue: (state) => {
            state.filterValue = 'All';
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        setDefaultSearchValue: (state) => {
            state.searchValue = '';
        },
        setCurrentFilmDisplayed: (state, action) => {
            state.currentFilmDisplayed = action.payload;
        },
        resetCurrentFilmDisplayed: (state) => {
            state.currentFilmDisplayed = undefined;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchSortedFilteredSearchedMovies.fulfilled,
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
            }
        );
        builder.addCase(fetchSortedFilteredSearchedMovies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            fetchSortedFilteredSearchedMovies.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }
        );
        builder.addCase(deleteMovie.fulfilled, (state) => {
            state.loading = false;
            state.currentFilmDisplayed = undefined;
        });
        builder.addCase(deleteMovie.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(updateMovie.fulfilled, (state) => {
            state.loading = false;
            state.currentFilmDisplayed = undefined;
        });
        builder.addCase(updateMovie.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(addMovie.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(addMovie.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const {
    setSortData,
    setDefaultSortData,
    setFilterValue,
    setDefaultFilterValue,
    setSearchValue,
    setDefaultSearchValue,
    setCurrentFilmDisplayed,
    resetCurrentFilmDisplayed,
} = dataSlice.actions;

export default dataSlice.reducer;
