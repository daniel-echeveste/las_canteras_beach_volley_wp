<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->get();
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_published' => 'boolean',
            'post_type' => 'required|in:noticia,evento,torneo',
            'event_date' => 'required_if:post_type,evento|nullable|date',
            'contact_email' => 'required_if:post_type,torneo|nullable|email',
            'form_fields' => 'required_if:post_type,torneo|nullable|array',
            'form_fields.*.name' => 'required|string',
            'form_fields.*.label' => 'required|string',
            'form_fields.*.type' => 'required|in:text,email,phone,textarea,select',
            'form_fields.*.required' => 'boolean',
            'form_fields.*.options' => 'nullable|array',
        ]);

        $slug = Str::slug($validated['title']);
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        Post::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'image_path' => $imagePath,
            'is_published' => $validated['is_published'] ?? false,
            'post_type' => $validated['post_type'],
            'event_date' => $validated['event_date'] ?? null,
            'contact_email' => $validated['contact_email'] ?? null,
            'form_fields' => $validated['form_fields'] ?? null,
        ]);

        return redirect()->route('admin.posts.index')->with('success', 'Post creado correctamente.');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_published' => 'boolean',
            'post_type' => 'required|in:noticia,evento,torneo',
            'event_date' => 'required_if:post_type,evento|nullable|date',
            'contact_email' => 'required_if:post_type,torneo|nullable|email',
            'form_fields' => 'required_if:post_type,torneo|nullable|array',
            'form_fields.*.name' => 'required|string',
            'form_fields.*.label' => 'required|string',
            'form_fields.*.type' => 'required|in:text,email,phone,textarea,select',
            'form_fields.*.required' => 'boolean',
            'form_fields.*.options' => 'nullable|array',
        ]);

        $slug = Str::slug($validated['title']);
        $imagePath = $post->image_path;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        $post->update([
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'image_path' => $imagePath,
            'is_published' => $validated['is_published'] ?? false,
            'post_type' => $validated['post_type'],
            'event_date' => $validated['event_date'] ?? null,
            'contact_email' => $validated['contact_email'] ?? null,
            'form_fields' => $validated['form_fields'] ?? null,
        ]);

        return redirect()->route('admin.posts.index')->with('success', 'Post actualizado correctamente.');
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('admin.posts.index')->with('success', 'Post eliminado correctamente.');
    }
}
