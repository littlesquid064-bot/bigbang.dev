import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockOrders } from '../data/mockData';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import {
  Plus,
  Search,
  Truck,
  Hourglass,
  CheckCircle,
  XCircle,
  CookingPot
} from 'lucide-react';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'New': return <Hourglass size={16} className="text-blue-600" />;
      case 'Preparing': return <CookingPot size={16} className="text-orange-500" />;
      case 'Ready': return <Truck size={16} className="text-indigo-600" />;
      case 'Delivered': return <CheckCircle size={16} className="text-green-600" />;
      case 'Canceled': return <XCircle size={16} className="text-red-600" />;
      default: return null;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber.includes(searchTerm);

    const matchesStatus =
      filterStatus === 'All' || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const orderStatusOptions = [
    { label: 'All', value: 'All' },
    { label: 'New', value: 'New' },
    { label: 'Preparing', value: 'Preparing' },
    { label: 'Ready', value: 'Ready' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Canceled', value: 'Canceled' },
  ];

  return (
    <div className="orders-page">
      <h1 className="mb-4">Order Management</h1>

      <div className="flex-row justify-between items-center mb-4 gap-4">
        <InputField
          type="text"
          placeholder="Search orders (ID, customer, phone)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={Search}
          id="order-search"
          name="order-search"
        />
        <Dropdown
          label="Filter by Status"
          id="filterStatus"
          name="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          options={orderStatusOptions}
        />
        <Button variant="primary" onClick={() => alert('Add New Order functionality')} icon={Plus}>
          Add New Order
        </Button>
      </div>

      <div className="card p-0">
        {filteredOrders.length === 0 ? (
          <p className="p-4 text-center text-gray-600">
            No orders found matching your criteria.
          </p>
        ) : (
          <ul className="flex-col">
            {filteredOrders.map((order) => (
              <Link to={`/orders/${order.id}`} key={order.id} className="list-item">
                <div className="list-item-main">
                  <div className="list-item-title flex-row items-center gap-2">
                    <span>#{order.id} - {order.customerName}</span>
                    {getStatusIcon(order.status)}
                  </div>
                  <div className="list-item-subtitle">
                    {order.status} | {order.paymentStatus} | Total: ${order.total.toFixed(2)}
                  </div>
                </div>
                <div className="list-item-actions">
                  {/* No specific actions here, click on item navigates to details */}
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
