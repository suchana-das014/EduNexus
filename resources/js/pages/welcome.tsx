import { Head, Link } from '@inertiajs/react';

export default function Welcome({ canRegister }: { canRegister: boolean }) {
    return (
        <>
            <Head title="EduNexus" />

            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl sm:p-10">
                    <h1 className="mb-3 text-3xl font-bold">EduNexus</h1>

                    <p className="mb-8 text-gray-600">
                        Smart platform to manage teachers, students, courses and
                        enrollments.
                    </p>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="/login"
                            className="rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
                        >
                            Login
                        </Link>

                        {canRegister && (
                            <Link
                                href="/register"
                                className="rounded-lg border border-gray-300 py-2 transition hover:bg-gray-100"
                            >
                                Register
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
