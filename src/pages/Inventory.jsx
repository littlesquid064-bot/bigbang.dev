import React, { useState } from 'react';
import { Plus, Package, Search } from 'lucide-react';
import InventoryItemCard from '../components/InventoryItemCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import EmptyState from '../components/EmptyState';
import { showToast } from '../components/Toast';

const generateUniqueId = () => Math.random().toString(36).substring(2, 11);

const Inventory = ({ inventory, setInventory, showToast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInventoryItem, setCurrentInventoryItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const initialNewInventoryItemState = {
    id: generateUniqueId(),
    name: '',
    currentStock: 0,
    unit: 'grams',
    lowStockThreshold: 100,
    type: 'raw',
  };

  const handleAddItem = () => {
    setCurrentInventoryItem(initialNewInventoryItemState);
    setIsModalOpen(true);
  };

  const handleEditItem = (id) => {
    const itemToEdit = inventory.find((item) => item.id === id);
    setCurrentInventoryItem({ ...itemToEdit });
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      setInventory(inventory.filter((item) => item.id !== id));
      showToast('Inventory item deleted successfully!', 'info');
    }
  };

  const handleSaveItem = () => {
    if (!currentInventoryItem.name || currentInventoryItem.currentStock < 0 || currentInventoryItem.lowStockThreshold < 0) {
      showToast('Please fill in all required fields with valid values.', 'error');
      return;
    }

    if (currentInventoryItem.id === initialNewInventoryItemState.id) {
      // Add new item
      setInventory((prev) => [...prev, { ...currentInventoryItem, id: generateUniqueId() }]);
      showToast('Inventory item added successfully!', 'success');
    } else {
      // Update existing item
      setInventory((prev) =>
        prev.map((item) => (item.id === currentInventoryItem.id ? currentInventoryItem : item))
      );
      showToast('Inventory item updated successfully!', 'success');
    }
    setIsModalOpen(false);
    setCurrentInventoryItem(null);
  };

  const handleAdjustStock = (id, delta) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, currentStock: Math.max(0, item.currentStock + delta) }
          : item
      )
    );
    showToast(delta > 0 ? 'Stock increased!' : 'Stock decreased!', 'info');
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="main-content">
      <div className="flex-row justify-between items-center mb-2">
        <h2>Inventory</h2>
        <div className="search-bar-container">
          <Search size={20} className="search-icon" />
          <Input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1"
          />
        </div>
      </div>

      {filteredInventory.length === 0 ? (
        <EmptyState
          message="No inventory items found. Add new items to manage your stock!"
          actionButton={
            <Button onClick={handleAddItem} variant="primary" className="flex-row items-center gap-1">
              <Plus size={20} /> Add New Item
            </Button>
          }
        />
      ) : (
        <div className="inventory-list mt-2">
          {filteredInventory.map((item) => (
            <InventoryItemCard
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onAdjustStock={handleAdjustStock}
            />
          ))}
        </div>
      )}

      <Button className="fab" onClick={handleAddItem} title="Add New Inventory Item">
        <Plus size={28} />
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentInventoryItem?.id === initialNewInventoryItemState.id ? 'Add New Inventory Item' : 'Edit Inventory Item'}
      >
        {currentInventoryItem && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSaveItem();
          }}>
            <Input
              label="Item Name"
              id="itemName"
              value={currentInventoryItem.name}
              onChange={(e) => setCurrentInventoryItem({ ...currentInventoryItem, name: e.target.value })}
              placeholder="E.g., Ground Beef, Burger Bun"
              required
            />
            <Input
              label="Current Stock"
              id="currentStock"
              type="number"
              value={currentInventoryItem.currentStock}
              onChange={(e) => setCurrentInventoryItem({ ...currentInventoryItem, currentStock: parseInt(e.target.value) || 0 })}
              required
            />
            <Select
              label="Unit of Measure"
              id="unit"
              value={currentInventoryItem.unit}
              onChange={(e) => setCurrentInventoryItem({ ...currentInventoryItem, unit: e.target.value })}
              options={[
                { value: 'grams', label: 'grams' },
                { value: 'kg', label: 'kg' },
                { value: 'units', label: 'units' },
                { value: 'liters', label: 'liters' },
              ]}
            />
            <Input
              label="Low Stock Threshold"
              id="lowStockThreshold"
              type="number"
              value={currentInventoryItem.lowStockThreshold}
              onChange={(e) => setCurrentInventoryItem({ ...currentInventoryItem, lowStockThreshold: parseInt(e.target.value) || 0 })}
              required
            />
            <Select
              label="Item Type"
              id="itemType"
              value={currentInventoryItem.type}
              onChange={(e) => setCurrentInventoryItem({ ...currentInventoryItem, type: e.target.value })}
              options={[
                { value: 'raw', label: 'Raw Material' },
                { value: 'finished', label: 'Finished Product' },
              ]}
            />
            <div className="modal-footer mt-2">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Item</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Inventory;
