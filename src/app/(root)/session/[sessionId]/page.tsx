import ResultsTable from "@/components/resultTable"
import { calculateGPA, calculateGradePoint } from "@/utils/utilities"
import { notFound } from "next/navigation"
import { getUserCourse } from "@/utils/serverActions"
import { getUserSessions } from "@/utils/serverActions"
import { TableRowProps } from "@/components/tableRow"

export default async function Session({ params }: { params: Promise<{ sessionId: string }> }) {
    const { sessionId } = await params

    const sessionData = await getUserCourse(sessionId)
    // check if the session exists before querying in url
    const allSessionData = await getUserSessions()
    const ses = allSessionData.find((s) => {
        return s.name === sessionId
    })
    if (!ses) {
        return notFound()
    }
    if (!sessionData || sessionData.length === 0) {
        return <p>No session data found.</p>
    }

    // For simplicity, use first session object
    const currentSession = sessionData[0]

    // Find first and second semesters
    const firstSemester = currentSession.semester.find((s) =>
        s.name.toLowerCase().includes("first")
    )

    const secondSemester = currentSession.semester.find((s) =>
        s.name.toLowerCase().includes("second")
    )

    const mapCourses = (courses: any[]): TableRowProps[] =>
        courses.map((course) => ({
            courseName: course.courseTitle,
            courseCode: course.courseCode,
            courseLoad: course.courseLoad,
            grade: course.grade.toLowerCase(),
            calculated: calculateGradePoint(course.grade, course.courseLoad),
        }))

    const firstSemesterCourses = firstSemester ? mapCourses(firstSemester.courses) : []
    const secondSemesterCourses = secondSemester ? mapCourses(secondSemester.courses) : []

    const firstSemesterGPA = calculateGPA(firstSemesterCourses)
    const secondSemesterGPA = calculateGPA(secondSemesterCourses)
    const sessionCGPA = calculateGPA([...firstSemesterCourses, ...secondSemesterCourses])

    return (
        <section className="relative p-4 space-y-6">
            <p>
                Session CGPA: <strong>{sessionCGPA.toFixed(2)}</strong>
            </p>
            {firstSemesterCourses.length > 0 && (
                <ResultsTable
                    level={2}
                    gpa={firstSemesterGPA}
                    title="First"
                    courses={firstSemesterCourses}
                />
            )}
            {secondSemesterCourses.length > 0 && (
                <ResultsTable
                    level={2}
                    gpa={secondSemesterGPA}
                    title="Second"
                    courses={secondSemesterCourses}
                />
            )}
        </section>
    )
}
