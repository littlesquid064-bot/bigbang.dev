import React from 'react';
import { Search, User } from 'lucide-react';

function HeaderBar() {
  return (
    <header className="header-bar">
      <h1>KitchenFlow</h1>
      <div className="header-actions">
        <button className="header-icon-button" aria-label="Search">
          <Search size={20} />
        </button>
        <button className="header-icon-button" aria-label="User Profile">
          <User size={20} />
        </button>
      </div>
    </header>
  );
}

export default HeaderBar;