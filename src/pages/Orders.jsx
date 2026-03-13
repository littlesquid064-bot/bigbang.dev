import React, { useState, useEffect } from 'react';
import { Plus, ListOrdered, Search, Minus, Trash2 } from 'lucide-react';
import OrderItemCard from '../components/OrderItemCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import EmptyState from '../components/EmptyState';
import { showToast } from '../components/Toast';

const generateUniqueId = () => Math.random().toString(36).substring(2, 11);

const OrderForm = ({
  order, setOrder,
  onAddItem,
  onUpdateItemQuantity,
  onRemoveItem,
  onSave,
  onClose
}) => {
  const handleItemChange = (index, field, value) => {
    const newItems = [...order.items];
    newItems[index][field] = field === 'quantity' || field === 'price' ? parseFloat(value) || 0 : value;
    setOrder({ ...order, items: newItems });
  };

  const calculateTotal = () => {
    return order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  useEffect(() => {
    setOrder(prev => ({ ...prev, total: calculateTotal() }));
  }, [order.items]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave();
    }}>
      <Input
        label="Customer Name"
        id="customerName"
        value={order.customerName}
        onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
        placeholder="E.g., John Doe"
        required
      />
      <Input
        label="Customer Phone"
        id="customerPhone"
        type="tel"
        value={order.customerPhone}
        onChange={(e) => setOrder({ ...order, customerPhone: e.target.value })}
        placeholder="E.g., +1234567890"
      />

      <h3 className="mt-2 mb-1">Order Items</h3>
      {order.items.map((item, index) => (
        <div key={index} className="card flex-row justify-between items-center mb-1 p-1">
          <Input
            id={`item-name-${index}`}
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            className="flex-grow" /* Adjusted for better layout */
            style={{ marginRight: '0.5rem' }}
            required
          />
          <div className="quantity-adjuster">
            <button type="button" onClick={() => onUpdateItemQuantity(index, -1)} disabled={item.quantity <= 1}>
              <Minus size={16} />
            </button>
            <span className="quantity-display">{item.quantity}</span>
            <button type="button" onClick={() => onUpdateItemQuantity(index, 1)}>
              <Plus size={16} />
            </button>
          </div>
          <Input
            id={`item-price-${index}`}
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
            className="w-20" /* Small width for price */
            style={{ marginLeft: '0.5rem' }}
            step="0.01"
            required
          />
          <Button
            type="button"
            variant="icon-only"
            onClick={() => onRemoveItem(index)}
            title="Remove Item"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      ))}
      <Button type="button" variant="secondary" onClick={onAddItem} className="mt-1 flex-row items-center gap-1">
        <Plus size={18} /> Add Item
      </Button>

      <Input
        label="Special Instructions"
        id="specialInstructions"
        value={order.specialInstructions}
        onChange={(e) => setOrder({ ...order, specialInstructions: e.target.value })}
        placeholder="E.g., Extra spicy, no cilantro"
      />
      <Select
        label="Order Status"
        id="status"
        value={order.status}
        onChange={(e) => setOrder({ ...order, status: e.target.value })}
        options={[
          { value: 'New', label: 'New' },
          { value: 'Preparing', label: 'Preparing' },
          { value: 'Ready', label: 'Ready' },
          { value: 'Delivered', label: 'Delivered' },
        ]}
      />
      <div className="flex-row justify-between items-center mt-2 p-1 card">
        <strong>Total Amount:</strong>
        <span>${order.total.toFixed(2)}</span>
      </div>

      <div className="modal-footer mt-2">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="primary">Save Order</Button>
      </div>
    </form>
  );
};

const Orders = ({ orders, setOrders, inventory, setInventory, showToast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const initialNewOrderState = {
    id: generateUniqueId(),
    customerName: '',
    customerPhone: '',
    items: [{ name: '', quantity: 1, price: 0.00 }],
    specialInstructions: '',
    status: 'New',
    total: 0.00,
    isPaid: false,
    orderDate: new Date().toISOString(),
  };

  const handleAddOrder = () => {
    setCurrentOrder(initialNewOrderState);
    setIsModalOpen(true);
  };

  const handleEditOrder = (id) => {
    const orderToEdit = orders.find((order) => order.id === id);
    setCurrentOrder({ ...orderToEdit });
    setIsModalOpen(true);
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter((order) => order.id !== id));
      showToast('Order deleted successfully!', 'info');
    }
  };

  const handleSaveOrder = () => {
    if (!currentOrder.customerName || currentOrder.items.some(item => !item.name || item.quantity <= 0 || item.price < 0)) {
      showToast('Please fill in all required fields and ensure valid item details.', 'error');
      return;
    }

    if (currentOrder.id === initialNewOrderState.id) {
      // Add new order
      setOrders((prev) => [...prev, { ...currentOrder, id: generateUniqueId(), orderDate: new Date().toISOString() }]);
      showToast('Order added successfully!', 'success');
    } else {
      // Update existing order
      setOrders((prev) =>
        prev.map((order) => (order.id === currentOrder.id ? currentOrder : order))
      );
      showToast('Order updated successfully!', 'success');
    }
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  const handleMarkPaid = (id) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, isPaid: true } : order))
    );
    showToast('Order marked as paid!', 'success');
  };

  const handleUpdateOrderStatus = (id) => {
    const orderToUpdate = orders.find(o => o.id === id);
    const statusOptions = ['New', 'Preparing', 'Ready', 'Delivered'];
    const currentIndex = statusOptions.indexOf(orderToUpdate.status);
    const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length];

    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status: nextStatus } : order))
    );
    showToast(`Order status updated to ${nextStatus}!`, 'success');

    // Deduct ingredients automatically when an order is marked as "Prepared" or "Ready" (configurable)
    if (nextStatus === 'Preparing' || nextStatus === 'Ready') {
      // This is a simplified deduction logic. In a real app, you'd map items to raw materials.
      // For demo, let's just reduce a generic 'Ingredient' item if it exists.
      const ingredientToDeduct = 'Generic Ingredient'; // Example
      const amountToDeductPerItem = 100; // Example: 100 units per ordered item

      const totalItemsInOrder = orderToUpdate.items.reduce((sum, item) => sum + item.quantity, 0);
      const totalDeduction = totalItemsInOrder * amountToDeductPerItem;

      setInventory(prevInventory =>
        prevInventory.map(invItem =>
          invItem.name === ingredientToDeduct
            ? { ...invItem, currentStock: Math.max(0, invItem.currentStock - totalDeduction) }
            : invItem
        )
      );
      if (totalDeduction > 0) {
        showToast(`Deducted ${totalDeduction} units of ${ingredientToDeduct} from inventory.`, 'info');
      }
    }
  };

  const handleAddItemToCurrentOrder = () => {
    setCurrentOrder(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: 0.00 }]
    }));
  };

  const handleUpdateCurrentOrderItemQuantity = (index, delta) => {
    setCurrentOrder(prev => {
      const newItems = [...prev.items];
      newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
      return { ...prev, items: newItems };
    });
  };

  const handleRemoveItemFromCurrentOrder = (index) => {
    setCurrentOrder(prev => {
      const newItems = prev.items.filter((_, i) => i !== index);
      return { ...prev, items: newItems.length > 0 ? newItems : [{ name: '', quantity: 1, price: 0.00 }] };
    });
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  }).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  const tabOptions = ['All', 'New', 'Preparing', 'Ready', 'Delivered'];

  return (
    <div className="main-content">
      <div className="header-with-tabs">
        <div className="flex-row justify-between items-center mb-2">
          <h2>Orders</h2>
          <div className="search-bar-container">
            <Search size={20} className="search-icon" />
            <Input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-1"
            />
          </div>
        </div>
        <div className="tabs">
          {tabOptions.map((status) => (
            <div
              key={status}
              className={`tab-item ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </div>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <EmptyState
          message="No orders found. Start by adding a new order!"
          actionButton={
            <Button onClick={handleAddOrder} variant="primary" className="flex-row items-center gap-1">
              <Plus size={20} /> Add New Order
            </Button>
          }
        />
      ) : (
        <div className="order-list mt-2">
          {filteredOrders.map((order) => (
            <OrderItemCard
              key={order.id}
              order={order}
              onEdit={handleEditOrder}
              onDelete={handleDeleteOrder}
              onMarkPaid={handleMarkPaid}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          ))}
        </div>
      )}

      <Button className="fab" onClick={handleAddOrder} title="Add New Order">
        <Plus size={28} />
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentOrder?.id === initialNewOrderState.id ? 'Add New Order' : 'Edit Order'}
      >
        {currentOrder && (
          <OrderForm
            order={currentOrder}
            setOrder={setCurrentOrder}
            onAddItem={handleAddItemToCurrentOrder}
            onUpdateItemQuantity={handleUpdateCurrentOrderItemQuantity}
            onRemoveItem={handleRemoveItemFromCurrentOrder}
            onSave={handleSaveOrder}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Orders;
