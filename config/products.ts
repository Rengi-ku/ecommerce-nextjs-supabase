export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  images: string[];
  cover: string;
  price: number;
  currency: string;
  stock: number;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "DT23P Wireless Play Controller Black",
    description: "Control para videojuegos inalambrico de color negro.",
    brand: "GameTech",
    images: ["https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500"],
    cover: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500",
    price: 1259.00,
    currency: "USD",
    stock: 15,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Gear Headphone XYZ Mode",
    description: "Audifonos con cable y buen sonido.",
    brand: "AudioMaster",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
    cover: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    price: 1029.00,
    currency: "USD",
    stock: 8,
    rating: 4.9,
  }
];