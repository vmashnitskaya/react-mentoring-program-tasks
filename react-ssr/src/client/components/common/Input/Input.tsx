import React, {ChangeEvent, FunctionComponent} from 'react';

interface InputProps {
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  value: string | number;
  label?: string;
  disabled?: boolean;
  children?: JSX.Element;
}

const Input: FunctionComponent<InputProps> = ({type = "text", onChange, children, id, value, label, disabled }) => {

  return (
      <label htmlFor={id}>
        {label}
        <input
            id={id}
            value={value}
            onChange={onChange}
            type={type}
            disabled={disabled}
        />
        {children}
      </label>
  );
};

export default Input;
