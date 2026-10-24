// Cliente del backend. Solo se usa del lado del servidor (Server Components y Server Actions).

const API_URL = process.env.API_URL ?? "http://localhost:8080";

export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
};

export type User = {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: "CLIENT" | "PROFESSIONAL" | "ADMIN";
};

export type AuthResponse = {
  accessToken: string;
  expiresAt: string;
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, headers, ...rest } = init;
  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });
  if (!response.ok) {
    const problem = await response.json().catch(() => null);
    throw new ApiError(response.status, problem?.detail ?? "Error inesperado del servidor");
  }
  return response.json() as Promise<T>;
}

export function getCategories() {
  return request<Category[]>("/api/categories");
}

export function register(body: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  accountType: "CLIENT" | "PROFESSIONAL";
}) {
  return request<AuthResponse>("/api/auth/register", { method: "POST", body: JSON.stringify(body) });
}

export function login(body: { email: string; password: string }) {
  return request<AuthResponse>("/api/auth/login", { method: "POST", body: JSON.stringify(body) });
}

export function getMe(token: string) {
  return request<User>("/api/me", { token });
}
