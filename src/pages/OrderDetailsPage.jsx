import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockOrders } from '../data/mockData';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  Whatsapp,
  Edit,
  Trash2,
  Phone,
  User as UserIcon,
  ShoppingCart,
  NotebookPen
} from 'lucide-react';

function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOrder, setEditedOrder] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    const foundOrder = mockOrders.find((o) => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
      setEditedOrder(foundOrder);
    } else {
      navigate('/orders'); // Redirect if order not found
    }
  }, [id, navigate]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // In a real app, you'd send this to an API
    const orderIndex = mockOrders.findIndex((o) => o.id === editedOrder.id);
    if (orderIndex !== -1) {
      mockOrders[orderIndex] = editedOrder; // Update mock data directly
      setOrder(editedOrder);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    const orderIndex = mockOrders.findIndex((o) => o.id === id);
    if (orderIndex !== -1) {
      mockOrders.splice(orderIndex, 1); // Remove from mock data
    }
    setIsConfirmDeleteOpen(false);
    navigate('/orders');
  };

  if (!order) {
    return <p className="text-center text-gray-600">Loading order details...</p>;
  }

  const whatsappLink = `https://wa.me/${order.phoneNumber}?text=Hello%20${order.customerName},%20regarding%20your%20order%20${order.id}.`;

  const orderStatusOptions = [
    { label: 'New', value: 'New' },
    { label: 'Preparing', value: 'Preparing' },
    { label: 'Ready', value: 'Ready' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Canceled', value: 'Canceled' },
  ];

  const paymentStatusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Paid', value: 'Paid' },
    { label: 'Partially Paid', value: 'Partially Paid' },
  ];

  const paymentMethodOptions = [
    { label: 'Cash', value: 'Cash' },
    { label: 'UPI', value: 'UPI' },
    { label: 'Bank Transfer', value: 'Bank Transfer' },
    { label: 'Credit Card', value: 'Credit Card' },
  ];

  return (
    <div className="order-details-page">
      <div className="flex-row justify-between items-center mb-4">
        <h1 className="text-lg">Order #{order.id}</h1>
        <div className="flex-row gap-2">
          {!isEditing ? (
            <Button variant="secondary" onClick={() => setIsEditing(true)} icon={Edit}>
              Edit Order
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          )}
          <Button variant="danger" onClick={() => setIsConfirmDeleteOpen(true)} icon={Trash2}>
            Delete Order
          </Button>
        </div>
      </div>

      <div className="grid-cols-1 grid-cols-2 gap-4 mb-6">
        {/* Customer Details */}
        <div className="card">
          <h2 className="card-title flex-row items-center gap-2 mb-4">
            <UserIcon size={20} /> Customer Details
          </h2>
          <InputField
            label="Customer Name"
            id="customerName"
            name="customerName"
            value={isEditing ? editedOrder.customerName : order.customerName}
            onChange={handleFieldChange}
            readOnly={!isEditing}
          />
          <InputField
            label="Phone Number"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={isEditing ? editedOrder.phoneNumber : order.phoneNumber}
            onChange={handleFieldChange}
            readOnly={!isEditing}
          />
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" icon={Whatsapp} className="w-full mt-2">
              Link to WhatsApp Chat
            </Button>
          </a>
        </div>

        {/* Order Status & Payment */}
        <div className="card">
          <h2 className="card-title flex-row items-center gap-2 mb-4">
            <ClipboardList size={20} /> Order & Payment Info
          </h2>
          <Dropdown
            label="Order Status"
            id="orderStatus"
            name="status"
            value={isEditing ? editedOrder.status : order.status}
            onChange={handleFieldChange}
            options={orderStatusOptions}
            disabled={!isEditing}
          />
          <Dropdown
            label="Payment Status"
            id="paymentStatus"
            name="paymentStatus"
            value={isEditing ? editedOrder.paymentStatus : order.paymentStatus}
            onChange={handleFieldChange}
            options={paymentStatusOptions}
            disabled={!isEditing}
          />
          <Dropdown
            label="Payment Method"
            id="paymentMethod"
            name="paymentMethod"
            value={isEditing ? editedOrder.paymentMethod : order.paymentMethod}
            onChange={handleFieldChange}
            options={paymentMethodOptions}
            disabled={!isEditing}
          />
          <InputField
            label="Total Amount"
            id="totalAmount"
            name="total"
            type="number"
            value={isEditing ? editedOrder.total : order.total}
            onChange={handleFieldChange}
            readOnly={!isEditing}
          />
        </div>
      </div>

      {/* Order Items */}
      <div className="card mb-6">
        <h2 className="card-title flex-row items-center gap-2 mb-4">
          <ShoppingCart size={20} /> Order Items
        </h2>
        <ul className="flex-col gap-2">
          {order.items.map((item, index) => (
            <li key={index} className="flex-row justify-between items-center py-2 px-4 rounded-lg" style={{ backgroundColor: '#f9f9f9' }}>
              <span>{item.name} (x{item.quantity})</span>
              <span className="font-bold">${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold text-right mt-4">
          Total: ${order.total.toFixed(2)}
        </p>
      </div>

      {/* Special Notes */}
      <div className="card">
        <h2 className="card-title flex-row items-center gap-2 mb-4">
          <NotebookPen size={20} /> Special Notes
        </h2>
        <textarea
          className="form-input form-textarea"
          rows="3"
          value={isEditing ? editedOrder.notes : order.notes}
          onChange={handleFieldChange}
          name="notes"
          readOnly={!isEditing}
        />
      </div>

      <ConfirmationModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Order Deletion"
        message="Are you sure you want to delete this order? This action cannot be undone."
        confirmText="Delete"
      />
    </div>
  );
}

export default OrderDetailsPage;
