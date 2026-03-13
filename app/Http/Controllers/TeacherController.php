<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Teacher;
use Illuminate\Support\Facades\Redirect;

class TeacherController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;
        $teachers = Teacher::where('tenant_id', $tenantId)->get();

        return Inertia::render('Teacher/Index', [
            'teachers' => $teachers, 
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subjects' => 'required|string|max:50',
        ]);

        $validated['tenant_id'] = Auth::user()->tenant_id;

        Teacher::create($validated);

        return Redirect::route('teachers.index');
    }

    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subjects' => 'required|string|max:50',
        ]);

        $teacher->update($validated);

        return Redirect::route('teachers.index');
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return Redirect::route('teachers.index');
    }
}