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

interface Student {
    student_id: number;
    tenant_id: number;
    first_name: string;
    last_name: string;
    grade: number;
}

const emptyForm = { first_name: '', last_name: '', grade: '' };
type FormState = typeof emptyForm & { id?: number };

export default function StudentIndex() {
    const { students } = usePage<{ students?: Student[] }>().props;
    const studentList = students ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (student: Student) => {
        setForm({
            id: student.student_id,
            first_name: student.first_name,
            last_name: student.last_name,
            grade: String(student.grade),
        });
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { ...form, grade: Number(form.grade) };
        if (isEdit && form.id) {
            router.put(`/students/${form.id}`, payload, {
                onSuccess: () => handleClose(),
            });
        } else {
            router.post('/students', payload, {
                onSuccess: () => handleClose(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            router.delete(`/students/${id}`);
        }
    };

    return (
        <AppLayout>
            <Card className="mt-6 p-4 sm:p-6">
                <div className="mb-4 flex flex-nowrap items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Students
                    </h1>
                    <Button onClick={handleOpenAdd}>Add Student</Button>
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
                                    First Name
                                </th>
                                <th className="px-4 py-2 text-left font-semibold">
                                    Last Name
                                </th>
                                <th className="px-4 py-2 text-left font-semibold">
                                    Grade
                                </th>
                                <th className="px-4 py-2 text-left font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {studentList.map((student) => (
                                <tr
                                    key={student.student_id}
                                    className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
                                >
                                    <td className="px-4 py-2">
                                        {student.student_id}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.first_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.last_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {student.grade}
                                    </td>
                                    <td className="flex flex-wrap gap-2 px-4 py-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                handleOpenEdit(student)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(student.student_id)
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
                            {isEdit ? 'Update Student' : 'Add Student'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div>
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                type="text"
                                name="first_name"
                                id="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                type="text"
                                name="last_name"
                                id="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="grade">Grade</Label>
                            <Input
                                type="number"
                                name="grade"
                                id="grade"
                                value={form.grade}
                                onChange={handleChange}
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
                                {isEdit ? 'Update' : 'Add'} Student
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
