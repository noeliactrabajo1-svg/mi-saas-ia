"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarGeneracion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setCargando(true);
    setRespuesta("");

    try {
      const res = await fetch("/api/generar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setRespuesta(data.resultado);
      } else {
        setRespuesta(`Error: ${data.error}`);
      }
    } catch (err) {
      setRespuesta("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-indigo-400 mb-2">
            SmartBiz AI Assistant
          </h1>
          <p className="text-slate-400">
            Plataforma inteligente de gestión y generación de contenidos para tu negocio.
          </p>
        </header>

        <section className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
          <form onSubmit={manejarGeneracion} className="space-y-4">
            <label className="block text-sm font-medium text-slate-300">
              ¿Qué necesitas que la IA genere hoy?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: Escribe un correo de seguimiento para un cliente interesado en presupuestos..."
              className="w-full h-32 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            >
              {cargando ? "Generando respuesta..." : "Generar con IA"}
            </button>
          </form>

          {respuesta && (
            <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-indigo-500/30">
              <h2 className="text-sm font-semibold text-indigo-400 mb-2">
                Resultado:
              </h2>
              <p className="text-slate-200 whitespace-pre-wrap">{respuesta}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}