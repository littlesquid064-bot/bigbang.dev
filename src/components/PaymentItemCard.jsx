import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Button from './Button';

const PaymentItemCard = ({ payment, onEdit, onDelete }) => {
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const formattedDate = new Date(payment.paymentDate).toLocaleString();

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Payment #{payment.id.slice(0, 8)}</h3>
        <span className={`badge ${getStatusBadgeClass(payment.status)}`}>{payment.status}</span>
      </div>
      <div className="card-content">
        <p><strong>Amount:</strong> ${payment.amount.toFixed(2)}</p>
        <p><strong>Method:</strong> {payment.method}</p>
        {payment.orderId && <p><strong>Order Ref:</strong> {payment.orderId.slice(0, 8)}</p>}
        <p><strong>Date:</strong> {formattedDate}</p>
      </div>
      <div className="card-actions">
        <Button
          variant="secondary"
          onClick={() => onEdit(payment.id)}
          title="Edit Payment"
          className="flex-row items-center gap-1"
        >
          <Edit size={18} /> Edit
        </Button>
        <Button
          variant="secondary"
          onClick={() => onDelete(payment.id)}
          title="Delete Payment"
          className="flex-row items-center gap-1"
        >
          <Trash2 size={18} /> Delete
        </Button>
      </div>
    </div>
  );
};

export default PaymentItemCard;
