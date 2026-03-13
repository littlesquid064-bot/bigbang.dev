import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Filter } from 'lucide-react';

function Orders({ orders }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="orders-page">
      <h2 className="card-title">Order Management</h2>

      <div className="search-filter-bar">
        <div className="search-input-wrapper">
          <Search size={20} />
          <input
            type="text"
            className="input-text"
            placeholder="Search orders by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="select-dropdown filter-sort-dropdown"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Confirmed">Confirmed</option>
          <option value="In Progress">In Progress</option>
          <option value="Ready">Ready</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="list-container">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <Link to={`/orders/${order.id}`} key={order.id} className="list-item">
              <div className="list-item-content">
                <div className="list-item-title">Order #{order.id} - {order.customerName}</div>
                <div className="list-item-subtitle">
                  Total: ${order.totalAmount} | {new Date(order.orderDate).toLocaleDateString()}
                </div>
              </div>
              <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                {order.status}
              </span>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <ListOrdered size={60} />
            <h3>No Orders Found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <Link to="/orders/new" className="button button-primary mb-16">
        <Plus size={20} />
        Add New Order
      </Link>
    </div>
  );
}

export default Orders;