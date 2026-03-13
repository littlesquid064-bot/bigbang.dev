import React from 'react';

function SelectField({ label, id, value, onChange, options, required = false, error, ...props }) {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`select-field ${error ? 'error' : ''}`}
        {...props}
      >
        <option value="" disabled>Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SelectField;