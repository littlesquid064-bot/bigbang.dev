import React from 'react';

function Button({ children, onClick, variant = 'primary', icon: Icon, type = 'button' }) {
  const buttonClass = `button button-${variant}`;

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}

export default Button;
