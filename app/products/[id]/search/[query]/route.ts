import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  request: Request,
  context: { params: Promise<{ query: string }> | { query: string } }
) {
  try {
    const resolvedParams = await context.params;
    const query = decodeURIComponent(resolvedParams.query);

    const supabase = createClient(
      "https://bqhrxkwtizwjiqmeudxx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaHJ4a3d0aXp3amlxbWV1ZHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwNDEyMzIsImV4cCI6MjEwODYxNzIzMn0.wH0fwhWAbnqPwlfsd6nYfw2Fl1zXystHUkeQclm0qVk"
    );

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${query}%`);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}