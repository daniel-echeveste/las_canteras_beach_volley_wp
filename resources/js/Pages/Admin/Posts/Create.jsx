import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        image: null,
        is_published: false,
        post_type: 'noticia',
        event_date: '',
        contact_email: '',
        form_fields: [],
    });

    const [newField, setNewField] = useState({
        name: '',
        label: '',
        type: 'text',
        required: false,
        options: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.posts.store'));
    };

    const addFormField = () => {
        if (newField.name && newField.label) {
            setData('form_fields', [...data.form_fields, { ...newField }]);
            setNewField({
                name: '',
                label: '',
                type: 'text',
                required: false,
                options: []
            });
        }
    };

    const removeFormField = (index) => {
        const updated = data.form_fields.filter((_, i) => i !== index);
        setData('form_fields', updated);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear Post</h2>}
        >
            <Head title="Admin - Crear Post" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Post Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Post</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="noticia"
                                                checked={data.post_type === 'noticia'}
                                                onChange={e => setData('post_type', e.target.value)}
                                                className="mr-2"
                                            />
                                            Noticia
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="evento"
                                                checked={data.post_type === 'evento'}
                                                onChange={e => setData('post_type', e.target.value)}
                                                className="mr-2"
                                            />
                                            Evento
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="torneo"
                                                checked={data.post_type === 'torneo'}
                                                onChange={e => setData('post_type', e.target.value)}
                                                className="mr-2"
                                            />
                                            Torneo
                                        </label>
                                    </div>
                                    {errors.post_type && <div className="text-red-500 text-sm mt-1">{errors.post_type}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Título</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contenido</label>
                                    <textarea
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        rows="10"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    ></textarea>
                                    {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Imagen</label>
                                    <input
                                        type="file"
                                        onChange={e => setData('image', e.target.files[0])}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                    {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                                </div>

                                {/* Event Date - Only for eventos */}
                                {data.post_type === 'evento' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Fecha del Evento</label>
                                        <input
                                            type="datetime-local"
                                            value={data.event_date}
                                            onChange={e => setData('event_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.event_date && <div className="text-red-500 text-sm mt-1">{errors.event_date}</div>}
                                    </div>
                                )}

                                {/* Tournament Fields - Only for torneos */}
                                {data.post_type === 'torneo' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email de Contacto</label>
                                            <input
                                                type="email"
                                                value={data.contact_email}
                                                onChange={e => setData('contact_email', e.target.value)}
                                                placeholder="email@ejemplo.com"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                            {errors.contact_email && <div className="text-red-500 text-sm mt-1">{errors.contact_email}</div>}
                                        </div>

                                        <div className="border-t pt-4">
                                            <h3 className="text-lg font-semibold mb-4">Campos del Formulario de Inscripción</h3>

                                            {/* Existing Form Fields */}
                                            {data.form_fields.length > 0 && (
                                                <div className="mb-4 space-y-2">
                                                    {data.form_fields.map((field, index) => (
                                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                                            <div>
                                                                <span className="font-medium">{field.label}</span>
                                                                <span className="text-sm text-gray-500 ml-2">({field.type})</span>
                                                                {field.required && <span className="text-red-500 ml-2">*</span>}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFormField(index)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Add New Field */}
                                            <div className="bg-blue-50 p-4 rounded space-y-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Nombre del Campo</label>
                                                        <input
                                                            type="text"
                                                            value={newField.name}
                                                            onChange={e => setNewField({ ...newField, name: e.target.value })}
                                                            placeholder="nombre_completo"
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Etiqueta</label>
                                                        <input
                                                            type="text"
                                                            value={newField.label}
                                                            onChange={e => setNewField({ ...newField, label: e.target.value })}
                                                            placeholder="Nombre Completo"
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                                                        <select
                                                            value={newField.type}
                                                            onChange={e => setNewField({ ...newField, type: e.target.value })}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        >
                                                            <option value="text">Texto</option>
                                                            <option value="email">Email</option>
                                                            <option value="phone">Teléfono</option>
                                                            <option value="textarea">Área de Texto</option>
                                                            <option value="select">Selección</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex items-end">
                                                        <label className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={newField.required}
                                                                onChange={e => setNewField({ ...newField, required: e.target.checked })}
                                                                className="mr-2"
                                                            />
                                                            Campo obligatorio
                                                        </label>
                                                    </div>
                                                </div>
                                                {newField.type === 'select' && (
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Opciones (separadas por coma)</label>
                                                        <input
                                                            type="text"
                                                            onChange={e => setNewField({ ...newField, options: e.target.value.split(',').map(o => o.trim()) })}
                                                            placeholder="Opción 1, Opción 2, Opción 3"
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        />
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={addFormField}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                >
                                                    Añadir Campo
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={e => setData('is_published', e.target.checked)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">Publicar inmediatamente</label>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route('admin.posts.index')}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-[#1CA9C9] text-white rounded-md hover:bg-[#158BA8] disabled:opacity-50"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
