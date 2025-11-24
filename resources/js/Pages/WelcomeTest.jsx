import React from "react";
import { Head } from "@inertiajs/react";

export default function WelcomeTest({ appName, version }) {
    return (
        <>
            <Head title="Vóley Playa Las Canteras" />

            <div className="min-h-screen bg-gray-100 text-gray-900">

                {/* Hero */}
                <section className="relative bg-[url('https://estaticos-cdn.prensaiberica.es/clip/bbc75e72-3f84-4133-afc1-c27ea269461a_16-9-discover-aspect-ratio_default_0.jpg')] bg-cover bg-center bg-no-repeat">
                    <div className="bg-black/50">
                        <div className="max-w-4xl mx-auto text-center py-32 px-4">
                            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
                                Vóley Playa Las Canteras
                            </h1>
                            <p className="text-xl text-gray-200 mt-4">
                                Comunidad, deporte y buen ambiente en una de las mejores playas urbanas del mundo.
                            </p>

                            <div className="mt-8">
                                <a
                                    href="#actividades"
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition"
                                >
                                    Ver Actividades
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección Actividades */}
                <section id="actividades" className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-10">Actividades</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                                <h3 className="text-2xl font-bold mb-2">Partidos diarios</h3>
                                <p className="text-gray-700">Únete a partidos abiertos todos los días al atardecer.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                                <h3 className="text-2xl font-bold mb-2">Entrenamientos</h3>
                                <p className="text-gray-700">Mejora tu técnica con entrenadores de primer nivel.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
                                <h3 className="text-2xl font-bold mb-2">Torneos</h3>
                                <p className="text-gray-700">Participa en eventos y competiciones locales.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sobre la comunidad */}
                <section className="bg-yellow-100 py-20">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-6">Una comunidad para todos</h2>
                        <p className="text-lg text-gray-800">
                            Tanto si eres principiante como jugador avanzado, siempre encontrarás un hueco en Las Canteras.
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-6 bg-gray-900 text-center text-gray-300">
                    <p>{appName} v{version} — Vóley Playa Las Canteras © {new Date().getFullYear()}</p>
                </footer>
            </div>
        </>
    );
}
