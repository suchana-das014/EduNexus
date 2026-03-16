import AppLayout from '@/layouts/app-layout';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Enrollment {
    enrollment_id: number;
    tenant_id: number;
    student_id: number;
    course_id: number;
    enrollment_date: string;
}

interface Student {
    student_id: number;
    first_name: string;
    last_name: string;
}

interface Course {
    course_id: number;
    course_name: string;
}

const emptyForm = { student_id: '', course_id: '', enrollment_date: '' };
type FormState = typeof emptyForm & { id?: number };

export default function EnrollmentIndex() {
    const { enrollments, students, courses } = usePage<{
        enrollments?: Enrollment[];
        students?: Student[];
        courses?: Course[];
    }>().props;

    const enrollmentList = enrollments ?? [];
    const studentList = students ?? [];
    const courseList = courses ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (enrollment: Enrollment) => {
        setForm({
            id: enrollment.enrollment_id,
            student_id: String(enrollment.student_id),
            course_id: String(enrollment.course_id),
            enrollment_date: enrollment.enrollment_date,
        });
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            student_id: Number(form.student_id),
            course_id: Number(form.course_id),
        };
        if (isEdit && form.id) {
            router.put(`/enrollments/${form.id}`, payload, {
                onSuccess: () => handleClose(),
            });
        } else {
            router.post('/enrollments', payload, {
                onSuccess: () => handleClose(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (
            window.confirm('Are you sure you want to delete this enrollment?')
        ) {
            router.delete(`/enrollments/${id}`);
        }
    };

    const getStudentName = (student_id: number) => {
        const student = studentList.find(
            (s) => Number(s.student_id) === Number(student_id),
        );
        return student
            ? `${student.first_name} ${student.last_name}`
            : 'Unknown Student';
    };

    const getCourseName = (course_id: number) => {
        const course = courseList.find(
            (c) => Number(c.course_id) === Number(course_id),
        );
        return course ? course.course_name : 'Unknown Course';
    };

    return (
        <AppLayout>
            <Card className="mt-6 p-4 sm:p-6">
                <div className="mb-4 flex flex-nowrap items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Enrollments
                    </h1>
                    <Button onClick={handleOpenAdd}>Add Enrollment</Button>
                </div>

                <div className="mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400"></div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto rounded-lg border text-sm">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">
                                    ID
                                </th>
                                <th className="px-4 py-2 text-left font-semibold">
                                    Student
                                </th>
                                <th className="px-4 py-2 text-left font-semibold">
                                    Course
                                </th>
                                <th className="px-4 py-2 text-left font-semibold">
                                    Enrollment Date
                                </th>
                                <th className="px-4 py-2 text-left font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollmentList.map((enrollment) => (
                                <tr
                                    key={enrollment.enrollment_id}
                                    className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
                                >
                                    <td className="px-4 py-2">
                                        {enrollment.enrollment_id}
                                    </td>
                                    <td className="px-4 py-2">
                                        {getStudentName(enrollment.student_id)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {getCourseName(enrollment.course_id)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {enrollment.enrollment_date}
                                    </td>
                                    <td className="flex flex-wrap gap-2 px-4 py-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                handleOpenEdit(enrollment)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(
                                                    enrollment.enrollment_id,
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Update Enrollment' : 'Add Enrollment'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div>
                            <Label htmlFor="student_id">Student</Label>
                            <select
                                name="student_id"
                                value={form.student_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        student_id: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border px-3 py-2"
                                required
                            >
                                <option value="">Select Student</option>
                                {studentList.map((s) => (
                                    <option
                                        key={s.student_id}
                                        value={s.student_id}
                                    >
                                        {s.first_name} {s.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="course_id">Course</Label>
                            <select
                                name="course_id"
                                value={form.course_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        course_id: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border px-3 py-2"
                                required
                            >
                                <option value="">Select Course</option>
                                {courseList.map((c) => (
                                    <option
                                        key={c.course_id}
                                        value={c.course_id}
                                    >
                                        {c.course_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="enrollment_date">
                                Enrollment Date
                            </Label>
                            <Input
                                type="date"
                                name="enrollment_date"
                                value={form.enrollment_date}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        enrollment_date: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="flex flex-wrap justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isEdit ? 'Update' : 'Add'} Enrollment
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
