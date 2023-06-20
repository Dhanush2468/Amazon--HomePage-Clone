import React, { useState, useEffect } from 'react';
import './Orders.css';
import { useStateValue } from "./StateProvider";
import Order from './Order';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders for the logged-in user
    const fetchOrders = async () => {
      try {
        // Replace this with your own logic to fetch orders for the user
        const response = await fetch(`/api/orders?userId=${user?.id}`);
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>

      <div className='orders__order'>
        {orders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
