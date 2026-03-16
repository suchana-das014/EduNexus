<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Support\Facades\Redirect;

class StudentController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;

        $students = Student::where('tenant_id', $tenantId)->get();

        return Inertia::render('Student/Index', [
            'tenantId' => $tenantId,
            'students' => $students,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'grade' => 'required|string|max:50',
        ]);

        $validated['tenant_id'] = Auth::user()->tenant_id;

        Student::create($validated);

        return Redirect::route('students.index');
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'grade' => 'required|string|max:50',
        ]);

        $student = Student::where('tenant_id', Auth::user()->tenant_id)
            ->findOrFail($id);

        $student->update($validated);

        return Redirect::route('students.index');
    }

    public function destroy(int $id)
    {
        $student = Student::where('tenant_id', Auth::user()->tenant_id)
            ->findOrFail($id);

        $student->delete();

        return Redirect::route('students.index');
    }
}