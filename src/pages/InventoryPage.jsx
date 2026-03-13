import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, AlertCircle, ArrowRight, PackageSearch } from 'lucide-react';
import EmptyState from '../components/EmptyState';

const InventoryPage = ({ inventoryItems, showToast, showDialog }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'raw_material', 'finished_product'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'stock'

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredAndSortedItems = inventoryItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'stock') {
        return a.currentStock - b.currentStock;
      }
      return 0;
    });

  if (filteredAndSortedItems.length === 0) {
    return (
      <div className="inventory-page">
        <div className="search-bar-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search inventory items..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-sort-container">
          <select value={filterType} onChange={handleFilterChange} className="dropdown-select">
            <option value="all">All Types</option>
            <option value="raw_material">Raw Materials</option>
            <option value="finished_product">Finished Products</option>
          </select>
          <select value={sortBy} onChange={handleSortChange} className="dropdown-select">
            <option value="name">Sort by Name</option>
            <option value="stock">Sort by Stock</option>
          </select>
        </div>
        <EmptyState
          icon={PackageSearch}
          title="No items found"
          message="Try adjusting your search or filters, or add a new inventory item."
        />
      </div>
    );
  }

  return (
    <div className="inventory-page">
      <div className="search-bar-container">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search inventory items..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="filter-sort-container">
        <select value={filterType} onChange={handleFilterChange} className="dropdown-select">
          <option value="all">All Types</option>
          <option value="raw_material">Raw Materials</option>
          <option value="finished_product">Finished Products</option>
        </select>
        <select value={sortBy} onChange={handleSortChange} className="dropdown-select">
          <option value="name">Sort by Name</option>
          <option value="stock">Sort by Stock</option>
        </select>
      </div>

      <div className="inventory-list">
        {filteredAndSortedItems.map((item) => (
          <Link to={`/inventory/${item.id}`} key={item.id} className="list-item">
            <div className="list-item-content">
              <div className="list-item-title">{item.name}</div>
              <div className="list-item-subtitle">
                Current Stock: {item.currentStock} {item.unit} 
                {item.type === 'finished_product' && item.unitPrice && ` | $${item.unitPrice.toFixed(2)}/${item.unit}`}
              </div>
            </div>
            <div className="list-item-actions flex-row gap-8">
              {item.currentStock <= item.lowStockThreshold && (
                <span className="low-stock-alert">
                  <AlertCircle size={18} /> Low Stock
                </span>
              )}
              <ArrowRight size={20} className="text-color-light" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
