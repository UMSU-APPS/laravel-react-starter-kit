<?php

namespace App\Services;

use App\Models\Referencies\Positions;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PositionService
{
    public function getPaginatedPositions(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);

        return Positions::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'ILIKE', "%{$search}%")
                    ->orWhere('code', 'ILIKE', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function delete(Positions $position)
    {
        if ($position->employees()->count() > 0) {
            throw ValidationException::withMessages([
                'message' => "Posisi '{$position->name}' memiliki pegawai dan tidak dapat dihapus."
            ]);
        }

        return $position->delete();
    }
}
