// src\data\orders.js
export const ordersMock = [
  {
    id: "ORD-1001",
    customer: "Ahmed Ali",
    amount: 250,
    status: "Paid",
    date: "2024-11-20",
    items: [
      { name: "Product A", qty: 1, price: 150 },
      { name: "Product B", qty: 2, price: 50 },
    ],
    paymentMethod: "Credit Card",
    timeline: [
      { label: "Order Placed", date: "2024-11-20 10:00" },
      { label: "Processing", date: "2024-11-20 11:30" },
      { label: "Shipped", date: "2024-11-21 09:00" },
    ],
  },
  {
    id: "ORD-1002",
    customer: "Sara Mohamed",
    amount: 120,
    status: "Pending",
    date: "2024-11-22",
    items: [{ name: "Product C", qty: 3, price: 40 }],
    paymentMethod: "PayPal",
    timeline: [{ label: "Order Placed", date: "2024-11-22 14:10" }],
  },
  {
    id: "ORD-1003",
    customer: "Omar Hassan",
    amount: 90,
    status: "Cancelled",
    date: "2024-11-18",
    items: [{ name: "Product D", qty: 1, price: 90 }],
    paymentMethod: "Cash",
    timeline: [
      { label: "Order Placed", date: "2024-11-18 09:15" },
      { label: "Cancelled", date: "2024-11-18 10:00" },
    ],
  },
  {
    id: "ORD-1004",
    customer: "Laila Youssef",
    amount: 310,
    status: "Paid",
    date: "2024-11-25",
    items: [
      { name: "Product E", qty: 2, price: 100 },
      { name: "Product F", qty: 1, price: 110 },
    ],
    paymentMethod: "Credit Card",
    timeline: [
      { label: "Order Placed", date: "2024-11-25 08:00" },
      { label: "Processing", date: "2024-11-25 09:15" },
    ],
  },
  {
    id: "ORD-1005",
    customer: "Khaled Ibrahim",
    amount: 560,
    status: "Paid",
    date: "2024-11-26",
    items: [
      { name: "Product G", qty: 4, price: 80 },
      { name: "Product H", qty: 2, price: 70 },
    ],
    paymentMethod: "Bank Transfer",
    timeline: [
      { label: "Order Placed", date: "2024-11-26 11:30" },
      { label: "Processing", date: "2024-11-26 12:00" },
      { label: "Shipped", date: "2024-11-27 09:30" },
    ],
  },
];
