"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Product } from "../../../api/products/data";
import { SyntheticEvent } from "react";
import { saveProduct } from "@/services/products-services";
import { useRouter } from "next/navigation";

interface Props {
  product?: Product;
}

export function ProductForm({ product }: Props) {
  const router = useRouter();

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const ProductData = Object.fromEntries(formData);

    saveProduct(ProductData as any)
      .then((result) => {
        if (result) {
          alert("Producto guardado correctamente!");
          form.reset();
          router.push("/dashboard/products");
          router.refresh();
        }
      })
      .catch((error) => {
        console.error("Error al guardar el producto:", error);
        alert("Hubo un error al guardar el producto. Revisa la consola.");
      });
  }

  return (
    <Form
      className="flex w-96 flex-col gap-4 text-white"
      onSubmit={handleSubmit}
    >
      <TextField
        isRequired
        name="name"
        type="text"
        defaultValue={product?.name || ""}
        validate={(value) => {
          if (value.length < 3) return "Ingresa el nombre del producto";
          return null;
        }}
      >
        <Label>Nombre del producto</Label>
        <Input />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="description"
        type="text"
        defaultValue={product?.description || ""}
        validate={(value) => {
          if (value.length < 10) return "Ingresa la descripción del producto";
          return null;
        }}
      >
        <Label>Descripción</Label>
        <Input />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="brand"
        type="text"
        defaultValue={product?.brand || ""}
        validate={(value) => {
          if (value.length < 3) return "Ingresa la marca del producto";
          return null;
        }}
      >
        <Label>Marca</Label>
        <Input />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="cover"
        type="text"
        defaultValue={product?.cover || ""}
        validate={(value) => {
          if (!value) return "Ingresa la URL de la imagen (cover)";
          return null;
        }}
      >
        <Label>URL de la Imagen (Cover)</Label>
        <Input />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="images"
        type="text"
        defaultValue={product?.images ? product.images.join(", ") : ""}
        validate={(value) => {
          if (!value) return "Ingresa al menos una URL de imagen";
          return null;
        }}
      >
        <Label>Otras Imágenes (URLs separadas por coma)</Label>
        <Input />
        <FieldError />
      </TextField>

      <div className="grid grid-cols-2 gap-4 w-full">
        <TextField
          isRequired
          name="price"
          type="number"
          defaultValue={String(product?.price || 0)}
          validate={(value) => {
            if (Number(value) <= 0) return "Ingresa un precio válido";
            return null;
          }}
        >
          <Label>Precio</Label>
          <Input />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="currency"
          type="text"
          defaultValue={product?.currency || "MXN"}
          validate={(value) => {
            if (!value) return "Ingresa la moneda";
            return null;
          }}
        >
          <Label>Moneda</Label>
          <Input />
          <FieldError />
        </TextField>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <TextField
          isRequired
          name="rating"
          type="number"
          defaultValue={String(product?.rating || 0)}
          validate={(value) => {
            if (Number(value) < 0 || Number(value) > 5) return "Rating de 0 a 5";
            return null;
          }}
        >
          <Label>Rating</Label>
          <Input />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="stock"
          type="number"
          defaultValue={String(product?.stock || 0)}
          validate={(value) => {
            if (Number(value) < 0) return "Stock válido";
            return null;
          }}
        >
          <Label>Stock</Label>
          <Input />
          <FieldError />
        </TextField>
      </div>

      <Button type="submit" className="w-full bg-blue-600 text-white font-semibold">
        Guardar Producto
      </Button>
    </Form>
  );
}