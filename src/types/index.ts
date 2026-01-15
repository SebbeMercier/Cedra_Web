export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string;
    vendorId?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
}

export interface OrderItem {
    productId: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface User {
    id: string;
    email: string;
    companyName: string;
    role: 'admin' | 'buyer' | 'manager';
    budget?: number;
}
