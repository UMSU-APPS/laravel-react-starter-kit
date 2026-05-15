<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class AttendanceService
{
    public function getPaginatedAttendances(Request $request)
    {
        $response = Http::get(config('app.umsu_api') . "/products");
        $products = $response->json();

        // Transform data to match our format
        return collect($products)->map(function ($product) {
            return [
                'id' => $product['id'],
                'title' => $product['title'],
                'price' => $product['price'],
                'description' => $product['description'],
                'category' => $product['category'],
                'image' => $product['image'],
                'rating' => $product['rating'] ?? ['rate' => 0, 'count' => 0],
            ];
        });
    }
}
