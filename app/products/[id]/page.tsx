import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bqhrxkwtizwjiqmeudxx.supabase.co";
const supabaseAnonKey = "sb_publishable_-HfzRItn25hhJjdoSy7lmw_KkHenHWc";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  if (isNaN(productId)) {
    return notFound();
  }

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error || !product) {
    console.error("Error de Supabase al buscar producto:", error?.message);
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-8 text-white">
      <Link
        href="/"
        className="text-blue-400 hover:underline mb-6 inline-block font-medium"
      >
        &larr; Volver al catálogo
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={
              (product.images && product.images[0]) ||
              product.cover ||
              "https://via.placeholder.com/400"
            }
            alt={product.name || "Producto"}
            className="w-full h-80 object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              {product.brand || "Sin marca"}
            </span>
            <h1 className="text-3xl font-extrabold mt-2">{product.name}</h1>
            <p className="text-gray-300 mt-4 leading-relaxed">
              {product.description || "Sin descripción disponible."}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-green-400 text-3xl font-extrabold">
              ${Number(product.price || 0).toFixed(2)}{" "}
              <span className="text-sm font-normal text-gray-400">
                {product.currency || "USD"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}