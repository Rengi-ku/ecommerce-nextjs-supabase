import { searchProducts } from "@/services/products-services";
import { Product } from "@/app/api/products/data";
import Link from "next/link";

export default async function SearchProductsPage({
  params,
}: {
  params: Promise<{ q: string }>;
}) {
  const { q } = await params;
  
 
  const searchQuery = decodeURIComponent(q || "");
  const products = await searchProducts(searchQuery);

  return (
    <main className="max-w-6xl mx-auto p-8 text-white">
      <Link href="/" className="text-blue-400 hover:underline mb-6 inline-block font-medium">
        &larr; Volver al catálogo
      </Link>

      <h1 className="text-2xl font-bold mb-6">
        Resultados de búsqueda para: <span className="text-blue-400">"{searchQuery}"</span>
      </h1>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <div 
              key={product.id} 
              className="border border-gray-800 bg-gray-900 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div>
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    {product.brand}
                  </span>
                  <h2 className="font-bold text-lg text-white mt-1">{product.name}</h2>
                  <p className="font-extrabold text-green-400 text-xl mt-3">${product.price?.toFixed(2)}</p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between gap-3">
                <Link 
                  href={`/products/${product.id}`} 
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
                >
                  Ver detalles &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400 bg-gray-900 rounded-xl border border-gray-800">
          No se encontraron productos que coincidan con la búsqueda.
        </div>
      )}
    </main>
  );
}