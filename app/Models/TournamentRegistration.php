<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TournamentRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'registration_data',
    ];

    protected $casts = [
        'registration_data' => 'array',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
