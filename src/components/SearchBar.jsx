import React, { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search recipes by name or ingredient..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="input-field"
      />
      <button onClick={handleSearchClick} className="button">
        <Search size={20} />
        Search
      </button>
    </div>
  );
}

export default SearchBar;