import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "El texto es requerido" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    return NextResponse.json({ resultado: response.text });
  } catch (error) {
    console.error("Error al conectar con Gemini:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar la solicitud con IA." },
      { status: 500 }
    );
  }
}