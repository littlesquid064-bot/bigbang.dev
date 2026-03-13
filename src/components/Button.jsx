import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const buttonClass = `button ${variant} ${className}`.trim();
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
