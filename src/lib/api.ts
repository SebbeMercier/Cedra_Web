import { Product, Order, User } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export const api = {
    products: {
        list: async (params?: { category?: string; search?: string }): Promise<Product[]> => {
            const query = new URLSearchParams(params as any).toString();
            const response = await fetch(`${API_BASE_URL}/api/products?${query}`);
            return handleResponse<Product[]>(response);
        },
        get: async (id: string): Promise<Product> => {
            const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
            return handleResponse<Product>(response);
        },
        searchAI: async (query: string): Promise<Product[]> => {
            const response = await fetch(`${API_BASE_URL}/api/ai/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            return handleResponse<Product[]>(response);
        }
    },
    orders: {
        create: async (order: Partial<Order>): Promise<Order> => {
            const response = await fetch(`${API_BASE_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
            return handleResponse<Order>(response);
        },
        get: async (id: string): Promise<Order> => {
            const response = await fetch(`${API_BASE_URL}/api/orders/${id}`);
            return handleResponse<Order>(response);
        }
    },
    auth: {
        login: async (credentials: any) => {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            return handleResponse<any>(response);
        }
    }
};
