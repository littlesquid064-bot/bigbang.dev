import React, { useState, useEffect } from 'react';
import { mockOrders } from '../data/mockData';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import {
  Search,
  CreditCard,
  Wallet,
  Banknote,
  CheckCircle,
  Hourglass,
  Clock
} from 'lucide-react';

function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [editedPaymentDetails, setEditedPaymentDetails] = useState({});

  useEffect(() => {
    // Flatten orders into a payment-centric view
    const allPayments = mockOrders.map(order => ({
      orderId: order.id,
      customerName: order.customerName,
      totalAmount: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      amountPaid: order.paymentStatus === 'Paid' ? order.total : (order.paymentStatus === 'Partially Paid' ? order.total / 2 : 0),
      paymentDate: order.orderDate.split('T')[0] // Simplified date
    }));
    setPayments(allPayments);
  }, []);

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case 'Paid': return <CheckCircle size={16} className="text-green-600" />;
      case 'Pending': return <Hourglass size={16} className="text-red-600" />;
      case 'Partially Paid': return <Clock size={16} className="text-orange-500" />;
      default: return null;
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Cash': return <Banknote size={16} />;
      case 'UPI': return <CreditCard size={16} />;
      case 'Bank Transfer': return <Wallet size={16} />;
      case 'Credit Card': return <CreditCard size={16} />;
      default: return null;
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'All' || payment.paymentStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const paymentStatusOptions = [
    { label: 'All', value: 'All' },
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

  const handleEditClick = (payment) => {
    setEditingPaymentId(payment.orderId);
    setEditedPaymentDetails({ ...payment });
  };

  const handleSaveClick = (orderId) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.orderId === orderId ? editedPaymentDetails : payment
      )
    );
    // Also update the mockOrders directly for consistency in this demo
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      mockOrders[orderIndex].paymentStatus = editedPaymentDetails.paymentStatus;
      mockOrders[orderIndex].paymentMethod = editedPaymentDetails.paymentMethod;
      // For a real app, 'amountPaid' would be more complex to track against 'total'
      // For this demo, we'll simplify and just update status/method
    }
    setEditingPaymentId(null);
    setEditedPaymentDetails({});
  };

  const handleCancelEdit = () => {
    setEditingPaymentId(null);
    setEditedPaymentDetails({});
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="payments-page">
      <h1 className="mb-4">Payment Tracking</h1>

      <div className="flex-row justify-between items-center mb-4 gap-4">
        <InputField
          type="text"
          placeholder="Search by Order ID or Customer Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
          id="payment-search"
          name="payment-search"
        />
        <Dropdown
          label="Filter by Status"
          id="filterStatus"
          name="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          options={paymentStatusOptions}
        />
      </div>

      <div className="card p-0">
        {filteredPayments.length === 0 ? (
          <p className="p-4 text-center text-gray-600">
            No payments found matching your criteria.
          </p>
        ) : (
          <ul className="flex-col">
            {filteredPayments.map((payment) => (
              <li key={payment.orderId} className="list-item flex-col items-start">
                <div className="flex-row justify-between items-center w-full mb-2">
                  <div className="list-item-main">
                    <div className="list-item-title">
                      Order #{payment.orderId} - {payment.customerName}
                    </div>
                    <div className="list-item-subtitle flex-row items-center gap-2">
                      {getPaymentStatusIcon(payment.paymentStatus)} {payment.paymentStatus}
                      <span>|</span>
                      {getPaymentMethodIcon(payment.paymentMethod)} {payment.paymentMethod}
                      <span>|</span>
                      <span>${payment.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="list-item-actions">
                    {editingPaymentId === payment.orderId ? (
                      <div className="flex-row gap-2">
                        <Button variant="primary" onClick={() => handleSaveClick(payment.orderId)}>
                          Save
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button variant="secondary" onClick={() => handleEditClick(payment)}>
                        Edit
                      </Button>
                    )}
                  </div>
                </div>

                {editingPaymentId === payment.orderId && ()
                  <div className="w-full flex-col gap-2 mt-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#f0f0f0' }}>
                    <Dropdown
                      label="Payment Status"
                      id={`status-${payment.orderId}`}
                      name="paymentStatus"
                      value={editedPaymentDetails.paymentStatus || ''}
                      onChange={handleFieldChange}
                      options={paymentStatusOptions.slice(1)} // Exclude 'All'
                    />
                    <Dropdown
                      label="Payment Method"
                      id={`method-${payment.orderId}`}
                      name="paymentMethod"
                      value={editedPaymentDetails.paymentMethod || ''}
                      onChange={handleFieldChange}
                      options={paymentMethodOptions}
                    />
                    <InputField
                      label="Amount Paid"
                      id={`amount-${payment.orderId}`}
                      name="amountPaid"
                      type="number"
                      value={editedPaymentDetails.amountPaid || 0}
                      onChange={handleFieldChange}
                      readOnly={editedPaymentDetails.paymentStatus === 'Paid'}
                    />
                    <InputField
                      label="Payment Date"
                      id={`date-${payment.orderId}`}
                      name="paymentDate"
                      type="date"
                      value={editedPaymentDetails.paymentDate || ''}
                      onChange={handleFieldChange}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PaymentsPage;
