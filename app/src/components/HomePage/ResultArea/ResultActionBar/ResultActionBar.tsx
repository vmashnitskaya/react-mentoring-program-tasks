import React, { FunctionComponent } from 'react';
import Tabs from '../Tabs/Tabs';
import './ResultActionBar.scss';
import SortDropdown from '../SortDropdown/SortDropdown';
import { SortData } from '../../../../redux/data/dataSlice';

interface ResultActionBarProps {
    sortData: SortData;
    filter: string;
}

const ResultActionBar: FunctionComponent<ResultActionBarProps> = ({
    sortData,
    filter,
}) => {
    return (
        <div className="action-bar">
            <Tabs filter={filter} />
            <SortDropdown sortDataSelected={sortData} />
        </div>
    );
};

export default ResultActionBar;
