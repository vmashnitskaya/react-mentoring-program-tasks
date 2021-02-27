import React, { FunctionComponent, MouseEvent } from 'react';
import './Button.scss';
import clsx from 'clsx';

interface ButtonProps {
    text: string;
    submit?: boolean;
    className?: string;
    value?: string;
    isLowerCase?: boolean;
    children?: JSX.Element;
    onClick?: (eventPerformed: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FunctionComponent<ButtonProps> = ({
    text,
    submit,
    className,
    value,
    onClick,
    children,
    isLowerCase,
}): JSX.Element => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        const eventPerformed = event;

        if (onClick) {
            onClick(eventPerformed);
        }
    };

    return (
        <button
            className={clsx(
                !isLowerCase && 'uppercase',
                className && className
            )}
            type={submit ? 'submit' : 'button'}
            data-value={value}
            onClick={handleClick}
        >
            {text}
            {children || false}
        </button>
    );
};

export default Button;
