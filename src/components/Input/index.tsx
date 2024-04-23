import "./style.css";

import { ChangeEventHandler } from "react";

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  onChange,
  leftContent,
  rightContent,
  placeholder,
}) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        type="text"
        id={name}
        name={name}
        className="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <span className="content-left">
        {leftContent}
      </span>
      <span className="content-right">
        {rightContent}
      </span>
    </div>
  );
};

export default Input;
