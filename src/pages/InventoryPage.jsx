import React, { useState, useEffect } from 'react';
import { mockInventory } from '../data/mockData';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ToggleSwitch from '../components/ToggleSwitch';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  useEffect(() => {
    setInventory(mockInventory);
  }, []);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveItem = () => {
    if (currentItem.id) {
      // Edit existing item
      setInventory((prev) =>
        prev.map((item) => (item.id === currentItem.id ? currentItem : item))
      );
    } else {
      // Add new item
      const newItem = {
        ...currentItem,
        id: `INV${String(inventory.length + 1).padStart(3, '0')}`,
      };
      setInventory((prev) => [...prev, newItem]);
    }
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleDeleteConfirm = () => {
    setInventory((prev) => prev.filter((item) => item.id !== itemToDeleteId));
    setIsConfirmDeleteOpen(false);
    setItemToDeleteId(null);
  };

  const openAddModal = () => {
    setCurrentItem({
      name: '',
      currentQuantity: 0,
      unit: 'kg',
      lowStockThreshold: 0,
      alertEnabled: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setCurrentItem({ ...item });
    setIsModalOpen(true);
  };

  const openDeleteConfirmation = (id) => {
    setItemToDeleteId(id);
    setIsConfirmDeleteOpen(true);
  };

  return (
    <div className="inventory-page">
      <h1 className="mb-4">Inventory Management</h1>

      <div className="flex-row justify-between items-center mb-4 gap-4">
        <InputField
          type="text"
          placeholder="Search inventory items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
          id="inventory-search"
          name="inventory-search"
        />
        <Button variant="primary" onClick={openAddModal} icon={Plus}>
          Add New Item
        </Button>
      </div>

      <div className="card p-0">
        {filteredInventory.length === 0 ? (
          <p className="p-4 text-center text-gray-600">
            No inventory items found.
          </p>
        ) : (
          <ul className="flex-col">
            {filteredInventory.map((item) => (
              <li key={item.id} className="list-item">
                <div className="list-item-main">
                  <div className="list-item-title flex-row items-center gap-2">
                    {item.name}
                    {item.alertEnabled && item.currentQuantity <= item.lowStockThreshold && (
                      <AlertTriangle size={18} className="text-red-600" />
                    )}
                  </div>
                  <div className="list-item-subtitle">
                    Stock: {item.currentQuantity} {item.unit} | Threshold: {item.lowStockThreshold} {item.unit}
                  </div>
                </div>
                <div className="list-item-actions">
                  <Button variant="icon" onClick={() => openEditModal(item)}>
                    <Edit size={20} />
                  </Button>
                  <Button variant="icon" onClick={() => openDeleteConfirmation(item.id)}>
                    <Trash2 size={20} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this inventory item? This action cannot be undone."
      />

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSaveItem}
        title={currentItem?.id ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        message={
          <form onSubmit={(e) => { e.preventDefault(); handleSaveItem(); }}>
            <InputField
              label="Item Name"
              id="itemName"
              name="name"
              value={currentItem?.name || ''}
              onChange={handleInputChange}
              placeholder="e.g., Chicken Breast"
              required
            />
            <InputField
              label="Current Quantity"
              id="currentQuantity"
              name="currentQuantity"
              type="number"
              value={currentItem?.currentQuantity || 0}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Unit"
              id="unit"
              name="unit"
              value={currentItem?.unit || ''}
              onChange={handleInputChange}
              placeholder="e.g., kg, pcs, liter"
              required
            />
            <InputField
              label="Low Stock Threshold"
              id="lowStockThreshold"
              name="lowStockThreshold"
              type="number"
              value={currentItem?.lowStockThreshold || 0}
              onChange={handleInputChange}
              required
            />
            <div className="form-group mt-4">
              <ToggleSwitch
                label="Enable Low Stock Alert"
                id="alertEnabled"
                checked={currentItem?.alertEnabled || false}
                onChange={(e) => handleInputChange({ target: { name: 'alertEnabled', type: 'checkbox', checked: e.target.checked } })}
              />
            </div>
          </form>
        }
        confirmText={currentItem?.id ? 'Save Changes' : 'Add Item'}
        cancelText="Cancel"
      />
    </div>
  );
}

export default InventoryPage;
