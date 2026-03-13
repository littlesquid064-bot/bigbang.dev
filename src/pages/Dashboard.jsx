import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, AlertCircle, ShoppingBag } from 'lucide-react';

function Dashboard({ orders, payments, ingredients }) {
  const [loading, setLoading] = useState(true);
  const [dailyOrders, setDailyOrders] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];

    const ordersToday = orders.filter(
      (order) => order.orderDate.startsWith(today)
    ).length;
    setDailyOrders(ordersToday);

    const unpaidPayments = orders.filter(
      (order) => order.paymentStatus === 'Unpaid'
    ).length;
    setPendingPayments(unpaidPayments);

    const lowStock = ingredients.filter(
      (ing) => ing.currentStock <= ing.minStock
    );
    setLowStockItems(lowStock);
    setLoading(false);
  }, [orders, payments, ingredients]);

  if (loading) {
    return (
      <div className="loading-spinner-container text-center">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h2 className="card-title">Dashboard Overview</h2>

      <div className="card">
        <h3 className="card-title">Daily Summary</h3>
        <div className="flex-row justify-between items-center mb-16">
          <div>
            <p className="text-color-light">Total Orders Today</p>
            <h2 className="text-accent-color">{dailyOrders}</h2>
          </div>
          <ShoppingBag size={48} color="var(--primary-color)" />
        </div>

        <div className="flex-row justify-between items-center">
          <div>
            <p className="text-color-light">Pending Payments</p>
            <h2 className="text-danger">{pendingPayments}</h2>
          </div>
          <CreditCard size={48} color="var(--danger-color)" />
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Inventory Alerts</h3>
        {lowStockItems.length > 0 ? (
          lowStockItems.map((item) => (
            <div key={item.id} className="flex-row justify-between items-center mb-16">
              <AlertCircle color="var(--warning-color)" size={24} />
              <p>
                <span className="text-warning">Low Stock:</span> {item.name} ({item.currentStock} {item.unit})
              </p>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-success">All stock levels are healthy!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;