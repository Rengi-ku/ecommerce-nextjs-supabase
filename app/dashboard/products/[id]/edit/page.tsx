import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {ProductForm} from "../../components/ProductForm";

const supabaseUrl = "https://bqhrxkwtizwjiqmeudxx.supabase.co";
const supabaseAnonKey = "sb_publishable_-HfzRItn25hhJjdoSy7lmw_KkHenHWc";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export default async function EditProductPage({
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
    return notFound();
  }

  return (
    <main className="p-6 max-w-2xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
    <ProductForm product={product} />
    </main>
  );
}