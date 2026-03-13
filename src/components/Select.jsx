import React from 'react';

const Select = ({ label, id, value, onChange, options, className = '', ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`select-field ${className}`.trim()}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
