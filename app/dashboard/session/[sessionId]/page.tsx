import { getUserSessions, getUserCourse } from "@/lib/serverActions";
import { notFound } from "next/navigation";
import ResultsTable from "@/components/resultTable";
import { calculateGPA, calculateGradePoint } from "@/lib/utilities";
import CreateCourseModal from "@/components/createCourseForm";
type RawCourse = {
    id: string;
    createdAt: Date;
    courseTitle: string;
    courseCode: string;
    courseLoad: number;
    grade: string;
    semesterId: string;
};
export default async function SessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
    // 1. Fetch all sessions with levels
    const { sessionId } = await params;
    const { sessions, totalSessions } = await getUserSessions();
    if (!sessions) return notFound();

    // 2. Find the current session
    const currentSession = sessions.find((s) => s.name === sessionId);
    if (!currentSession) return notFound();

    // 3. Get detailed course data for this session
    const sessionData = await getUserCourse(sessionId);
    if (!sessionData || !totalSessions) return <p>No courses found for this session</p>;

    // 4. Process semester data
    const firstSemester = sessionData[0].semester.find((s) => s.name.toLowerCase().includes("first"));
    const secondSemester = sessionData[0].semester.find((s) => s.name.toLowerCase().includes("second"));

    // 5. Map courses to table format
    const mapCourses = (courses: RawCourse[]) =>
        courses.map((course) => ({
            courseId: course.id,
            courseTitle: course.courseTitle,
            courseCode: course.courseCode,
            courseLoad: course.courseLoad,
            grade: course.grade.toLowerCase() as "a" | "b" | "c" | "d" | "e" | "f",
            calculated: calculateGradePoint(course.grade, course.courseLoad),
        }));

    const firstSemesterCourses = firstSemester ? mapCourses(firstSemester.courses) : [];
    const secondSemesterCourses = secondSemester ? mapCourses(secondSemester.courses) : [];

    // 6. Calculate GPAs
    const firstSemesterGPA = calculateGPA(firstSemesterCourses);
    const secondSemesterGPA = calculateGPA(secondSemesterCourses);
    const sessionCGPA = calculateGPA([...firstSemesterCourses, ...secondSemesterCourses]);

    return (
        <main className="container-fluid">
            {/* Session Header */}
            <div className="flex justify-end items-center pb-4">
                {/* <h1 className="text-2xl font-bold">
                    {currentSession.name} - {currentSession.level}L -{email}
                </h1> */}
                <p className="bg-blue-100 px-4 py-2 rounded text-blue-500">
                    {currentSession.level} Level GPA: <span className="font-semibold ">{sessionCGPA.toFixed(2)}</span>
                </p>
            </div>

            <div className="grid gap-20 mt-8">
                {/* First Semester Table */}
                {firstSemesterCourses.length > 0 && (
                    <ResultsTable level={currentSession.level} gpa={firstSemesterGPA} title="First Semester" courses={firstSemesterCourses} />
                )}

                {/* Second Semester Table */}
                {secondSemesterCourses.length > 0 && (
                    <ResultsTable level={currentSession.level} gpa={secondSemesterGPA} title="Second Semester" courses={secondSemesterCourses} />
                )}
            </div>
            <CreateCourseModal />
        </main>
    );
}
