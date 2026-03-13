import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Scale, AlertCircle, Trash, Plus, Minus } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const InventoryItemDetailPage = ({ inventoryItems, onUpdateInventoryItem, onDeleteInventoryItem, showToast, showDialog }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [stockAdjustment, setStockAdjustment] = useState(1);

  useEffect(() => {
    const foundItem = inventoryItems.find((i) => i.id === id);
    if (foundItem) {
      setItem(foundItem);
      setFormData(foundItem);
    } else {
      showToast('Inventory item not found!', 'error');
      navigate('/inventory');
    }
    setLoading(false);
  }, [id, inventoryItems, navigate, showToast]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.unit || formData.currentStock < 0 || formData.lowStockThreshold < 0) {
      showToast('Please fill all required fields with valid values.', 'error');
      return;
    }
    onUpdateInventoryItem(formData);
    setIsEditing(false);
    showToast('Inventory item updated successfully!', 'success');
  };

  const handleDelete = () => {
    showDialog(
      'Confirm Delete',
      'Are you sure you want to delete this inventory item? This action cannot be undone.',
      () => {
        onDeleteInventoryItem(item.id);
        navigate('/inventory');
      }
    );
  };

  const handleAdjustStock = (amount) => {
    const newStock = formData.currentStock + amount;
    if (newStock < 0) {
      showToast('Stock cannot go below zero!', 'error');
      return;
    }
    setFormData((prev) => ({ ...prev, currentStock: newStock }));
    onUpdateInventoryItem({ ...formData, currentStock: newStock });
    showToast(`Stock adjusted by ${amount} ${formData.unit}.`, 'success');
    setStockAdjustment(1);
  };

  const toggleEditMode = () => {
    if (isEditing) {
      setFormData(item);
    }
    setIsEditing(!isEditing);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!item) {
    return null;
  }

  return (
    <div className="inventory-item-detail-page">
      <div className="card">
        <div className="flex-row flex-between mb-16">
          <h2 className="text-lg">{item.name}</h2>
          <div className="flex-row gap-8">
            {isEditing ? (
              <button onClick={handleSave} className="button">
                Save
              </button>
            ) : (
              <button onClick={toggleEditMode} className="button outline">
                Edit
              </button>
            )}
            <button onClick={handleDelete} className="button danger">
              <Trash size={18} />
            </button>
          </div>
        </div>

        {!isEditing ? (
          <div>
            <p className="flex-row gap-8 mb-8"><Package size={18} /> <strong>Type:</strong> {item.type === 'raw_material' ? 'Raw Material' : 'Finished Product'}</p>
            <p className="flex-row gap-8 mb-8"><Scale size={18} /> <strong>Unit:</strong> {item.unit}</p>
            <p className="flex-row gap-8 mb-8"><AlertCircle size={18} /> <strong>Low Stock Threshold:</strong> {item.lowStockThreshold} {item.unit}</p>
            {item.type === 'finished_product' && item.unitPrice && (
              <p className="flex-row gap-8 mb-8"><Wallet size={18} /> <strong>Unit Price:</strong> ${item.unitPrice.toFixed(2)}</p>
            )}
            <h3 className="text-lg mt-16 mb-8">Current Stock: {item.currentStock} {item.unit}</h3>
            {item.currentStock <= item.lowStockThreshold && (
              <p className="low-stock-alert mb-16">
                <AlertCircle size={18} /> Stock is below threshold!
              </p>
            )}

            <div className="inventory-adjust-buttons">
              <div className="inventory-stock-adjust">
                <button onClick={() => handleAdjustStock(-1 * stockAdjustment)} className="button danger">
                  <Minus size={18} /> Remove
                </button>
                <input
                  type="number"
                  min="1"
                  value={stockAdjustment}
                  onChange={(e) => setStockAdjustment(parseInt(e.target.value, 10) || 1)}
                  className="input-field"
                />
                <button onClick={() => handleAdjustStock(stockAdjustment)} className="button">
                  <Plus size={18} /> Add
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form>
            <div className="input-group">
              <label htmlFor="name">Item Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
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
                value={formData.type || ''}
                onChange={handleChange}
                className="dropdown-select"
              >
                <option value="raw_material">Raw Material</option>
                <option value="finished_product">Finished Product</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="unit">Unit of Measurement</label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit || ''}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="currentStock">Current Stock Quantity</label>
              <input
                type="number"
                id="currentStock"
                name="currentStock"
                value={formData.currentStock || 0}
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
                value={formData.lowStockThreshold || 0}
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
                  value={formData.unitPrice || 0}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  step="0.01"
                />
              </div>
            )}
            <div className="form-actions">
              <button type="button" onClick={toggleEditMode} className="button outline">
                Cancel
              </button>
              <button type="button" onClick={handleSave} className="button">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default InventoryItemDetailPage;
