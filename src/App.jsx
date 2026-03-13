import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AddOrderPage from './pages/AddOrderPage';
import InventoryPage from './pages/InventoryPage';
import InventoryItemDetailPage from './pages/InventoryItemDetailPage';
import AddInventoryItemPage from './pages/AddInventoryItemPage';
import PaymentsPage from './pages/PaymentsPage';
import SettingsPage from './pages/SettingsPage';
import TopAppBar from './components/TopAppBar';
import BottomNavBar from './components/BottomNavBar';
import FloatingActionButton from './components/FloatingActionButton';
import AlertDialog from './components/AlertDialog';
import ToastNotification from './components/ToastNotification';
import { orders as initialOrders, inventoryItems as initialInventoryItems } from './data/mockData';
import { generateUniqueId } from './utils/helpers';
import { Plus } from 'lucide-react';

const App = () => {
  const location = useLocation();
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : initialOrders;
  });
  const [inventoryItems, setInventoryItems] = useState(() => {
    const storedInventory = localStorage.getItem('inventoryItems');
    return storedInventory ? JSON.parse(storedInventory) : initialInventoryItems;
  });
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
  }, [inventoryItems]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const showDialog = (title, message, onConfirm) => {
    setDialog({ title, message, onConfirm });
  };

  const closeDialog = () => {
    setDialog(null);
  };

  const handleAddOrder = (newOrder) => {
    const orderWithId = { ...newOrder, id: generateUniqueId(), createdAt: new Date().toISOString() };
    setOrders((prevOrders) => [orderWithId, ...prevOrders]);
    showToast('Order added successfully!', 'success');
  };

  const handleUpdateOrder = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
    showToast('Order updated successfully!', 'success');
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    showToast('Order deleted successfully!', 'success');
  };

  const handleAddInventoryItem = (newItem) => {
    const itemWithId = { ...newItem, id: generateUniqueId() };
    setInventoryItems((prevItems) => [itemWithId, ...prevItems]);
    showToast('Inventory item added successfully!', 'success');
  };

  const handleUpdateInventoryItem = (updatedItem) => {
    setInventoryItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    showToast('Inventory item updated successfully!', 'success');
  };

  const handleDeleteInventoryItem = (itemId) => {
    setInventoryItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    showToast('Inventory item deleted successfully!', 'success');
  };

  const getPageTitle = (pathname) => {
    if (pathname.startsWith('/orders/add')) return 'Add New Order';
    if (pathname.startsWith('/orders/')) return 'Order Details';
    if (pathname.startsWith('/orders')) return 'Orders';
    if (pathname.startsWith('/inventory/add')) return 'Add New Item';
    if (pathname.startsWith('/inventory/')) return 'Item Details';
    if (pathname.startsWith('/inventory')) return 'Inventory';
    if (pathname.startsWith('/payments')) return 'Payments';
    if (pathname.startsWith('/settings')) return 'Settings';
    return 'Dashboard';
  };

  const showFab = !['/orders/add', '/inventory/add'].includes(location.pathname);

  return (
    <div className="app-container">
      <TopAppBar
        title={getPageTitle(location.pathname)}
        showAddButton={location.pathname === '/orders' || location.pathname === '/inventory'}
        addLink={location.pathname === '/orders' ? '/orders/add' : '/inventory/add'}
        showSearchButton={location.pathname === '/orders' || location.pathname === '/inventory' || location.pathname === '/payments'}
        showFilterButton={location.pathname === '/orders' || location.pathname === '/inventory' || location.pathname === '/payments'}
      />

      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage orders={orders} inventoryItems={inventoryItems} />} />
          <Route
            path="/orders"
            element={<OrdersPage orders={orders} showToast={showToast} showDialog={showDialog} />} 
          />
          <Route
            path="/orders/add"
            element={<AddOrderPage onAddOrder={handleAddOrder} inventoryItems={inventoryItems} />} 
          />
          <Route
            path="/orders/:id"
            element={
              <OrderDetailPage
                orders={orders}
                inventoryItems={inventoryItems}
                onUpdateOrder={handleUpdateOrder}
                onDeleteOrder={handleDeleteOrder}
                showToast={showToast}
                showDialog={showDialog}
              />
            }
          />
          <Route
            path="/inventory"
            element={<InventoryPage inventoryItems={inventoryItems} showToast={showToast} showDialog={showDialog} />} 
          />
          <Route
            path="/inventory/add"
            element={<AddInventoryItemPage onAddInventoryItem={handleAddInventoryItem} />} 
          />
          <Route
            path="/inventory/:id"
            element={
              <InventoryItemDetailPage
                inventoryItems={inventoryItems}
                onUpdateInventoryItem={handleUpdateInventoryItem}
                onDeleteInventoryItem={handleDeleteInventoryItem}
                showToast={showToast}
                showDialog={showDialog}
              />
            }
          />
          <Route path="/payments" element={<PaymentsPage orders={orders} />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>

      <BottomNavBar />

      {showFab && location.pathname === '/orders' && (
        <FloatingActionButton to="/orders/add">
          <Plus size={24} />
        </FloatingActionButton>
      )}

      {dialog && (
        <AlertDialog
          title={dialog.title}
          message={dialog.message}
          onConfirm={() => {
            dialog.onConfirm();
            closeDialog();
          }}
          onCancel={closeDialog}
        />
      )}

      {toast && <ToastNotification message={toast.message} type={toast.type} />}
    </div>
  );
};

export default App;
