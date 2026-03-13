import React, { useState, useEffect } from 'react';
import { Search, Calendar, DollarSign } from 'lucide-react';

function Payments({ orders }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterMethod, setFilterMethod] = useState('All');
  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    const allPayments = orders.map(order => ({
      id: `PAY-${order.id}`,
      orderId: order.id,
      customerName: order.customerName,
      amount: order.totalAmount,
      method: order.paymentMethod || 'N/A',
      date: order.orderDate,
      status: order.paymentStatus
    }));

    const sortedPayments = allPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

    const filtered = sortedPayments.filter((payment) => {
      const matchesSearch =
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === 'All' || payment.status === filterStatus;
      const matchesMethod = 
        filterMethod === 'All' || payment.method === filterMethod;
      return matchesSearch && matchesStatus && matchesMethod;
    });
    setFilteredPayments(filtered);
  }, [orders, searchTerm, filterStatus, filterMethod]);

  const getPaymentStatusBadgeClass = (status) => {
    return status === 'Paid' ? 'status-paid' : 'status-unpaid';
  };

  return (
    <div className="payments-page">
      <h2 className="card-title">Payment Tracking</h2>

      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search size={20} />
          <input
            type="text"
            className="input-text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-row gap-12 mb-16">
        <select
          className="select-dropdown filter-sort-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ flex: 1 }}
        >
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        <select
          className="select-dropdown filter-sort-dropdown"
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          style={{ flex: 1 }}
        >
          <option value="All">All Methods</option>
          <option value="Cash">Cash</option>
          <option value="Mobile Money">Mobile Money</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="N/A">N/A (Unpaid)</option>
        </select>
      </div>

      <div className="list-container">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <div key={payment.id} className="list-item">
              <div className="list-item-content">
                <div className="list-item-title">Order #{payment.orderId}</div>
                <div className="list-item-subtitle">
                  {payment.customerName} | ${payment.amount} | {payment.method}
                </div>
                <div className="list-item-subtitle">
                  {new Date(payment.date).toLocaleDateString()} {new Date(payment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <span className={`status-badge ${getPaymentStatusBadgeClass(payment.status)}`}>
                {payment.status}
              </span>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <DollarSign size={60} />
            <h3>No Payments Found</h3>
            <p>No transactions match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payments;