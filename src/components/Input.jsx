import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, placeholder, className = '', ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${className}`.trim()}
        {...props}
      />
    </div>
  );
};

export default Input;
