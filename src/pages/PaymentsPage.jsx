import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Wallet, CheckCircle, Circle } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { formatCurrency, formatDate } from '../utils/helpers';

const PaymentStatusBadge = ({ isPaid }) => {
  return (
    <span className={`status-badge ${isPaid ? 'paid' : 'unpaid'}`}>
      {isPaid ? 'Paid' : 'Unpaid'}
    </span>
  );
};

const PaymentsPage = ({ orders }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'paid', 'unpaid'
  const [sortBy, setSortBy] = useState('dateDesc'); // 'dateDesc', 'dateAsc', 'amountDesc', 'amountAsc'

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredAndSortedPayments = orders
    .filter(order => {
      const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            order.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' ||
                            (filterStatus === 'paid' && order.isPaid) ||
                            (filterStatus === 'unpaid' && !order.isPaid);
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'dateDesc') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'dateAsc') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'amountDesc') {
        return b.totalAmount - a.totalAmount;
      }
      if (sortBy === 'amountAsc') {
        return a.totalAmount - b.totalAmount;
      }
      return 0;
    });

  if (filteredAndSortedPayments.length === 0) {
    return (
      <div className="payments-page">
        <div className="search-bar-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search payments by customer or order ID..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-sort-container">
          <select value={filterStatus} onChange={handleFilterChange} className="dropdown-select">
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <select value={sortBy} onChange={handleSortChange} className="dropdown-select">
            <option value="dateDesc">Newest First</option>
            <option value="dateAsc">Oldest First</option>
            <option value="amountDesc">Amount (High to Low)</option>
            <option value="amountAsc">Amount (Low to High)</option>
          </select>
        </div>
        <EmptyState
          icon={Wallet}
          title="No payments found"
          message="There are no payments matching your criteria."
        />
      </div>
    );
  }

  return (
    <div className="payments-page">
      <div className="search-bar-container">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search payments by customer or order ID..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="filter-sort-container">
        <select value={filterStatus} onChange={handleFilterChange} className="dropdown-select">
          <option value="all">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <select value={sortBy} onChange={handleSortChange} className="dropdown-select">
          <option value="dateDesc">Newest First</option>
          <option value="dateAsc">Oldest First</option>
          <option value="amountDesc">Amount (High to Low)</option>
          <option value="amountAsc">Amount (Low to High)</option>
        </select>
      </div>

      <div className="payment-list">
        {filteredAndSortedPayments.map((order) => (
          <Link to={`/orders/${order.id}`} key={order.id} className="list-item payment-list-item">
            <div className="payment-list-item-details">
              <div className="list-item-title">Order #{order.id.substring(0, 6)} - {order.customerName}</div>
              <div className="text-sm text-color-light">
                {order.paymentMethod} on {formatDate(order.createdAt)}
              </div>
            </div>
            <div className="flex-row align-center">
              <span className="payment-list-item-amount">{formatCurrency(order.totalAmount)}</span>
              <PaymentStatusBadge isPaid={order.isPaid} />
              <ArrowRight size={20} className="text-color-light ml-8" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PaymentsPage;
