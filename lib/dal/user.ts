import * as db from "@/lib/db/users";
import type { User, CreateUserInput, UpdateUserInput } from "@/types/user";

/**
 * Data Access Layer: User.
 * All UI and server code must use these functions instead of importing from /lib/db.
 * Swap implementation here to use real API (fetch, server actions) without changing callers.
 */

export async function fetchUsers(): Promise<User[]> {
  return db.getUsers();
}

export async function fetchUserById(id: string): Promise<User | null> {
  return db.getUserById(id);
}

export async function createUser(data: CreateUserInput): Promise<User> {
  return db.createUser(data);
}

export async function updateUser(id: string, data: UpdateUserInput): Promise<User | null> {
  return db.updateUser(id, data);
}

export async function removeUser(id: string): Promise<boolean> {
  return db.deleteUser(id);
}
