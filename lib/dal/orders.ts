import * as db from "@/lib/db/orders";
import type { CreateOrderInput, Order, UpdateOrderInput } from "@/types/order";

export async function fetchOrders(): Promise<Order[]> {
  return db.fetchOrders();
}

export async function fetchOrderById(id: string): Promise<Order | null> {
  return db.fetchOrderById(id);
}

export async function createOrder(data: CreateOrderInput): Promise<Order> {
  return db.createOrder(data);
}

export async function updateOrder(id: string, data: UpdateOrderInput): Promise<Order | null> {
  return db.updateOrder(id, data);
}

export async function removeOrder(id: string): Promise<boolean> {
  return db.removeOrder(id);
}

