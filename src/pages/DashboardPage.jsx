import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../components/SummaryCard';
import ChartCard from '../components/ChartCard';
import Button from '../components/Button';
import { mockOrders, mockInventory } from '../data/mockData';
import {
  ClipboardList,
  CreditCard,
  Package,
  Plus,
  ChefHat,
  Hourglass,
  CheckCircle
} from 'lucide-react';

function DashboardPage() {
  const navigate = useNavigate();
  const [ordersToday, setOrdersToday] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    const ordersCount = mockOrders.filter(
      (order) => order.orderDate.startsWith(today)
    ).length;
    setOrdersToday(ordersCount);

    const pendingPaymentsCount = mockOrders.filter(
      (order) => order.paymentStatus === 'Pending' || order.paymentStatus === 'Partially Paid'
    ).length;
    setPendingPayments(pendingPaymentsCount);

    const lowStockCount = mockInventory.filter(
      (item) => item.alertEnabled && item.currentQuantity <= item.lowStockThreshold
    ).length;
    setLowStockItems(lowStockCount);
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="mb-4">Dashboard</h1>

      <div className="grid-cols-1 grid-cols-2 grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="Orders Today"
          value={ordersToday}
          icon={ClipboardList}
        />
        <SummaryCard
          title="Pending Payments"
          value={pendingPayments}
          icon={CreditCard}
          valueColorClass={pendingPayments > 0 ? 'text-red-600' : ''}
        />
        <SummaryCard
          title="Low Stock Items"
          value={lowStockItems}
          icon={Package}
          valueColorClass={lowStockItems > 0 ? 'text-red-600' : ''}
        />
      </div>

      <div className="flex-row gap-4 mb-6">
        <Button
          variant="primary"
          onClick={() => navigate('/orders')}
          icon={Plus}
        >
          Add New Order
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/inventory')}
          icon={Package}
        >
          Update Inventory
        </Button>
      </div>

      <div className="grid-cols-1 grid-cols-2 gap-4">
        <ChartCard title="Orders by Status">
          <div className="flex-col gap-2">
            <div className="flex-row justify-between items-center">
              <span><ChefHat size={18} /> Preparing</span>
              <span className="font-bold">{mockOrders.filter(o => o.status === 'Preparing').length}</span>
            </div>
            <div className="flex-row justify-between items-center">
              <span><Hourglass size={18} /> New/Pending</span>
              <span className="font-bold">{mockOrders.filter(o => o.status === 'New').length}</span>
            </div>
            <div className="flex-row justify-between items-center">
              <span><CheckCircle size={18} /> Delivered</span>
              <span className="font-bold">{mockOrders.filter(o => o.status === 'Delivered').length}</span>
            </div>
          </div>
        </ChartCard>
        <ChartCard title="Payments by Method">
          <div className="flex-col gap-2">
            <div className="flex-row justify-between items-center">
              <span>Cash</span>
              <span className="font-bold">{mockOrders.filter(o => o.paymentMethod === 'Cash').length}</span>
            </div>
            <div className="flex-row justify-between items-center">
              <span>UPI</span>
              <span className="font-bold">{mockOrders.filter(o => o.paymentMethod === 'UPI').length}</span>
            </div>
            <div className="flex-row justify-between items-center">
              <span>Bank Transfer</span>
              <span className="font-bold">{mockOrders.filter(o => o.paymentMethod === 'Bank Transfer').length}</span>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

export default DashboardPage;
