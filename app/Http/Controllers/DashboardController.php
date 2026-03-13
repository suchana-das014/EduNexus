<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Teacher;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;

        
        $teachers = Teacher::where('tenant_id', $tenantId)->get();

        return Inertia::render('Dashboard', [
            'teachers' => $teachers,
        ]);
    }
}