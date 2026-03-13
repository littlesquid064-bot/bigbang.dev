import React from 'react';
import { Edit, Trash2, AlertCircle, Plus, Minus } from 'lucide-react';
import Button from './Button';

const InventoryItemCard = ({ item, onEdit, onDelete, onAdjustStock }) => {
  const isLowStock = item.currentStock <= item.lowStockThreshold;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{item.name}</h3>
        {isLowStock && (
          <span className="badge stock-low flex-row items-center gap-1">
            <AlertCircle size={16} /> Low Stock
          </span>
        )}
      </div>
      <div className="card-content">
        <p><strong>Current Stock:</strong> {item.currentStock} {item.unit}</p>
        <p><strong>Low Stock Threshold:</strong> {item.lowStockThreshold} {item.unit}</p>
        <p><strong>Type:</strong> {item.type}</p>
      </div>
      <div className="card-actions flex-row justify-between items-center">
        <div className="quantity-adjuster">
          <button onClick={() => onAdjustStock(item.id, -1)} disabled={item.currentStock <= 0}>
            <Minus size={16} />
          </button>
          <span className="quantity-display">{item.currentStock}</span>
          <button onClick={() => onAdjustStock(item.id, 1)}>
            <Plus size={16} />
          </button>
        </div>
        <div className="flex-row gap-1">
          <Button
            variant="secondary"
            onClick={() => onEdit(item.id)}
            title="Edit Item"
            className="flex-row items-center gap-1"
          >
            <Edit size={18} /> Edit
          </Button>
          <Button
            variant="secondary"
            onClick={() => onDelete(item.id)}
            title="Delete Item"
            className="flex-row items-center gap-1"
          >
            <Trash2 size={18} /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemCard;
