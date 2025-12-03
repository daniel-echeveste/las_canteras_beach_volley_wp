import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, posts }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
            destroy(route('admin.posts.destroy', id));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog Posts</h2>}
        >
            <Head title="Admin - Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end mb-4">
                                <Link
                                    href={route('admin.posts.create')}
                                    className="px-4 py-2 bg-[#1CA9C9] text-white rounded-md hover:bg-[#158BA8]"
                                >
                                    Crear Nuevo Post
                                </Link>
                            </div>

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {posts.map((post) => (
                                        <tr key={post.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.post_type === 'noticia' ? 'bg-blue-100 text-blue-800' :
                                                        post.post_type === 'evento' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-orange-100 text-orange-800'
                                                    }`}>
                                                    {post.post_type === 'noticia' ? 'Noticia' :
                                                        post.post_type === 'evento' ? 'Evento' :
                                                            'Torneo'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {post.is_published ? 'Publicado' : 'Borrador'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('admin.posts.edit', post.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
