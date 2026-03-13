import React from 'react';
import { Edit, Trash2, Tag, CheckCircle, Plus, Minus } from 'lucide-react';
import Button from './Button';

const OrderItemCard = ({ order, onEdit, onDelete, onMarkPaid, onUpdateStatus }) => {
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'new': return 'status-new';
      case 'preparing': return 'status-preparing';
      case 'ready': return 'status-ready';
      case 'delivered': return 'status-delivered';
      default: return '';
    }
  };

  const formattedDate = new Date(order.orderDate).toLocaleString();

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Order #{order.id.slice(0, 8)}</h3>
        <div className="flex-row gap-1">
          <span className={`badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span>
          {order.isPaid ? (
            <span className="badge status-paid">Paid</span>
          ) : (
            <span className="badge status-pending">Pending</span>
          )}
        </div>
      </div>
      <div className="card-content">
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Phone:</strong> {order.customerPhone}</p>
        <p><strong>Items:</strong></p>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>{item.quantity}x {item.name} (${item.price.toFixed(2)})</li>
          ))}
        </ul>
        {order.specialInstructions && <p><strong>Notes:</strong> {order.specialInstructions}</p>}
        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
        <p><strong>Date:</strong> {formattedDate}</p>
      </div>
      <div className="card-actions">
        {!order.isPaid && (
          <Button
            variant="secondary"
            onClick={() => onMarkPaid(order.id)}
            title="Mark as Paid"
            className="flex-row items-center gap-1"
          >
            <Tag size={18} /> Paid
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() => onUpdateStatus(order.id)}
          title="Update Status"
          className="flex-row items-center gap-1"
        >
          <CheckCircle size={18} /> Status
        </Button>
        <Button
          variant="secondary"
          onClick={() => onEdit(order.id)}
          title="Edit Order"
          className="flex-row items-center gap-1"
        >
          <Edit size={18} /> Edit
        </Button>
        <Button
          variant="secondary"
          onClick={() => onDelete(order.id)}
          title="Delete Order"
          className="flex-row items-center gap-1"
        >
          <Trash2 size={18} /> Delete
        </Button>
      </div>
    </div>
  );
};

export default OrderItemCard;
