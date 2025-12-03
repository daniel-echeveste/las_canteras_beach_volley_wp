<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\TournamentRegistration;
use App\Mail\TournamentRegistrationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class TournamentRegistrationController extends Controller
{
    public function store(Request $request, $postId)
    {
        $post = Post::findOrFail($postId);

        // Ensure this is a tournament post
        if ($post->post_type !== 'torneo') {
            return response()->json(['error' => 'Este post no es un torneo'], 400);
        }

        // Build validation rules dynamically based on form_fields
        $rules = [];
        foreach ($post->form_fields as $field) {
            $fieldRules = [];
            
            if ($field['required']) {
                $fieldRules[] = 'required';
            } else {
                $fieldRules[] = 'nullable';
            }

            // Add type-specific validation
            switch ($field['type']) {
                case 'email':
                    $fieldRules[] = 'email';
                    break;
                case 'phone':
                    $fieldRules[] = 'string';
                    break;
                case 'text':
                case 'textarea':
                    $fieldRules[] = 'string';
                    break;
                case 'select':
                    if (isset($field['options']) && is_array($field['options'])) {
                        $fieldRules[] = 'in:' . implode(',', $field['options']);
                    }
                    break;
            }

            $rules[$field['name']] = implode('|', $fieldRules);
        }

        $validated = $request->validate($rules);

        // Create registration
        $registration = TournamentRegistration::create([
            'post_id' => $post->id,
            'registration_data' => $validated,
        ]);

        // Send email notification
        try {
            Mail::to($post->contact_email)->send(new TournamentRegistrationMail($post, $validated));
        } catch (\Exception $e) {
            // Log error but don't fail the registration
            \Log::error('Failed to send tournament registration email: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Registro enviado correctamente'
        ]);
    }
}
