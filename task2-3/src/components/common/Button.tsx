import React, { FunctionComponent, MouseEvent } from 'react';
import './Button.scss';

interface ButtonProps {
    text: string;
    submit?: boolean;
    className?: string;
    value?: string;
    onClick?: (eventPerformed: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FunctionComponent<ButtonProps> = ({
    text,
    submit,
    className,
    value,
    onClick,
}): JSX.Element => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        const eventPerformed = event;

        if (onClick) {
            onClick(eventPerformed);
        }
    };

    return (
        <button
            className={`${className} uppercase`}
            type={submit ? 'submit' : 'button'}
            data-value={value}
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

export default Button;
