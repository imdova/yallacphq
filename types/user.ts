export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member" | "viewer";
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  name: string;
  role: User["role"];
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  role?: User["role"];
}
