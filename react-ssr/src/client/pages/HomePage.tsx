import React, { PureComponent } from 'react';
import SearchArea from "../components/App/SearchArea";
import ResultArea from "../components/App/ResultArea";
import {FilmData} from "../components/filmData";
import {SortData} from "../../redux/data/dataSlice";

interface HomePageProps {
    data: Array<FilmData>;
    sortData: SortData;
    filter: string
}

class HomePage extends PureComponent<HomePageProps> {
    constructor(props) {
        super(props);
    }

  render() {
        const {data, sortData, filter} = this.props;
    return (
        <>
          <SearchArea/>
          <ResultArea data={data} sortData={sortData} filter={filter} />
        </>
    );
  }
}


export default HomePage;
