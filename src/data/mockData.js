export const mockOrders = [
  {
    id: 'ORD001',
    customerName: 'Alice Smith',
    phoneNumber: '+1234567890',
    status: 'Delivered',
    total: 120.50,
    items: [
      { name: 'Chicken Biryani', quantity: 2, price: 45.00 },
      { name: 'Naan Bread', quantity: 3, price: 10.00 }
    ],
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    notes: 'Less spicy please',
    orderDate: '2023-10-26T10:00:00Z'
  },
  {
    id: 'ORD002',
    customerName: 'Bob Johnson',
    phoneNumber: '+1987654321',
    status: 'Preparing',
    total: 75.00,
    items: [
      { name: 'Veggie Burger', quantity: 1, price: 30.00 },
      { name: 'French Fries', quantity: 1, price: 15.00 },
      { name: 'Coke', quantity: 2, price: 15.00 }
    ],
    paymentStatus: 'Pending',
    paymentMethod: 'Cash',
    notes: 'Extra ketchup',
    orderDate: '2023-10-27T11:30:00Z'
  },
  {
    id: 'ORD003',
    customerName: 'Charlie Brown',
    phoneNumber: '+1122334455',
    status: 'Ready',
    total: 210.00,
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 120.00 },
      { name: 'Garlic Bread', quantity: 2, price: 45.00 }
    ],
    paymentStatus: 'Partially Paid',
    paymentMethod: 'Bank Transfer',
    notes: 'No olives',
    orderDate: '2023-10-27T13:00:00Z'
  },
  {
    id: 'ORD004',
    customerName: 'Diana Prince',
    phoneNumber: '+1555123456',
    status: 'New',
    total: 90.00,
    items: [
      { name: 'Pasta Arrabiata', quantity: 1, price: 60.00 },
      { name: 'Salad', quantity: 1, price: 30.00 }
    ],
    paymentStatus: 'Pending',
    paymentMethod: 'Cash',
    notes: 'Deliver by 7 PM',
    orderDate: '2023-10-28T09:00:00Z'
  },
  {
    id: 'ORD005',
    customerName: 'Eve Adams',
    phoneNumber: '+1777888999',
    status: 'Delivered',
    total: 180.00,
    items: [
      { name: 'Sushi Platter', quantity: 1, price: 180.00 }
    ],
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    notes: 'Extra soy sauce',
    orderDate: '2023-10-28T10:15:00Z'
  }
];

export const mockInventory = [
  {
    id: 'INV001',
    name: 'Chicken Breast',
    currentQuantity: 15,
    unit: 'kg',
    lowStockThreshold: 5,
    alertEnabled: true
  },
  {
    id: 'INV002',
    name: 'Rice Basmati',
    currentQuantity: 30,
    unit: 'kg',
    lowStockThreshold: 10,
    alertEnabled: true
  },
  {
    id: 'INV003',
    name: 'Tomatoes',
    currentQuantity: 8,
    unit: 'kg',
    lowStockThreshold: 3,
    alertEnabled: true
  },
  {
    id: 'INV004',
    name: 'Onions',
    currentQuantity: 20,
    unit: 'kg',
    lowStockThreshold: 7,
    alertEnabled: false
  },
  {
    id: 'INV005',
    name: 'Flour (All-purpose)',
    currentQuantity: 12,
    unit: 'kg',
    lowStockThreshold: 5,
    alertEnabled: true
  },
  {
    id: 'INV006',
    name: 'Cooking Oil',
    currentQuantity: 4,
    unit: 'liter',
    lowStockThreshold: 2,
    alertEnabled: true
  },
  {
    id: 'INV007',
    name: 'Cheese Mozzarella',
    currentQuantity: 6,
    unit: 'kg',
    lowStockThreshold: 2,
    alertEnabled: true
  }
];
