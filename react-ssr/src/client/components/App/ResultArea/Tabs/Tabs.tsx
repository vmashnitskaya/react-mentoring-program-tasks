import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import loadable from '@loadable/component';
import { setFilterValue } from '../../../../../redux/data/dataSlice';
import tabsHeaders from '../../../../staticData/tabsHeaders';
import './Tabs.scss';
import clsx from 'clsx';

const Button = loadable(() => import('../../../common/Button/Button'));

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
