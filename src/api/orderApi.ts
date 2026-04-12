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

export async function orderProduct(productId: number, ammount: number) {
  const res = await fetch(`/api/products/${productId}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ammount: ammount,
    }),
  });

  if (!res.ok) {
    throw new Error("Order failed");
  }

  return res.json();
}
