import React from 'react';
import { ListOrdered, ReceiptText, AlertTriangle, Package } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Dashboard = ({ orders, payments, inventory }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const ordersToday = orders.filter(
    (order) => new Date(order.orderDate) >= today && new Date(order.orderDate) <= endOfDay
  );

  const revenueToday = payments.reduce((sum, payment) => {
    const paymentDate = new Date(payment.paymentDate);
    if (payment.status === 'Paid' && paymentDate >= today && paymentDate <= endOfDay) {
      return sum + payment.amount;
    }
    return sum;
  }, 0);

  const lowStockItems = inventory.filter(
    (item) => item.currentStock <= item.lowStockThreshold
  );

  return (
    <div className="main-content">
      <h2 className="mb-2">Dashboard Summary</h2>

      <div className="flex-col gap-2">
        <div className="card flex-row justify-between items-center">
          <div className="flex-row items-center gap-2">
            <ListOrdered size={32} color="#007bff" />
            <div>
              <p className="card-title">Orders Today</p>
              <p className="card-content">{ordersToday.length} orders</p>
            </div>
          </div>
          <Link to="/orders">
            <Button variant="secondary">View Orders</Button>
          </Link>
        </div>

        <div className="card flex-row justify-between items-center">
          <div className="flex-row items-center gap-2">
            <ReceiptText size={32} color="#4CAF50" />
            <div>
              <p className="card-title">Revenue Today</p>
              <p className="card-content">${revenueToday.toFixed(2)}</p>
            </div>
          </div>
          <Link to="/payments">
            <Button variant="secondary">View Payments</Button>
          </Link>
        </div>

        <div className="card flex-row justify-between items-center">
          <div className="flex-row items-center gap-2">
            <AlertTriangle size={32} color="#FFC107" />
            <div>
              <p className="card-title">Low Stock Items</p>
              <p className="card-content">{lowStockItems.length} items</p>
            </div>
          </div>
          <Link to="/inventory">
            <Button variant="secondary">Manage Inventory</Button>
          </Link>
        </div>

        <div className="card flex-row justify-between items-center">
          <div className="flex-row items-center gap-2">
            <Package size={32} color="#607D8B" />
            <div>
              <p className="card-title">Total Inventory Items</p>
              <p className="card-content">{inventory.length} unique items</p>
            </div>
          </div>
          <Link to="/inventory">
            <Button variant="secondary">View All Inventory</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
