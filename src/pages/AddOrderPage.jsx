import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const AddOrderPage = ({ onAddOrder, inventoryItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    deliveryAddress: '',
    deliveryDate: new Date().toISOString().slice(0, 10),
    deliveryTime: new Date().toTimeString().slice(0, 5),
    status: 'new',
    paymentMethod: 'Cash',
    isPaid: false,
    notes: '',
    items: [],
    totalAmount: 0,
  });

  const availableProducts = inventoryItems.filter(item => item.type === 'finished_product');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculateTotalAmount = (currentItems) => {
    return currentItems.reduce((sum, item) => {
      const product = inventoryItems.find(inv => inv.name === item.productName);
      return sum + (product?.unitPrice || 0) * item.quantity;
    }, 0);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: field === 'quantity' ? parseInt(value, 10) : value } : item
    );
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      totalAmount: calculateTotalAmount(updatedItems),
    }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productName: '', quantity: 1 }],
    }));
  };

  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      totalAmount: calculateTotalAmount(updatedItems),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.items.length || formData.items.some(item => !item.productName || item.quantity <= 0)) {
      alert('Please fill all required fields and ensure items have valid quantities.');
      return;
    }
    onAddOrder(formData);
    navigate('/orders');
  };

  return (
    <div className="add-order-page">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
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
              value={formData.phoneNumber}
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
              value={formData.deliveryAddress}
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
              value={formData.deliveryDate}
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
              value={formData.deliveryTime}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
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
              checked={formData.isPaid}
              onChange={handleChange}
            />
            <label htmlFor="isPaid">Mark as Paid</label>
          </div>
          <div className="input-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
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
                  value={item.productName}
                  onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                  className="dropdown-select"
                  required
                >
                  <option value="">Select Product</option>
                  {availableProducts.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name} ({product.unitPrice ? formatCurrency(product.unitPrice) : 'N/A'}) 
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  className="input-field"
                  required
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
            <button type="button" onClick={() => navigate('/orders')} className="button outline">
              Cancel
            </button>
            <button type="submit" className="button">
              Save Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderPage;
