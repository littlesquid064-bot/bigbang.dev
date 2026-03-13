import React from 'react';

function InputField({ label, type = 'text', value, onChange, placeholder, id, name, readOnly = false }) {
  return (
    <div className="form-group">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-input"
        readOnly={readOnly}
      />
    </div>
  );
}

export default InputField;
