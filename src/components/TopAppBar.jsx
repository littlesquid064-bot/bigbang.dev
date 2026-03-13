import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, ChevronLeft } from 'lucide-react';

const TopAppBar = ({ title, showAddButton, addLink, showSearchButton, showFilterButton }) => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // In a real app, this might open a search overlay or navigate to a search page
    alert('Search functionality coming soon!');
  };

  const handleFilterClick = () => {
    // In a real app, this might open a filter modal or dropdown
    alert('Filter options coming soon!');
  };

  return (
    <header className="top-app-bar">
      {title !== 'Dashboard' && (
        <button onClick={() => navigate(-1)} className="app-bar-button">
          <ChevronLeft size={24} />
        </button>
      )}
      <h1>{title}</h1>
      <div className="top-app-bar-actions">
        {showSearchButton && (
          <button onClick={handleSearchClick} className="app-bar-button">
            <Search size={24} />
          </button>
        )}
        {showFilterButton && (
          <button onClick={handleFilterClick} className="app-bar-button">
            <Filter size={24} />
          </button>
        )}
        {showAddButton && addLink && (
          <Link to={addLink} className="app-bar-button">
            <Plus size={24} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default TopAppBar;
