import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, DollarSign, Wallet } from 'lucide-react';

function OrderDetails({ orders, updateOrder, showToast }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundOrder = orders.find((o) => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      navigate('/orders');
    }
    setLoading(false);
  }, [orderId, orders, navigate]);

  const handleStatusChange = (newStatus) => {
    if (order) {
      setModalAction(() => () => {
        const updatedOrder = { ...order, status: newStatus };
        updateOrder(updatedOrder);
        setOrder(updatedOrder);
        setShowConfirmModal(false);
        showToast(`Order ${order.id} status updated to ${newStatus}`);
      });
      setShowConfirmModal(true);
    }
  };

  const handlePaymentStatusChange = (newPaymentStatus, method = null) => {
    if (order) {
      setModalAction(() => () => {
        const updatedOrder = {
          ...order,
          paymentStatus: newPaymentStatus,
          paymentMethod: method || order.paymentMethod
        };
        updateOrder(updatedOrder);
        setOrder(updatedOrder);
        setShowConfirmModal(false);
        showToast(`Order ${order.id} payment status updated to ${newPaymentStatus}`);
      });
      setShowConfirmModal(true);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'status-new';
      case 'Confirmed': return 'status-confirmed';
      case 'In Progress': return 'status-in-progress';
      case 'Ready': return 'status-ready';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getPaymentStatusBadgeClass = (status) => {
    return status === 'Paid' ? 'status-paid' : 'status-unpaid';
  };

  if (loading) {
    return (
      <div className="loading-spinner-container text-center">
        <div className="loading-spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return <div className="empty-state">Order not found.</div>;
  }

  return (
    <div className="order-details-page">
      <h2 className="card-title">Order Details: #{order.id}</h2>

      <div className="card mb-16">
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Phone:</strong> {order.customerPhone}</p>
        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
        <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
        <p className="flex-row items-center gap-12">
          <strong>Status:</strong>
          <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
            {order.status}
          </span>
        </p>
        <p className="flex-row items-center gap-12">
          <strong>Payment:</strong>
          <span className={`status-badge ${getPaymentStatusBadgeClass(order.paymentStatus)}`}>
            {order.paymentStatus}
          </span>
          {order.paymentMethod && <span>({order.paymentMethod})</span>}
        </p>
        <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
        {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
      </div>

      <div className="card mb-16">
        <h3 className="card-title">Items</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mb-16">
        <h3 className="card-title">Actions</h3>
        <div className="flex-col gap-12">
          <Link to={`/orders/${order.id}/edit`} className="button button-secondary">
            Edit Order
          </Link>

          {order.status === 'New' && (
            <button
              onClick={() => handleStatusChange('Confirmed')}
              className="button button-primary"
            >
              <CheckCircle size={20} /> Confirm Order
            </button>
          )}

          {(order.status === 'Confirmed' || order.status === 'In Progress') && (
            <button
              onClick={() => handleStatusChange('Ready')}
              className="button button-primary"
            >
              <CheckCircle size={20} /> Mark as Ready
            </button>
          )}

          {order.status === 'Ready' && (
            <button
              onClick={() => handleStatusChange('Delivered')}
              className="button button-primary"
            >
              <CheckCircle size={20} /> Mark as Delivered
            </button>
          )}

          {order.paymentStatus === 'Unpaid' && (
            <select
              className="select-dropdown mb-16"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  handlePaymentStatusChange('Paid', e.target.value);
                }
              }}
            >
              <option value="" disabled>Mark as Paid (Select Method)</option>
              <option value="Cash">Cash</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          )}

          {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
            <button
              onClick={() => handleStatusChange('Cancelled')}
              className="button button-danger"
            >
              <XCircle size={20} /> Cancel Order
            </button>
          )}
        </div>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Action</h2>
            <p>Are you sure you want to proceed with this action?</p>
            <div className="modal-actions">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="button button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => modalAction()}
                className="button button-primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;