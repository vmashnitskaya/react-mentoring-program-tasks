import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../../../../redux/data/dataSlice';
import tabsHeaders from '../../../../staticData/tabsHeaders';
import './Tabs.scss';
import Button from '../../../common/Button/Button';
import clsx from 'clsx';

interface TabsProps {
    filter: string;
}

const Tabs: FunctionComponent<TabsProps> = ({ filter }) => {
    const dispatch = useDispatch();
    return (
        <ul className="tabs">
            {tabsHeaders.map((header) => (
                <li
                    className={clsx('tab', filter === header ? 'active' : '')}
                    key={header}
                >
                    <Button
                        text={header}
                        onClick={() => dispatch(setFilterValue(header))}
                    />
                </li>
            ))}
        </ul>
    );
};

export default Tabs;
