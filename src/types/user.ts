export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string; // Fecha como string ISO
  updatedAt?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
