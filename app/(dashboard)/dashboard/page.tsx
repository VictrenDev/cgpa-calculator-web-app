import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserSessions, hasAnyCourses } from "@/lib/serverActions";
import NoCourses from "./noCoursesPage";
import AcademicProfileForm from "./createAcademicProfile"; // 👈 Your profile form component
import { prisma } from "@/lib/prisma"; // adjust as needed
import CreateCourseModal from "@/components/createCourseForm";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/login");

    // 🔍 Check for academic profile
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { academicProfile: true },
    });
    if (!user) redirect("/login");

    if (!user.academicProfile) {
        // 📄 Render academic profile creation form
        return <AcademicProfileForm />;
    }

    const hasCourses = await hasAnyCourses();
    if (!hasCourses) return <NoCourses />;

    const { sessions, totalSessions, overallCGPA } = await getUserSessions();
    if (!overallCGPA) return null;

    return (
        <>
            <div className="flex justify-end font-medium m-8 px-4 container-fluid">
                <span className="text-blue-500 bg-blue-100 rounded-2xl py-1 px-3 text-sm md:text-base">
                    {totalSessions} {totalSessions === 1 ? "Session" : "Sessions"}
                    {"  "}
                    {overallCGPA.toFixed(2)} CGPA
                </span>
            </div>
            <div className="container-fluid grid space-y-12">
                {sessions.map((item) => {
                    const totalCourses = item.semesters.reduce((sum, semester) => sum + (semester.courses?.length || 0), 0);
                    return (
                        <div key={item.id} className="p-6 rounded-lg shadow-lg">
                            <div className="flex justify-between items-center w-full">
                                <p className="grid">
                                    <span className="font-bold md:text-xl">{item.name}</span>
                                    <span className="text-gray-500">Academic Session</span>
                                </p>
                                <span className="text-blue-500 bg-blue-100 px-3 py-1 text-xs md:text-sm font-medium rounded-2xl">
                                    Level {item.level}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                                <p className="bg-gray-100 flex-1 flex flex-col py-6 rounded-md px-4 ">
                                    <span className="text-gray-500 text-sm">Total Semesters</span>
                                    <span>{item.semester.length}</span>
                                </p>
                                <p className="bg-gray-100 flex-1 flex flex-col py-6 rounded-md px-4 ">
                                    <span className="text-gray-500 text-sm">Total Courses</span>
                                    <span>{totalCourses}</span>
                                </p>
                                <div className="bg-gray-100 flex-1 flex flex-col py-6 rounded-md px-4 ">
                                    <span className="text-gray-500 text-sm ">Session GPA</span>
                                    <div className="flex gap-4 text-xs">
                                        {item.semesters.map((semester) => (
                                            <p className="grid text-gray-500 mt-1" key={semester.id}>
                                                <span className="font-medium text-gray-700">{semester.name}</span>
                                                <span>GPA: {semester.gpa.toFixed(2)}</span>
                                                <span>Courses: {semester.courses.length}</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <p className="bg-gray-100 flex-1 flex flex-col py-6 rounded-md px-4 ">
                                    <span className="text-gray-500 text-sm">Session CGPA</span>
                                    <span>{item.cgpa.toFixed(2)}</span>
                                </p>
                            </div>
                            <Link
                                className="px-6 py-4 bg-blue-700 rounded-md text-white inline-block mt-10 font-medium text-sm"
                                href={`/dashboard/session/${item.name}`}>
                                View Details
                            </Link>
                        </div>
                    );
                })}
            </div>
            <CreateCourseModal />
        </>
    );
}
