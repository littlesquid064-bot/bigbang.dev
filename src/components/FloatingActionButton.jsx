import React from 'react';
import { Link } from 'react-router-dom';

const FloatingActionButton = ({ children, to, onClick }) => {
  if (to) {
    return (
      <Link to={to} className="fab">
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="fab">
      {children}
    </button>
  );
};

export default FloatingActionButton;
