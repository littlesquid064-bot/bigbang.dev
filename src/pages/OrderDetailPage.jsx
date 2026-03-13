import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Calendar, Clock, Phone, MapPin, Receipt, MessageSquare, Plus, Trash } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';

const OrderDetailPage = ({ orders, inventoryItems, onUpdateOrder, onDeleteOrder, showToast, showDialog }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const foundOrder = orders.find((o) => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
      setFormData(foundOrder);
    } else {
      showToast('Order not found!', 'error');
      navigate('/orders');
    }
    setLoading(false);
  }, [id, orders, navigate, showToast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: field === 'quantity' ? parseInt(value, 10) : value } : item
    );
    const newTotal = updatedItems.reduce((sum, item) => sum + (inventoryItems.find(inv => inv.name === item.productName)?.unitPrice || 0) * item.quantity, 0);
    setFormData((prev) => ({ ...prev, items: updatedItems, totalAmount: newTotal }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productName: '', quantity: 1 }],
    }));
  };

  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    const newTotal = updatedItems.reduce((sum, item) => sum + (inventoryItems.find(inv => inv.name === item.productName)?.unitPrice || 0) * item.quantity, 0);
    setFormData((prev) => ({ ...prev, items: updatedItems, totalAmount: newTotal }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.customerName || !formData.items.length || formData.items.some(item => !item.productName || item.quantity <= 0)) {
      showToast('Please fill all required fields and ensure items have valid quantities.', 'error');
      return;
    }
    onUpdateOrder(formData);
    setIsEditing(false);
    showToast('Order updated successfully!', 'success');
  };

  const handleDelete = () => {
    showDialog(
      'Confirm Delete',
      'Are you sure you want to delete this order? This action cannot be undone.',
      () => {
        onDeleteOrder(order.id);
        navigate('/orders');
      }
    );
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form data if cancelling edit
      setFormData(order);
    }
    setIsEditing(!isEditing);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!order) {
    return null; // Should be handled by navigation to /orders
  }

  const availableProducts = inventoryItems.filter(item => item.type === 'finished_product');

  return (
    <div className="order-detail-page">
      <div className="card">
        <div className="flex-row flex-between mb-16">
          <h2 className="text-lg">Order #{order.id.substring(0, 6)}</h2>
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
            <p className="flex-row gap-8 mb-8"><Package size={18} /> <strong>Customer:</strong> {order.customerName}</p>
            <p className="flex-row gap-8 mb-8"><Phone size={18} /> <strong>Phone:</strong> {order.phoneNumber}</p>
            <p className="flex-row gap-8 mb-8"><MapPin size={18} /> <strong>Address:</strong> {order.deliveryAddress}</p>
            <p className="flex-row gap-8 mb-8"><Calendar size={18} /> <strong>Date:</strong> {formatDate(order.deliveryDate)}</p>
            <p className="flex-row gap-8 mb-8"><Clock size={18} /> <strong>Time:</strong> {order.deliveryTime}</p>
            <p className="flex-row gap-8 mb-8"><Receipt size={18} /> <strong>Status:</strong> <span className={`status-badge ${order.status}`}>{order.status}</span></p>
            <p className="flex-row gap-8 mb-8"><Wallet size={18} /> <strong>Payment:</strong> {order.isPaid ? 'Paid' : 'Unpaid'} ({order.paymentMethod})</p>
            {order.notes && <p className="flex-row gap-8 mb-8"><MessageSquare size={18} /> <strong>Notes:</strong> {order.notes}</p>}

            <h3 className="text-lg mt-16 mb-8">Items</h3>
            <div className="order-detail-items-list">
              {order.items.map((item, index) => {
                const product = inventoryItems.find(inv => inv.name === item.productName);
                return (
                  <div key={index} className="order-detail-item">
                    <span>{item.productName} ({item.quantity} {product?.unit})</span>
                    <span>{formatCurrency(item.quantity * (product?.unitPrice || 0))}</span>
                  </div>
                );
              })}
            </div>
            <div className="order-detail-total">
              <span>Total:</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        ) : (
          <form>
            <div className="input-group">
              <label htmlFor="customerName">Customer Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName || ''}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="deliveryAddress">Delivery Address</label>
              <input
                type="text"
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress || ''}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="deliveryDate">Delivery Date</label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate || ''}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="deliveryTime">Delivery Time</label>
              <input
                type="time"
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime || ''}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div className="input-group">
              <label htmlFor="status">Order Status</label>
              <select
                id="status"
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
                className="dropdown-select"
              >
                <option value="new">New</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod || ''}
                onChange={handleChange}
                className="dropdown-select"
              >
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Mobile Pay">Mobile Pay</option>
              </select>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="isPaid"
                name="isPaid"
                checked={formData.isPaid || false}
                onChange={handleChange}
              />
              <label htmlFor="isPaid">Mark as Paid</label>
            </div>
            <div className="input-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
                className="input-field"
                rows="3"
              ></textarea>
            </div>

            <h3 className="text-lg mt-16 mb-8">Items</h3>
            <div className="order-detail-items-list">
              {formData.items.map((item, index) => (
                <div key={index} className="order-item-input-row">
                  <select
                    value={item.productName || ''}
                    onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                    className="dropdown-select"
                  >
                    <option value="">Select Product</option>
                    {availableProducts.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="input-field"
                  />
                  <button type="button" onClick={() => handleRemoveItem(index)} className="icon-button danger">
                    <Trash size={20} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddItem} className="button outline">
                <Plus size={18} /> Add Item
              </button>
            </div>
            <div className="order-detail-total">
              <span>Total:</span>
              <span>{formatCurrency(formData.totalAmount)}</span>
            </div>
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

export default OrderDetailPage;
