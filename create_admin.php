<?php

use App\Models\User;

$user = User::where('email', 'admin@example.com')->first();

if (!$user) {
    User::create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => bcrypt('password'),
        'email_verified_at' => now(),
    ]);
    echo "Admin user created successfully!\n";
} else {
    echo "Admin user already exists.\n";
}
