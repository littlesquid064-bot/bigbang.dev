import React from 'react';

function FloatingActionButton({ icon, onClick, label = "Add" }) {
  return (
    <button className="fab" onClick={onClick} aria-label={label}>
      {icon}
    </button>
  );
}

export default FloatingActionButton;