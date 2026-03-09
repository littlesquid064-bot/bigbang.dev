import React, { useState } from 'react';
import { Search, XCircle } from 'lucide-react';

function SearchBar({ initialSearchTerm = '', onSearch }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search recipes (e.g., chicken, pasta, vegan)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={handleClear} className="clear-search-button">
            <XCircle size={20} />
          </button>
        )}
        <Search size={20} className="search-icon" />
      </div>
      <button onClick={handleSearch} className="search-button">
        <Search size={18} /> Search
      </button>
    </div>
  );
}

export default SearchBar;