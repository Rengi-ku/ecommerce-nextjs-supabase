"use client";

import React from "react";
import { Card, CardHeader, CardFooter } from "@heroui/react";
import { Product } from "@/app/api/products/products";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="w-full p-4 flex flex-col justify-between bg-gray-900 border border-gray-800 rounded-xl">
    {product?.images && product.images.length > 0 && (
  <img
    alt={product?.name || "Producto"}
    className="aspect-square w-full rounded-2xl object-cover"
    loading="lazy"
    src={product.images[0]}
  />
)}

      {/* Encabezado / Contenido principal */}
      <CardHeader className="flex flex-col items-start px-0 pt-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          {product?.brand}
        </span>
        <h3 className="text-xl font-bold mt-1 text-white">{product?.name}</h3>
        <p className="text-green-400 text-xl font-extrabold mt-2">
          ${product?.price?.toFixed(2)}
        </p>
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
          {product?.description}
        </p>
      </CardHeader>

      {/* Pie de tarjeta con enlace y botón */}
      <CardFooter className="flex justify-between items-center px-0 pt-2 border-t border-gray-800 mt-4">
        <Link 
          href={`/products/${product?.id}`} 
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition"
        >
          Ver detalles &rarr;
        </Link>

        <button 
          onClick={() => alert("Producto agregado al carrito")}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-2 rounded-lg font-semibold transition"
        >
          Agregar al carrito
        </button>
      </CardFooter>
    </Card>
  );
}