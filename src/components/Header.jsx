import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div className="header-actions">
        <button className="button icon-only">
          <Search size={24} />
        </button>
        <button className="button icon-only">
          <Bell size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
