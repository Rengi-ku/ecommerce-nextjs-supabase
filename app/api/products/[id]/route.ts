import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bqhrxkwtizwjiqmeudxx.supabase.co";
const supabaseAnonKey = "sb_publishable_-HfzRItn25hhJjdoSy7lmw_KkHenHWc"; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const imagesArray = typeof body.images === "string" && body.images.trim() !== ""
      ? body.images.split(",").map((url: string) => url.trim())
      : [];

    const newProduct = {
      ...body,
      images: imagesArray,
    };

    const { data, error } = await supabase
      .from("products")
      .insert([newProduct])
      .select();

    if (error) {
      console.error("Error de Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}