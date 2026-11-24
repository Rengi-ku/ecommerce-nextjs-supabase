import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bqhrxkwtizwjiqmeudxx.supabase.co";
const supabaseAnonKey = "sb_publishable_-HfzRItn25hhJjdoSy7lmw_KkHenHWc";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    let imagesArray: string[] = [];
    if (typeof body.images === "string") {
      imagesArray = body.images
        .replace(/[\[\]"]/g, "")
        .split(",")
        .map((url: string) => url.trim())
        .filter((url: string) => url.length > 0);
    } else if (Array.isArray(body.images)) {
      imagesArray = body.images;
    }

    const newProduct = {
      ...body,
      images: imagesArray,
    };

    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select();

    if (error) {
      console.error("DETALLE EXACTO DE SUPABASE:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    console.error("ERROR INTERNO:", err);
    return NextResponse.json({ error: err.message || "Error interno" }, { status: 500 });
  }
}