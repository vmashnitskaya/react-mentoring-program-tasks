import React, { FunctionComponent } from 'react';
import Tabs from './Tabs';
import './ResultActionBar.scss';
import SortDropdown from './SortDropdown';
import { SortData } from '../HomePage';

interface ResultActionBarProps {
    onGenreChanged: (value: string) => void;
    onSortPerformed: (title: string, direction: string, value: string) => void;
    sortData: SortData;
    filter: string;
}

const ResultActionBar: FunctionComponent<ResultActionBarProps> = ({
    onGenreChanged,
    onSortPerformed,
    sortData,
    filter,
}) => {
    return (
        <div className="action-bar">
            <Tabs onGenreChanged={onGenreChanged} filter={filter} />
            <SortDropdown
                onSortPerformed={onSortPerformed}
                sortDataSelected={sortData}
            />
        </div>
    );
};

export default ResultActionBar;
