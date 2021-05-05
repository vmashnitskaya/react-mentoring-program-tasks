import React, { FunctionComponent } from 'react';
import loadable from '@loadable/component';
import './ResultActionBar.scss';
import { SortData } from '../../../../../redux/data/dataSlice';

const SortDropdown = loadable(() => import('../SortDropdown/SortDropdown'));
const Tabs = loadable(() => import('../Tabs/Tabs'));

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
