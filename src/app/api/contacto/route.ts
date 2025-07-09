// src/app/api/contacto/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    mensaje: "Hola desde tu API de contacto 👋",
    autor: "Antonio Lozano",
    fecha: new Date().toISOString(),
  });
}
