import { Table } from "@heroui/react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bqhrxkwtizwjiqmeudxx.supabase.co";
const supabaseAnonKey = "sb_publishable_-HfzRItn25hhJjdoSy7lmw_KkHenHWc";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export default async function ProductsPage() {
  let ProductsList: any[] = [];

  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error al cargar productos desde Supabase:", error);
  } else {
    ProductsList = data || [];
  }

  return (
    <main className="p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Lista de Productos</h2>
      <Link
        href="/dashboard/products/new"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition mb-4 inline-block"
      >
        + Agregar Nuevo Producto
      </Link>

      <Table aria-label="Lista de productos">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Productos"
            className="min-w-[600px]"
          >
            <Table.Header>
              <Table.Column isRowHeader>ID</Table.Column>
              <Table.Column>Imagen</Table.Column>
              <Table.Column>Nombre</Table.Column>
              <Table.Column>Marca</Table.Column>
              <Table.Column>Precio</Table.Column>
              <Table.Column>Acciones</Table.Column>
            </Table.Header>

            <Table.Body>
              {ProductsList && ProductsList.length > 0 ? (
                ProductsList.map((product: any) => (
                  <Table.Row key={product.id}>
                    <Table.Cell>{product.id}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={product.cover || (product.images && product.images[0]) || "https://via.placeholder.com/60"}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="object-cover rounded"
                      />
                    </Table.Cell>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell>{product.brand || "Sin marca"}</Table.Cell>
                    <Table.Cell>
                      {product.currency || "USD"} ${Number(product.price || 0).toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        href={`/dashboard/products/${product.id}/edit`}
                        className="text-blue-400 underline font-medium hover:text-blue-300"
                      >
                        Editar
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={6} className="text-center py-4">
                    No hay productos o ocurrió un error de conexión.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </main>
  );
}