import React, { PureComponent } from 'react';
import loadable from '@loadable/component';
import '../Modal/Modal';
import './Select.scss';

const Button = loadable(() => import('../Button/Button'));

interface SelectProps {
    dropdownToggleMaterialIconTextClass: string;
    children: JSX.Element;
}

interface SelectState {
    isDropdownOpened: boolean;
}

class Select extends PureComponent<SelectProps, SelectState> {
    selectWrapperRef: React.RefObject<HTMLDivElement>;

    constructor(props: SelectProps) {
        super(props);
        this.state = { isDropdownOpened: false };
        this.selectWrapperRef = React.createRef();
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(): void {
        this.setState((state) => ({
            isDropdownOpened: !state.isDropdownOpened,
        }));
    }

    render(): JSX.Element {
        const { children, dropdownToggleMaterialIconTextClass } = this.props;
        const { isDropdownOpened } = this.state;
        return (
            <div className="select-wrapper">
                <Button
                    text={dropdownToggleMaterialIconTextClass}
                    className="material-icons select-toggle"
                    data-testid="select-toggle"
                    onClick={this.toggleDropdown}
                    isLowerCase
                />
                {isDropdownOpened && children}
            </div>
        );
    }
}

export default Select;
