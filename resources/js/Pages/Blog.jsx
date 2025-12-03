import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function Blog({ posts }) {
    return (
        <>
            <Head title="Blog - Las Canteras Vóley" />
            <div className="min-h-screen bg-[#FFF8E8] text-gray-900 font-sans">
                <Navbar />
                <div className="pt-24 max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl font-extrabold text-[#1CA9C9] mb-6">Blog y Noticias</h1>
                    <p className="text-lg text-gray-700 mb-12">
                        Últimas noticias, consejos de entrenamiento y eventos de la comunidad.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.isArray(posts) && posts.map((post) => (
                            <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {post.image_path && (
                                    <img
                                        src={`/storage/${post.image_path}`}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="text-sm text-gray-500 mb-2">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.content}
                                    </p>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-[#1CA9C9] font-semibold hover:text-[#158BA8] transition-colors"
                                    >
                                        Leer más →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {(!Array.isArray(posts) || posts.length === 0) && (
                        <div className="text-center py-12 text-gray-500">
                            No hay noticias publicadas todavía.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
