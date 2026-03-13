import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';
import { ToastContainer, showToast } from './components/Toast';

import OrdersPage from './pages/Orders';
import PaymentsPage from './pages/Payments';
import InventoryPage from './pages/Inventory';
import DashboardPage from './pages/Dashboard';

const initialOrders = [
  {
    id: 'ord-001',
    customerName: 'Alice Smith',
    customerPhone: '+1234567890',
    items: [
      { name: 'Cheeseburger', quantity: 2, price: 12.50 },
      { name: 'Fries (Large)', quantity: 1, price: 4.00 },
    ],
    specialInstructions: 'No pickles on one burger.',
    status: 'New',
    total: 29.00,
    isPaid: false,
    orderDate: '2023-10-27T10:00:00Z',
  },
  {
    id: 'ord-002',
    customerName: 'Bob Johnson',
    customerPhone: '+1987654321',
    items: [
      { name: 'Chicken Wrap', quantity: 1, price: 9.00 },
      { name: 'Soda', quantity: 2, price: 2.50 },
    ],
    specialInstructions: 'Extra sauce.',
    status: 'Preparing',
    total: 14.00,
    isPaid: true,
    orderDate: '2023-10-27T11:30:00Z',
  },
  {
    id: 'ord-003',
    customerName: 'Charlie Brown',
    customerPhone: '+1122334455',
    items: [
      { name: 'Veggie Burger', quantity: 1, price: 11.00 },
    ],
    specialInstructions: 'Gluten-free bun.',
    status: 'Ready',
    total: 11.00,
    isPaid: true,
    orderDate: '2023-10-26T14:00:00Z',
  },
  {
    id: 'ord-004',
    customerName: 'Diana Prince',
    customerPhone: '+1555123456',
    items: [
      { name: 'Pizza (Large)', quantity: 1, price: 20.00 },
      { name: 'Garlic Bread', quantity: 1, price: 5.00 },
    ],
    specialInstructions: '',
    status: 'Delivered',
    total: 25.00,
    isPaid: true,
    orderDate: '2023-10-25T18:00:00Z',
  },
];

const initialPayments = [
  {
    id: 'pay-001',
    orderId: 'ord-002',
    amount: 14.00,
    method: 'Cash',
    status: 'Paid',
    paymentDate: '2023-10-27T11:45:00Z',
  },
  {
    id: 'pay-002',
    orderId: 'ord-003',
    amount: 11.00,
    method: 'Online Transfer',
    status: 'Paid',
    paymentDate: '2023-10-26T14:10:00Z',
  },
  {
    id: 'pay-003',
    orderId: 'ord-004',
    amount: 25.00,
    method: 'Card',
    status: 'Paid',
    paymentDate: '2023-10-25T18:30:00Z',
  },
];

const initialInventory = [
  {
    id: 'inv-001',
    name: 'Ground Beef',
    currentStock: 5000,
    unit: 'grams',
    lowStockThreshold: 1000,
    type: 'raw',
  },
  {
    id: 'inv-002',
    name: 'Burger Buns',
    currentStock: 20,
    unit: 'units',
    lowStockThreshold: 5,
    type: 'raw',
  },
  {
    id: 'inv-003',
    name: 'Frying Oil',
    currentStock: 5,
    unit: 'liters',
    lowStockThreshold: 1,
    type: 'raw',
  },
  {
    id: 'inv-004',
    name: 'Generic Ingredient',
    currentStock: 10000,
    unit: 'grams',
    lowStockThreshold: 2000,
    type: 'raw',
  },
  {
    id: 'inv-005',
    name: 'Prepared Burgers',
    currentStock: 8,
    unit: 'units',
    lowStockThreshold: 3,
    type: 'finished',
  },
];

const AppContent = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [payments, setPayments] = useState(initialPayments);
  const [inventory, setInventory] = useState(initialInventory);
  const navigate = useNavigate();

  // Redirect to /dashboard on initial load
  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const getTitle = (pathname) => {
    if (pathname.startsWith('/orders')) return 'Orders';
    if (pathname.startsWith('/payments')) return 'Payments';
    if (pathname.startsWith('/inventory')) return 'Inventory';
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    return 'Kitchen Dashboard';
  };

  const location = window.location.pathname; // using window.location for simplicity, use useLocation for react-router

  return (
    <div className="App">
      <Header title={getTitle(location)} />
      <main className="content-area">
        <Routes>
          <Route path="/orders" element={<OrdersPage orders={orders} setOrders={setOrders} inventory={inventory} setInventory={setInventory} showToast={showToast} />} />
          <Route path="/payments" element={<PaymentsPage payments={payments} setPayments={setPayments} orders={orders} showToast={showToast} />} />
          <Route path="/inventory" element={<InventoryPage inventory={inventory} setInventory={setInventory} showToast={showToast} />} />
          <Route path="/dashboard" element={<DashboardPage orders={orders} payments={payments} inventory={inventory} />} />
          <Route path="*" element={<DashboardPage orders={orders} payments={payments} inventory={inventory} />} /> {/* Fallback */}
        </Routes>
      </main>
      <BottomNavBar />
      <ToastContainer />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
