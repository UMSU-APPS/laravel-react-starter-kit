<?php

namespace App\Http\Controllers\Configuration;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Requests\UpdateMenuRequest;
use App\Models\Configuration\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Ambil hanya menu utama (parent)
        $query = Menu::with(['subMenus' => function ($q) {
            $q->orderBy('orders', 'asc');
        }])->whereNull('main_menu_id');

        // Logika Pencarian Case-Insensitive untuk PostgreSQL
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                // Menggunakan ILIKE agar tidak sensitif huruf besar/kecil
                $q->where('name', 'ILIKE', "%{$search}%")
                    ->orWhere('category', 'ILIKE', "%{$search}%")

                    // Pencarian ke sub-menu
                    ->orWhereHas('subMenus', function ($subQ) use ($search) {
                        $subQ->where('name', 'ILIKE', "%{$search}%");
                    });
            });
        }

        return Inertia::render('configuration/menu/index', [
            'menus' => $query->orderBy('orders', 'asc')
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMenuRequest $request)
    {
        Menu::create($request->validated());

        return back()->with('success', 'Menu created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMenuRequest $request, Menu $menu)
    {
        $menu->update($request->validated());

        return back()->with('success', 'Menu updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();

        return back()->with('success', 'Menu deleted successfully.');
    }
}
