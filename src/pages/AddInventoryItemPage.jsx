import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddInventoryItemPage = ({ onAddInventoryItem }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'raw_material',
    unit: '',
    currentStock: 0,
    lowStockThreshold: 10,
    unitPrice: 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.unit || formData.currentStock < 0 || formData.lowStockThreshold < 0) {
      alert('Please fill all required fields with valid values.');
      return;
    }
    onAddInventoryItem(formData);
    navigate('/inventory');
  };

  return (
    <div className="add-inventory-item-page">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="type">Item Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="dropdown-select"
            >
              <option value="raw_material">Raw Material</option>
              <option value="finished_product">Finished Product</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="unit">Unit of Measurement (e.g., kg, pcs)</label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="currentStock">Initial Stock Quantity</label>
            <input
              type="number"
              id="currentStock"
              name="currentStock"
              value={formData.currentStock}
              onChange={handleChange}
              className="input-field"
              min="0"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lowStockThreshold">Low Stock Threshold</label>
            <input
              type="number"
              id="lowStockThreshold"
              name="lowStockThreshold"
              value={formData.lowStockThreshold}
              onChange={handleChange}
              className="input-field"
              min="0"
              required
            />
          </div>
          {formData.type === 'finished_product' && (
            <div className="input-group">
              <label htmlFor="unitPrice">Unit Price</label>
              <input
                type="number"
                id="unitPrice"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                className="input-field"
                min="0"
                step="0.01"
              />
            </div>
          )}
          <div className="form-actions">
            <button type="button" onClick={() => navigate('/inventory')} className="button outline">
              Cancel
            </button>
            <button type="submit" className="button">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventoryItemPage;
