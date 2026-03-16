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
import { useState } from 'react';

interface Teacher {
    teacher_id: number;
    tenant_id: number;
    first_name: string;
    last_name: string;
    subjects?: string;
    updated_at: string;
}

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
        <AppLayout>
            <Card className="mt-6 p-4 sm:p-6">
                <div className="mb-4 flex flex-nowrap items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Teachers
                    </h1>
                    <Button onClick={handleOpenAdd}>Add Teacher</Button>
                </div>

                <div className="mb-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400"></div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm dark:border-neutral-800">
                    <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-neutral-700">
                        <thead className="bg-gray-100 dark:bg-neutral-800">
                            <tr>
                                <th className="px-2 py-1 text-left font-semibold sm:px-4 sm:py-2">
                                    ID
                                </th>
                                <th className="px-2 py-1 text-left font-semibold sm:px-4 sm:py-2">
                                    First Name
                                </th>
                                <th className="px-2 py-1 text-left font-semibold sm:px-4 sm:py-2">
                                    Last Name
                                </th>
                                <th className="px-2 py-1 text-left font-semibold sm:px-4 sm:py-2">
                                    Subjects
                                </th>
                                <th className="px-2 py-1 text-left font-semibold sm:px-4 sm:py-2">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {teacherList.map((teacher) => (
                                <tr
                                    key={teacher.teacher_id}
                                    className="hover:bg-gray-50 dark:hover:bg-neutral-700"
                                >
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                                        {teacher.teacher_id}
                                    </td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                                        {teacher.first_name}
                                    </td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                                        {teacher.last_name}
                                    </td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                                        {teacher.subjects}
                                    </td>
                                    <td className="flex flex-col gap-2 px-2 py-1 sm:flex-row sm:px-4 sm:py-2">
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

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Update Teacher' : 'Add Teacher'}
                        </DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                    >
                        <div className="col-span-1">
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

                        <div className="col-span-1">
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

                        <div className="col-span-1 sm:col-span-2">
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

                        <div className="col-span-1 flex justify-end gap-2 sm:col-span-2">
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
