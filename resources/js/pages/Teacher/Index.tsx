import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface Teacher {
    teacher_id: number;
    tenant_id: number;
    first_name: string;
    last_name: string;
    subjects?: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
];

const emptyForm = {
    first_name: '',
    last_name: '',
    subjects: '',
};

type FormState = typeof emptyForm & { id?: number };

export default function TeacherIndex() {
    const { teachers } = usePage<{ teachers?: Teacher[] }>().props;
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (teacher: Teacher) => {
        setForm({
            id: teacher.teacher_id,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            subjects: teacher.subjects ?? '',
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
        if (isEdit && form.id) {
            router.put(`/teachers/${form.id}`, form, {
                onSuccess: () => handleClose(),
            });
        } else {
            router.post('/teachers', form, { onSuccess: () => handleClose() });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            router.delete(`/teachers/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="mt-6 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Teachers</h1>
                    <Button onClick={handleOpenAdd}>Add Teacher</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full rounded-lg border text-sm">
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
                                    Subjects
                                </th>
                                <th className="px-4 py-2 text-left font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {teacherList.map((teacher) => (
                                <tr
                                    key={teacher.teacher_id}
                                    className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700"
                                >
                                    <td className="px-4 py-2">
                                        {teacher.teacher_id}
                                    </td>
                                    <td className="px-4 py-2">
                                        {teacher.first_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {teacher.last_name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {teacher.subjects}
                                    </td>

                                    <td className="flex gap-2 px-4 py-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                handleOpenEdit(teacher)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                handleDelete(teacher.teacher_id)
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

            {/* Dialog for add/edit */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Update Teacher' : 'Add Teacher'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div>
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border px-3 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border px-3 py-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="subjects">Subjects</label>
                            <input
                                type="text"
                                name="subjects"
                                id="subjects"
                                value={form.subjects}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border px-3 py-2"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isEdit ? 'Update' : 'Add'} Teacher
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
