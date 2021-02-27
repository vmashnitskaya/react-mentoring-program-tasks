import React, { FunctionComponent } from 'react';
import Tabs from './Tabs';
import './ResultActionBar.scss';
import sortData from '../../staticData/sortData';
import Dropdown from '../../common/Dropdown';

const ResultActionBar: FunctionComponent = () => {
    return (
        <div className="action-bar">
            <Tabs />
            <Dropdown data={sortData} />
        </div>
    );
};

export default ResultActionBar;
