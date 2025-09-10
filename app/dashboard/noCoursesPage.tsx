import Link from "next/link"

export default function NoCourses() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    No Courses Available
                </h1>
                <p className="text-muted-foreground max-w-md">
                    You haven&apos;t created any courses yet. Get started by creating your first
                    course.
                </p>
            </div>

            <div className="flex gap-4">
                <Link
                    href="/dashboard/create-course"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors rounded-md shadow bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Create Your First Course
                </Link>
            </div>
        </div>
    )
}
