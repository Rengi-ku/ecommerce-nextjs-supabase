import Link from "next/link";
import { ProductForm } from "../components/ProductForm";

export default function NewProductPage() {
  const product = {
    id: 0,
    name: "",
    description: "",
    brand: "",
    cover: "",
    rating: 0,
    images: [],
    price: 0,
    currency: "MXN",
    stock: 0,
  };

  return (
    <main className="p-6 max-w-2xl mx-auto text-white">
      {}
      <Link
        href="/dashboard/products"
        className="text-blue-400 hover:underline mb-4 inline-block font-medium"
      >
        &larr; Volver a la lista de productos
      </Link>

      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>

      <ProductForm product={product} />
    </main>
  );
}