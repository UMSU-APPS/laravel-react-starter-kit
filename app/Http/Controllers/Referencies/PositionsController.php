<?php

namespace App\Http\Controllers\Referencies;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePositionsRequest;
use App\Http\Requests\UpdatePositionsRequest;
use App\Models\Referencies\Positions;
use App\Services\PositionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionsController extends Controller
{
    public function __construct(protected PositionService $positionService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('referencies/position/index', [
            'positions' => $this->positionService->getPaginatedPositions($request),
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePositionsRequest $request)
    {
        Positions::create($request->validated());

        return back()->with('success', 'Position created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Positions $position)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Positions $position)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePositionsRequest $request, Positions $position)
    {
        $position->update($request->validated());

        return back()->with('success', 'Position updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Positions $position)
    {
        $this->positionService->delete($position);
        return back()->with('success', 'Position deleted successfully.');
    }
}
