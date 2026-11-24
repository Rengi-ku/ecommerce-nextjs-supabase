import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bqhrxkwtizwjiqmeudxx.supabase.co";
const supabaseAnonKey = "sb_publishable_-HfzRItn25hhJjdoSy7lmw_KkHenHWc";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export default async function HomePage() {

  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error al traer productos de Supabase:", error);
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <header className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-extrabold text-white">Catálogo de Productos</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product: any) => (
            <div
              key={product.id}
              className="border border-gray-800 bg-gray-900 rounded-xl overflow-hidden shadow-lg flex flex-col"
            >
              <div>
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : product.cover || "https://via.placeholder.com/400"
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    {product.brand || "Sin marca"}
                  </span>
                  <h2 className="font-bold text-lg text-white mt-1">{product.name}</h2>
                  <p className="font-extrabold text-green-400 text-xl mt-3">
                    ${Number(product.price || 0).toFixed(2)} {product.currency || "USD"}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
                  >
                    Ver detalles &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No hay productos disponibles.</p>
        )}
      </div>
    </main>
  );
}