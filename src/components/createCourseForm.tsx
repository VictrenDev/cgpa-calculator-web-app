"use client";
import Link from "next/link";
export default function CreateCourseModal() {
    return (
        <Link
            href="/dashboard/create-course"
            className="fixed bottom-8 right-8 flex items-center justify-center gap-1 md:gap-2 rounded-full bg-blue-600 px-4 md:px-6 py-4 text-xs md:text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                />
            </svg>
            Add Course
        </Link>
    );
}
