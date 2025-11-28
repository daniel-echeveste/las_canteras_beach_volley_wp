<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class RankingController extends Controller
{
    public function index()
    {
        $fechaHasta = date('Y-m-d');
        $url = 'https://intranet.rfevb.com/webservices/rfevbcom/vplaya/vp-ranking-masculino.php?fechaHasta=' . $fechaHasta . '&buscar=';
        $response = Http::get($url);

        $ranking = [];

        if ($response->successful()) {
            // The API returns JSON directly
            $data = $response->json();
            
            if (is_array($data)) {
                foreach ($data as $index => $player) {
                    $ranking[] = [
                        'rank' => $index + 1, // Generate rank from position
                        'player' => $player['ApellidosNombre'] ?? 'N/A',
                        'points' => $player['Puntos'] ?? '0',
                    ];
                }
            }
        }
        
        // Mock data if API fails (for development/demo stability)
        if (empty($ranking)) {
             $ranking = [
                ['rank' => 1, 'player' => 'GAVIRA COLLADO, ADRIAN', 'points' => '19,060'],
                ['rank' => 2, 'player' => 'HERRERA ALLEPUZ, PABLO', 'points' => '18,700'],
                ['rank' => 3, 'player' => 'HUERTA PASTOR, JAVIER', 'points' => '15,124'],
                ['rank' => 4, 'player' => 'JIMENEZ GUTIERREZ, OSCAR', 'points' => '12,652'],
                ['rank' => 5, 'player' => 'PEREZ SUAREZ, PABLO JOSE', 'points' => '10,600'],
             ];
        }

        return Inertia::render('Ranking', [
            'ranking' => $ranking
        ]);
    }
}
