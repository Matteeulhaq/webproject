// src/data/orders.js
export const mockOrders = [
    {
      id: "order1",
      userId: "user1", // thriftking
      items: [
        { productId: 1, quantity: 1, price: 45.99 }, // Vintage Denim Jacket
      ],
      total: 45.99,
      address: {
        street: "123 Thrift St",
        city: "Fashion City",
        state: "CA",
        zip: "90210",
      },
      billing: {
        cardNumber: "**** **** **** 1234",
        expiration: "12/25",
        cvv: "***",
      },
      status: "Delivered",
      date: "2025-04-20T10:00:00Z",
    },
    {
      id: "order2",
      userId: "user1",
      items: [
        { productId: 2, quantity: 2, price: 29.99 }, // Retro Tee
      ],
      total: 59.98,
      address: {
        street: "456 Style Ave",
        city: "Trend Town",
        state: "NY",
        zip: "10001",
      },
      billing: {
        cardNumber: "**** **** **** 5678",
        expiration: "06/26",
        cvv: "***",
      },
      status: "Pending",
      date: "2025-04-22T15:00:00Z",
    },
  ];