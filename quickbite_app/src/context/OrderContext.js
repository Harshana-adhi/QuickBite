import { createContext, useContext, useState } from 'react';

export const ORDER_STATUSES = ['Placed', 'Preparing', 'Ready for pickup'];

const STATUS_DELAY = 10000;

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const updateStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const placeOrder = (cartItems, subtotal) => {
    const itemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const prepMinutes = Math.min(10 + itemCount * 2, 40);
    const now = new Date();

    const order = {
      id: `QB-${Math.floor(1000 + Math.random() * 9000)}`,
      items: cartItems,
      itemCount,
      total: subtotal,
      placedAt: now,
      pickupTime: new Date(now.getTime() + prepMinutes * 60000),
      status: ORDER_STATUSES[0],
    };

    setOrders((prev) => [order, ...prev]);

    setTimeout(() => updateStatus(order.id, ORDER_STATUSES[1]), STATUS_DELAY);
    setTimeout(() => updateStatus(order.id, ORDER_STATUSES[2]), STATUS_DELAY * 2);

    return order;
  };

  const getOrderById = (orderId) => orders.find((order) => order.id === orderId);

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
