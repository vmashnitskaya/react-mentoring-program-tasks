import React, { FunctionComponent } from 'react';
import tabsHeaders from '../../../staticData/tabsHeaders';
import './Tabs.scss';
import Button from '../../common/Button';

const Tabs: FunctionComponent = () => {
    return (
        <ul className="tabs">
            {tabsHeaders.map((header) => (
                <li className="tab" key={header}>
                    <Button text={header} />
                </li>
            ))}
        </ul>
    );
};

export default Tabs;
