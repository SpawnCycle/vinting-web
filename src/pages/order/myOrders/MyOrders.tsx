import { useEffect, useState } from "react";
import { getMyOrders } from "@/api/orderApi";
import type { OrderGetDto } from "@/types/Order";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState<OrderGetDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getMyOrders();
        setOrders(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  }

  if (loading) return <div className="orders-loading">Loading...</div>;

  console.log(orders[0]);
  return (
    <div className="orders-page">
      <div className="orders-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>My Orders</h1>
      </div>

      <div className="orders-list">
        {orders.map((order) => {
          const isDelivered = !!order.arrived_at;

          return (
            <div key={order.id} className="order-card">
              <img src={order.product.images[0].url} alt={order.product.name} />

              <div
                className="order-info"
                onClick={() => navigate(`/product/${order.product.id}`)}
              >
                <div className="order-title">
                  {order.product.brand || "Unknown"}
                </div>

                <div className="order-name">{order.product.name}</div>

                <div className="order-date">
                  Order date: {formatDate(order.created_at)}
                </div>
                {isDelivered && (
                  <div className="order-date">
                    Delivery date:{" "}
                    {formatDate(
                      order.arrived_at ? order.arrived_at : "0000-00-00",
                    )}
                  </div>
                )}
              </div>

              <div className="order-right">
                <div
                  className={`status ${isDelivered ? "delivered" : "ordered"}`}
                >
                  <span className="dot" />
                  {isDelivered ? "Delivered" : "Ordered"}
                </div>

                <div className="amount">
                  {order.amount} piece{order.amount > 1 ? "s" : ""}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
