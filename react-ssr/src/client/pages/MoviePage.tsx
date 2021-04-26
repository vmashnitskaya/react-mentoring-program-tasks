import React, {FunctionComponent, PureComponent, useEffect} from 'react';
import {FilmData} from "../components/filmData";
import {fetchMovie, resetErrorState, SortData} from "../../redux/data/dataSlice";
import MovieDetails from "../components/App/MovieDetails";
import ResultArea from "../components/App/ResultArea";
import {useHistory, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import SearchArea from "../components/App/SearchArea";
import {connect} from "formik";

interface MoviePageProps {
    data: Array<FilmData>;
    sortData: SortData;
    filter: string;
}

interface UseParamsProps {
    id: string;
}

const MoviePage: FunctionComponent<MoviePageProps> = ({data, sortData, filter}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams<UseParamsProps>();

    useEffect(() => {
        dispatch(fetchMovie(id));
    }, [id])

    const error = useSelector((state) => state.data.error);

    useEffect(() => {
        if (error) {
            history.push("/error_404");
            dispatch(resetErrorState());
        }
    }, [error]);

  return (
      <>
          <MovieDetails />
          <ResultArea data={data} sortData={sortData} filter={filter} />
      </>
  );
};

export default MoviePage;
