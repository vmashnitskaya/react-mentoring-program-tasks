import React, { FunctionComponent } from 'react';
import tabsHeaders from '../../../../staticData/tabsHeaders';
import './Tabs.scss';
import Button from '../../../common/Button/Button';
import clsx from 'clsx';

interface TabsProps {
    onGenreChanged: (value: string) => void;
    filter: string;
}

const Tabs: FunctionComponent<TabsProps> = ({ onGenreChanged, filter }) => {
    return (
        <ul className="tabs">
            {tabsHeaders.map((header) => (
                <li
                    className={clsx('tab', filter === header ? 'active' : '')}
                    key={header}
                >
                    <Button
                        text={header}
                        onClick={() => onGenreChanged(header)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default Tabs;
