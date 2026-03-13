export const mockOrders = [
  {
    id: 'ORD001',
    customerName: 'Alice Smith',
    customerPhone: '+1234567890',
    status: 'New',
    orderDate: '2023-10-26T10:00:00Z',
    items: [
      { name: 'Chicken Biryani', quantity: 2, price: 150 },
      { name: 'Garlic Naan', quantity: 4, price: 30 }
    ],
    totalAmount: 420,
    paymentStatus: 'Unpaid',
    paymentMethod: null,
    notes: 'Extra spicy, no onions.',
    deliveryAddress: '123 Main St, Anytown'
  },
  {
    id: 'ORD002',
    customerName: 'Bob Johnson',
    customerPhone: '+1987654321',
    status: 'Confirmed',
    orderDate: '2023-10-26T11:30:00Z',
    items: [
      { name: 'Paneer Tikka Masala', quantity: 1, price: 180 },
      { name: 'Basmati Rice', quantity: 1, price: 50 }
    ],
    totalAmount: 230,
    paymentStatus: 'Paid',
    paymentMethod: 'Mobile Money',
    notes: '',
    deliveryAddress: '456 Oak Ave, Otherville'
  },
  {
    id: 'ORD003',
    customerName: 'Charlie Brown',
    customerPhone: '+1122334455',
    status: 'In Progress',
    orderDate: '2023-10-26T12:45:00Z',
    items: [
      { name: 'Veggie Burger', quantity: 3, price: 80 },
      { name: 'French Fries (Large)', quantity: 2, price: 60 }
    ],
    totalAmount: 360,
    paymentStatus: 'Unpaid',
    paymentMethod: null,
    notes: 'Burgers well done.',
    deliveryAddress: '789 Pine Ln, Somewhere'
  },
  {
    id: 'ORD004',
    customerName: 'Diana Prince',
    customerPhone: '+1555112233',
    status: 'Ready',
    orderDate: '2023-10-25T15:00:00Z',
    items: [
      { name: 'Sushi Platter', quantity: 1, price: 500 }
    ],
    totalAmount: 500,
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Transfer',
    notes: 'Pick up at 4 PM.',
    deliveryAddress: 'Self pick-up'
  },
  {
    id: 'ORD005',
    customerName: 'Eve Adams',
    customerPhone: '+1777888999',
    status: 'Delivered',
    orderDate: '2023-10-25T13:00:00Z',
    items: [
      { name: 'Pizza Margherita', quantity: 1, price: 200 },
      { name: 'Coke', quantity: 2, price: 40 }
    ],
    totalAmount: 280,
    paymentStatus: 'Paid',
    paymentMethod: 'Cash',
    notes: 'Delivered to front door.',
    deliveryAddress: '101 Elm St, Villagetown'
  },
  {
    id: 'ORD006',
    customerName: 'Frank White',
    customerPhone: '+1444555666',
    status: 'Cancelled',
    orderDate: '2023-10-24T09:00:00Z',
    items: [
      { name: 'Pasta Arrabiata', quantity: 1, price: 170 }
    ],
    totalAmount: 170,
    paymentStatus: 'Unpaid',
    paymentMethod: null,
    notes: 'Customer cancelled due to delay.',
    deliveryAddress: 'N/A'
  }
];

export const mockPayments = [
  {
    id: 'PAY001',
    orderId: 'ORD002',
    amount: 230,
    method: 'Mobile Money',
    date: '2023-10-26T11:40:00Z',
    status: 'Paid'
  },
  {
    id: 'PAY002',
    orderId: 'ORD004',
    amount: 500,
    method: 'Bank Transfer',
    date: '2023-10-25T14:30:00Z',
    status: 'Paid'
  },
  {
    id: 'PAY003',
    orderId: 'ORD005',
    amount: 280,
    method: 'Cash',
    date: '2023-10-25T13:15:00Z',
    status: 'Paid'
  }
];

export const mockIngredients = [
  {
    id: 'ING001',
    name: 'Chicken Breast (Boneless)',
    currentStock: 5,
    unit: 'kg',
    minStock: 2,
    pricePerUnit: 120
  },
  {
    id: 'ING002',
    name: 'Basmati Rice',
    currentStock: 10,
    unit: 'kg',
    minStock: 5,
    pricePerUnit: 80
  },
  {
    id: 'ING003',
    name: 'Tomatoes',
    currentStock: 3,
    unit: 'kg',
    minStock: 1,
    pricePerUnit: 25
  },
  {
    id: 'ING004',
    name: 'Onions',
    currentStock: 8,
    unit: 'kg',
    minStock: 3,
    pricePerUnit: 20
  },
  {
    id: 'ING005',
    name: 'Garlic',
    currentStock: 0.5,
    unit: 'kg',
    minStock: 0.2,
    pricePerUnit: 100
  },
  {
    id: 'ING006',
    name: 'Wheat Flour',
    currentStock: 7,
    unit: 'kg',
    minStock: 3,
    pricePerUnit: 40
  },
  {
    id: 'ING007',
    name: 'Paneer',
    currentStock: 1.5,
    unit: 'kg',
    minStock: 1,
    pricePerUnit: 250
  },
  {
    id: 'ING008',
    name: 'Lettuce',
    currentStock: 0.7,
    unit: 'kg',
    minStock: 0.5,
    pricePerUnit: 60
  },
  {
    id: 'ING009',
    name: 'Burger Buns',
    currentStock: 24,
    unit: 'pieces',
    minStock: 12,
    pricePerUnit: 10
  }
];

export const mockRecipes = [
  {
    id: 'REC001',
    name: 'Chicken Biryani',
    ingredients: [
      { ingredientId: 'ING001', quantity: 0.3, unit: 'kg' }, // Chicken Breast
      { ingredientId: 'ING002', quantity: 0.2, unit: 'kg' }, // Basmati Rice
      { ingredientId: 'ING003', quantity: 0.1, unit: 'kg' }, // Tomatoes
      { ingredientId: 'ING004', quantity: 0.1, unit: 'kg' }  // Onions
    ],
    servingSize: 1
  },
  {
    id: 'REC002',
    name: 'Paneer Tikka Masala',
    ingredients: [
      { ingredientId: 'ING007', quantity: 0.2, unit: 'kg' }, // Paneer
      { ingredientId: 'ING003', quantity: 0.15, unit: 'kg' }, // Tomatoes
      { ingredientId: 'ING004', quantity: 0.05, unit: 'kg' }  // Onions
    ],
    servingSize: 1
  },
  {
    id: 'REC003',
    name: 'Veggie Burger',
    ingredients: [
      { ingredientId: 'ING008', quantity: 0.05, unit: 'kg' }, // Lettuce
      { ingredientId: 'ING009', quantity: 1, unit: 'pieces' } // Burger Buns
      // Assume veggie patty is a pre-made item or another ingredient
    ],
    servingSize: 1
  }
];

export const getIngredientName = (id) => {
  const ingredient = mockIngredients.find(ing => ing.id === id);
  return ingredient ? ingredient.name : 'Unknown Ingredient';
};