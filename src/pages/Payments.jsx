import React, { useState } from 'react';
import { Plus, ReceiptText, Search } from 'lucide-react';
import PaymentItemCard from '../components/PaymentItemCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import EmptyState from '../components/EmptyState';
import { showToast } from '../components/Toast';

const generateUniqueId = () => Math.random().toString(36).substring(2, 11);

const Payments = ({ payments, setPayments, orders, showToast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const initialNewPaymentState = {
    id: generateUniqueId(),
    orderId: '',
    amount: 0.00,
    method: 'Cash',
    status: 'Paid',
    paymentDate: new Date().toISOString(),
  };

  const handleAddPayment = () => {
    setCurrentPayment(initialNewPaymentState);
    setIsModalOpen(true);
  };

  const handleEditPayment = (id) => {
    const paymentToEdit = payments.find((payment) => payment.id === id);
    setCurrentPayment({ ...paymentToEdit });
    setIsModalOpen(true);
  };

  const handleDeletePayment = (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      setPayments(payments.filter((payment) => payment.id !== id));
      showToast('Payment deleted successfully!', 'info');
    }
  };

  const handleSavePayment = () => {
    if (currentPayment.amount <= 0) {
      showToast('Payment amount must be greater than zero.', 'error');
      return;
    }

    if (currentPayment.id === initialNewPaymentState.id) {
      // Add new payment
      setPayments((prev) => [...prev, { ...currentPayment, id: generateUniqueId(), paymentDate: new Date().toISOString() }]);
      showToast('Payment added successfully!', 'success');
    } else {
      // Update existing payment
      setPayments((prev) =>
        prev.map((payment) => (payment.id === currentPayment.id ? currentPayment : payment))
      );
      showToast('Payment updated successfully!', 'success');
    }
    setIsModalOpen(false);
    setCurrentPayment(null);
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.method.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (payment.orderId && payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  }).sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));

  const orderOptions = orders.map(order => ({
    value: order.id,
    label: `Order #${order.id.slice(0, 8)} - ${order.customerName} ($${order.total.toFixed(2)})`
  }));

  return (
    <div className="main-content">
      <div className="flex-row justify-between items-center mb-2">
        <h2>Payments</h2>
        <div className="search-bar-container">
          <Search size={20} className="search-icon" />
          <Input
            type="text"
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-1"
          />
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <EmptyState
          message="No payments recorded. Add a new payment to start tracking!"
          actionButton={
            <Button onClick={handleAddPayment} variant="primary" className="flex-row items-center gap-1">
              <Plus size={20} /> Add New Payment
            </Button>
          }
        />
      ) : (
        <div className="payment-list mt-2">
          {filteredPayments.map((payment) => (
            <PaymentItemCard
              key={payment.id}
              payment={payment}
              onEdit={handleEditPayment}
              onDelete={handleDeletePayment}
            />
          ))}
        </div>
      )}

      <Button className="fab" onClick={handleAddPayment} title="Add New Payment">
        <Plus size={28} />
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentPayment?.id === initialNewPaymentState.id ? 'Add New Payment' : 'Edit Payment'}
      >
        {currentPayment && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSavePayment();
          }}>
            <Select
              label="Link to Order (Optional)"
              id="orderId"
              value={currentPayment.orderId}
              onChange={(e) => setCurrentPayment({ ...currentPayment, orderId: e.target.value })}
              options={[{ value: '', label: 'No Order Linked' }, ...orderOptions]}
            />
            <Input
              label="Amount"
              id="amount"
              type="number"
              value={currentPayment.amount}
              onChange={(e) => setCurrentPayment({ ...currentPayment, amount: parseFloat(e.target.value) || 0 })}
              step="0.01"
              required
            />
            <Select
              label="Payment Method"
              id="method"
              value={currentPayment.method}
              onChange={(e) => setCurrentPayment({ ...currentPayment, method: e.target.value })}
              options={[
                { value: 'Cash', label: 'Cash' },
                { value: 'Online Transfer', label: 'Online Transfer' },
                { value: 'Card', label: 'Card' },
              ]}
            />
            <Select
              label="Payment Status"
              id="status"
              value={currentPayment.status}
              onChange={(e) => setCurrentPayment({ ...currentPayment, status: e.target.value })}
              options={[
                { value: 'Paid', label: 'Paid' },
                { value: 'Pending', label: 'Pending' },
              ]}
            />
            <div className="modal-footer mt-2">
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Save Payment</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Payments;
