import React, { useEffect, useState } from "react";
const API_BASE_URL = "https://eatoes-admin-dashboard-2ldp.onrender.com";


function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch("https://eatoes-admin-dashboard-2ldp.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      fetchOrders(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Orders Dashboard</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={th}>Order #</th>
              <th style={th}>Table</th>
              <th style={th}>Customer</th>
              <th style={th}>Total</th>
              <th style={th}>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={td}>{order.orderNumber}</td>
                <td style={td}>{order.tableNumber}</td>
                <td style={td}>{order.customerName}</td>
                <td style={td}>₹ {order.totalAmount}</td>
                <td style={td}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  borderBottom: "1px solid #ccc",
  textAlign: "left",
  padding: "10px",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

export default Orders;
