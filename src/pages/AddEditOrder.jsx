import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';

function AddEditOrder({ orders, addOrder, updateOrder, showToast }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const isEditing = !!orderId;

  const [formData, setFormData] = useState({
    id: '',
    customerName: '',
    customerPhone: '',
    status: 'New',
    orderDate: new Date().toISOString().slice(0, 16),
    items: [{ name: '', quantity: 1, price: 0 }],
    totalAmount: 0,
    paymentStatus: 'Unpaid',
    paymentMethod: '',
    notes: '',
    deliveryAddress: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && orders.length > 0) {
      const orderToEdit = orders.find((o) => o.id === orderId);
      if (orderToEdit) {
        setFormData({
          ...orderToEdit,
          orderDate: orderToEdit.orderDate.slice(0, 16)
        });
      } else {
        navigate('/orders'); // Redirect if order not found
      }
    } else if (!isEditing) {
      // For new orders, generate a new ID
      const newId = `ORD${String(orders.length + 1).padStart(3, '0')}`;
      setFormData((prev) => ({ ...prev, id: newId }));
    }
  }, [isEditing, orderId, orders, navigate]);

  useEffect(() => {
    const newTotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0);
    setFormData((prev) => ({ ...prev, totalAmount: newTotal }));
  }, [formData.items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = formData.items.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: name === 'quantity' || name === 'price' ? parseFloat(value) || 0 : value };
      }
      return item;
    });
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({ ...prev, items: [...prev.items, { name: '', quantity: 1, price: 0 }] }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name is required.';
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Customer phone is required.';
    if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required.';
    if (formData.items.length === 0) newErrors.items = 'At least one item is required.';
    formData.items.forEach((item, index) => {
      if (!item.name.trim()) newErrors[`itemName${index}`] = 'Item name is required.';
      if (item.quantity <= 0) newErrors[`itemQuantity${index}`] = 'Quantity must be positive.';
      if (item.price < 0) newErrors[`itemPrice${index}`] = 'Price cannot be negative.';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please correct the errors in the form.');
      return;
    }

    const finalOrderData = {
      ...formData,
      orderDate: new Date(formData.orderDate).toISOString(),
      paymentMethod: formData.paymentStatus === 'Paid' ? formData.paymentMethod : null
    };

    if (isEditing) {
      updateOrder(finalOrderData);
    } else {
      addOrder(finalOrderData);
    }
    navigate('/orders');
  };

  return (
    <div className="add-edit-order-page">
      <h2 className="card-title">{isEditing ? `Edit Order #${orderId}` : 'Add New Order'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="card mb-16">
          <h3 className="card-title">Customer Details</h3>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              className="input-text"
              value={formData.customerName}
              onChange={handleChange}
            />
            {errors.customerName && <p className="text-danger">{errors.customerName}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="customerPhone">Customer Phone</label>
            <input
              type="text"
              id="customerPhone"
              name="customerPhone"
              className="input-text"
              value={formData.customerPhone}
              onChange={handleChange}
            />
            {errors.customerPhone && <p className="text-danger">{errors.customerPhone}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="deliveryAddress">Delivery Address</label>
            <input
              type="text"
              id="deliveryAddress"
              name="deliveryAddress"
              className="input-text"
              value={formData.deliveryAddress}
              onChange={handleChange}
            />
            {errors.deliveryAddress && <p className="text-danger">{errors.deliveryAddress}</p>}
          </div>
        </div>

        <div className="card mb-16">
          <h3 className="card-title">Order Details</h3>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="select-dropdown"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Progress">In Progress</option>
              <option value="Ready">Ready</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="orderDate">Order Date & Time</label>
            <input
              type="datetime-local"
              id="orderDate"
              name="orderDate"
              className="input-text"
              value={formData.orderDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="textarea"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="card mb-16">
          <h3 className="card-title">Items ({formData.totalAmount.toFixed(2)})</h3>
          {errors.items && <p className="text-danger">{errors.items}</p>}
          {formData.items.map((item, index) => (
            <div key={index} className="flex-row items-center gap-12 mb-16">
              <div style={{ flexGrow: 1 }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  className="input-text mb-8"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                />
                {errors[`itemName${index}`] && <p className="text-danger">{errors[`itemName${index}`]}</p>}
                <div className="flex-row gap-12">
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Qty"
                      className="input-number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, e)}
                      min="1"
                    />
                    {errors[`itemQuantity${index}`] && <p className="text-danger">{errors[`itemQuantity${index}`]}</p>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      className="input-number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, e)}
                      min="0"
                      step="0.01"
                    />
                    {errors[`itemPrice${index}`] && <p className="text-danger">{errors[`itemPrice${index}`]}</p>}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="button button-danger"
                style={{ padding: '10px 12px' }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="button button-secondary" style={{ width: '100%' }}>
            <Plus size={20} /> Add Item
          </button>
        </div>

        <div className="card mb-16">
          <h3 className="card-title">Payment Information</h3>
          <div className="form-group">
            <label htmlFor="paymentStatus">Payment Status</label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              className="select-dropdown"
              value={formData.paymentStatus}
              onChange={handleChange}
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          {formData.paymentStatus === 'Paid' && (
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className="select-dropdown"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Select Method</option>
                <option value="Cash">Cash</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex-row gap-12 mb-16">
          <button type="button" onClick={() => navigate('/orders')} className="button button-secondary" style={{ flexGrow: 1 }}>
            Cancel
          </button>
          <button type="submit" className="button button-primary" style={{ flexGrow: 1 }}>
            {isEditing ? 'Save Changes' : 'Add Order'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditOrder;