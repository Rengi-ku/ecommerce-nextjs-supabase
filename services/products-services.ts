const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  brand?: string;
  cover?: string;
  images?: string[];
  currency?: string;
  rating?: number;
  stock?: number;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    if (!query || query.trim() === "") {
      return getProducts();
    }
    const res = await fetch(`${API_BASE_URL}/api/products/search/${encodeURIComponent(query)}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error al buscar productos:", error);
    return [];
  }
}

export async function saveProduct(product: Product): Promise<Product> {
  const response = await fetch('/api/products', {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Error al guardar el producto: " + response.status);
  }
  return await response.json();
}