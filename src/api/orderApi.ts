import type { OrderGetDto } from "@/types/Order";

export async function getMyOrders(): Promise<OrderGetDto[]> {
  const res = await fetch("/api/orders", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export async function orderProduct(productId: number, amount: number) {
  const res = await fetch(`/api/products/${productId}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ammount: amount,
    }),
  });

  if (!res.ok) {
    throw new Error("Order failed");
  }

  return res.json();
}

export async function allOrders(): Promise<OrderGetDto[]> {
  const res = await fetch("/api/orders/all", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

export async function deliverOrder(
  id: number,
  arrived: boolean,
): Promise<void> {
  const res = await fetch(`/api/orders/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      arrived: arrived,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to deliver order");
  }
}

export async function deleteOrder(id: number): Promise<void> {
  const res = await fetch(`/api/orders/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete order");
  }
}
