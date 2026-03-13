import React from 'react';
import { Link } from 'react-router-dom';
import { PackageSearch, ClipboardList, Wallet, Warehouse, Info } from 'lucide-react';

const HomePage = ({ orders, inventoryItems }) => {
  const pendingOrders = orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled').length;
  const unpaidOrders = orders.filter(order => !order.isPaid).length;
  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.lowStockThreshold).length;
  const totalOrdersToday = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  }).length;

  const totalRevenue = orders
    .filter(order => order.isPaid && order.status === 'delivered')
    .reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="home-page">
      <div className="card home-metric-card">
        <h2>{totalOrdersToday}</h2>
        <p>Orders Today</p>
      </div>

      <div className="home-page-grid mt-16">
        <Link to="/orders" className="card home-metric-card">
          <ClipboardList size={32} className="text-primary" />
          <h2>{pendingOrders}</h2>
          <p>Pending Orders</p>
        </Link>

        <Link to="/payments" className="card home-metric-card">
          <Wallet size={32} className="text-danger" />
          <h2>{unpaidOrders}</h2>
          <p>Unpaid Orders</p>
        </Link>

        <Link to="/inventory" className="card home-metric-card">
          <Warehouse size={32} className="text-warning" />
          <h2>{lowStockItems}</h2>
          <p>Low Stock Items</p>
        </Link>

        <div className="card home-metric-card">
          <Info size={32} className="text-success" />
          <h2>${totalRevenue.toFixed(2)}</h2>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="card mt-16">
        <h3>Quick Actions</h3>
        <div className="flex-row gap-16 mt-16">
          <Link to="/orders/add" className="button flex-grow">
            <ClipboardList size={20} /> Add Order
          </Link>
          <Link to="/inventory/add" className="button secondary flex-grow">
            <PackageSearch size={20} /> Add Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
