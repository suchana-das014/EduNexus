<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Support\Facades\Redirect;

class CourseController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;

        $courses = Course::where('tenant_id', $tenantId)->get();
        $teachers = Teacher::where('tenant_id', $tenantId)->get();

        return Inertia::render('Course/Index', [
            'tenant_id' => $tenantId,
            'courses' => $courses,
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_name' => 'required|string|max:100',
            'teacher_id' => 'required|integer',
        ]);

        $validated['tenant_id'] = Auth::user()->tenant_id;

        Course::create($validated);

        return Redirect::route('courses.index');
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'course_name' => 'required|string|max:100',
            'teacher_id' => 'required|integer',
        ]);

        $course = Course::where('tenant_id', Auth::user()->tenant_id)->findOrFail($id);

        $course->update($validated);

        return Redirect::route('courses.index');
    }

    public function destroy(int $id)
    {
        $course = Course::where('tenant_id', Auth::user()->tenant_id)->findOrFail($id);

        $course->delete();

        return Redirect::route('courses.index');
    }
}