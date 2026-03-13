import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { formatCurrency, formatDate } from '../utils/helpers';

const OrderStatusBadge = ({ status }) => {
  let badgeClass = '';
  switch (status) {
    case 'new': badgeClass = 'new'; break;
    case 'preparing': badgeClass = 'preparing'; break;
    case 'ready': badgeClass = 'ready'; break;
    case 'delivered': badgeClass = 'delivered'; break;
    case 'cancelled': badgeClass = 'cancelled'; break;
    default: badgeClass = 'new';
  }
  return <span className={`status-badge ${badgeClass}`}>{status}</span>;
};

const OrdersPage = ({ orders, showToast, showDialog }) => {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'completed'

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'pending') {
      return order.status !== 'delivered' && order.status !== 'cancelled';
    }
    return order.status === 'delivered' || order.status === 'cancelled';
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (sortedOrders.length === 0) {
    return (
      <div className="orders-page">
        <div className="tab-bar">
          <div
            className={`tab-item ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </div>
          <div
            className={`tab-item ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </div>
        </div>
        <EmptyState
          title={`No ${activeTab} orders yet`}
          message="Start by adding a new order to your kitchen dashboard."
        />
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="tab-bar">
        <div
          className={`tab-item ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </div>
        <div
          className={`tab-item ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </div>
      </div>

      <div className="order-list">
        {sortedOrders.map((order) => (
          <Link to={`/orders/${order.id}`} key={order.id} className="list-item">
            <div className="list-item-content">
              <div className="list-item-title">Order #{order.id.substring(0, 6)} - {order.customerName}</div>
              <div className="list-item-subtitle">
                {formatDate(order.createdAt)} | {formatCurrency(order.totalAmount)}
              </div>
            </div>
            <div className="list-item-actions flex-row gap-8">
              <OrderStatusBadge status={order.status} />
              {order.isPaid ? (
                <CheckCircle size={20} className="text-success" />
              ) : (
                <Circle size={20} className="text-danger" />
              )}
              <ArrowRight size={20} className="text-color-light" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
