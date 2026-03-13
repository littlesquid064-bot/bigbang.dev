import React from 'react';

function ToggleSwitch({ label, checked, onChange, id }) {
  return (
    <label htmlFor={id} className="toggle-switch">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <span className="toggle-switch-slider"></span>
      <span className="form-label" style={{ marginBottom: 0 }}>
        {label}
      </span>
    </label>
  );
}

export default ToggleSwitch;
