import React from 'react';

function Dropdown({ label, value, onChange, options, id, name }) {
  return (
    <div className="form-group dropdown-container">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
