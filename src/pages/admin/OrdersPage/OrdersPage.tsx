import { useEffect, useState } from "react";
import { Pencil, Trash2, Check } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useLoading } from "@/context/LoadingContext";
import type { OrderGetDto } from "@/types/Order";
import "./OrdersPage.css";
import { allOrders, deleteOrder, deliverOrder } from "@/api/orderApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderGetDto[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pendingDelivered, setPendingDelivered] = useState<boolean>(false);

  const { showToast } = useToast();
  const { setLoading } = useLoading();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const data = await allOrders();
      setOrders(data);
    } catch {
      showToast("Error", "Failed to load orders.", "error");
    } finally {
      setLoading(false);
    }
  }

  function startEditing(order: OrderGetDto) {
    setEditingId(order.id);
    setPendingDelivered(order.arrived_at !== null);
  }

  function cancelEditing() {
    setEditingId(null);
  }

  async function handleSave(id: number) {
    try {
      setLoading(true);
      await deliverOrder(id, pendingDelivered);
      showToast("Success", "Order updated.", "success");
      await fetchOrders();
      setEditingId(null);
    } catch {
      showToast("Error", "Failed to update order.", "error");
    } finally {
      setLoading(false);
    }
  }
  async function handleDelete(id: number) {
    if (!confirm("Delete this order?")) return;
    try {
      setLoading(true);
      await deleteOrder(id);
      showToast("Success", "Order deleted.", "success");
      await fetchOrders();
      setEditingId(null);
    } catch {
      showToast("Error", "Failed to delete order.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="orders">
      <div className="orders-header">
        <div className="orders-header-title">
          <h2>Orders</h2>
          <p className="num-orders">{orders.length} orders found</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>User ID</th>
              <th>Amount</th>
              <th>Ordered</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isEditing = editingId === order.id;
                const isDelivered = order.arrived_at !== null;

                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>

                    <td>
                      <div className="order-product">
                        {order.product.images?.[0] && (
                          <img
                            src={order.product.images[0].url}
                            alt={order.product.name}
                            className="order-product-img"
                          />
                        )}
                        <span>{order.product.name}</span>
                      </div>
                    </td>

                    <td>{order.user_id}</td>

                    <td>{order.ammount}</td>

                    <td>{new Date(order.created_at).toLocaleDateString()}</td>

                    <td>
                      {isEditing ? (
                        <input
                          type="checkbox"
                          className="delivered-checkbox"
                          checked={pendingDelivered}
                          onChange={(e) =>
                            setPendingDelivered(e.target.checked)
                          }
                        />
                      ) : (
                        <span
                          className={`delivered-badge ${isDelivered ? "yes" : "no"}`}
                        >
                          {isDelivered ? "Yes" : "No"}
                        </span>
                      )}
                    </td>

                    <td className="actions">
                      {isEditing ? (
                        <>
                          <button
                            className="icon-btn danger"
                            onClick={() => handleDelete(order.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                          <button
                            className="save-btn"
                            onClick={() => handleSave(order.id)}
                          >
                            Save
                          </button>
                          <button className="save-btn" onClick={cancelEditing}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="icon-btn"
                          onClick={() => startEditing(order)}
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
