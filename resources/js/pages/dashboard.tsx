import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Users, Book, GraduationCap, BookOpen, ListChecks } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';

type DashboardProps = {
    totalStudents: number;
    totalCourses: number;
    totalTeachers: number;
    totalSubjects: number;
    totalEnrollments: number;
    schoolName?: string;
};

type StatKey = keyof DashboardProps;

const stats: {
    label: string;
    icon: any;
    key: StatKey;
    description: string;
    color: string;
}[] = [
    {
        label: 'Students',
        icon: Users,
        key: 'totalStudents',
        description: 'Total students',
        color: 'text-blue-500',
    },
    {
        label: 'Courses',
        icon: Book,
        key: 'totalCourses',
        description: 'Total courses offered',
        color: 'text-green-500',
    },
    {
        label: 'Teachers',
        icon: GraduationCap,
        key: 'totalTeachers',
        description: 'Total teachers',
        color: 'text-purple-500',
    },
    {
        label: 'Subjects',
        icon: BookOpen,
        key: 'totalSubjects',
        description: 'Total subjects',
        color: 'text-yellow-500',
    },
    {
        label: 'Enrollments',
        icon: ListChecks,
        key: 'totalEnrollments',
        description: 'Total course enrollments',
        color: 'text-pink-500',
    },
];

export default function Dashboard() {
    const pageProps = usePage<DashboardProps>().props;

    return (
        <AppLayout>
            <Head title="Dashboard" />

            {/* Outer container: min-h-screen ensures desktop fits viewport, overflow-auto allows scrolling on small screens */}
            <div className="flex min-h-screen flex-col overflow-auto bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-950">
                <div className="mx-auto flex w-full max-w-7xl flex-col py-8 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-4xl font-extrabold tracking-tight text-primary drop-shadow-lg">
                            Dashboard
                        </h1>

                        {pageProps.schoolName && (
                            <div className="mt-1 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                <span className="inline-block rounded-full bg-primary/10 px-4 py-1 font-bold text-primary shadow-sm dark:bg-primary/20">
                                    {pageProps.schoolName}
                                </span>
                            </div>
                        )}

                        <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400"></div>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                        {stats.map(
                            ({
                                label,
                                icon: Icon,
                                key,
                                description,
                                color,
                            }) => (
                                <Card
                                    key={label}
                                    className="transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <CardHeader className="flex items-center justify-between pb-2">
                                        <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                            <Icon
                                                className={`h-6 w-6 ${color}`}
                                            />
                                            {label}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="text-center text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow dark:text-white">
                                            {pageProps[key] ?? 0}
                                        </div>
                                        <CardDescription className="text-center text-base">
                                            {description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ),
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
