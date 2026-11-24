import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  brand?: string;
  cover?: string;
  rating?: number;    
  images?: string[];   
  price?: number;
  currency?: string;
  stock?: number;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Endpoint GET: /api/products
 * Retorna todos los productos desde Supabase
 */
export async function GET() {
  try {
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}