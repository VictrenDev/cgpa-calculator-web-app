import ResultsTable from "@/components/resultTable"
import { calculateGPA, calculateGradePoint } from "@/utilities"
import { notFound } from "next/navigation"
import { TableRowProps } from "@/components/tableRow"
import Modal from "@/components/modal"

export default async function Session({ params }: { params: Promise<{ sessionId: number }> }) {
    const { sessionId } = await params
    const level = sessionId * 100

    if (sessionId < 1 || sessionId > 5) {
        notFound()
    }

    const rawCourses: Omit<TableRowProps, "calculated">[] = [
        { id: 1, courseName: "Introduction to Programming", courseCode: "CSC101", courseLoad: 3, grade: "b" },
        { id: 2, courseName: "General Physics I", courseCode: "PHY101", courseLoad: 4, grade: "a" },
        { id: 3, courseName: "Calculus I", courseCode: "MTH101", courseLoad: 3, grade: "c" },
        { id: 4, courseName: "General Chemistry", courseCode: "CHM101", courseLoad: 4, grade: "b" },
        { id: 5, courseName: "Use of English", courseCode: "GST101", courseLoad: 2, grade: "a" },
        { id: 6, courseName: "Linear Algebra", courseCode: "MTH102", courseLoad: 3, grade: "d" },
        { id: 7, courseName: "Introduction to Statistics", courseCode: "STA101", courseLoad: 2, grade: "b" },
        { id: 8, courseName: "Basic Electronics", courseCode: "EEE101", courseLoad: 3, grade: "c" },
        { id: 9, courseName: "Workshop Practice", courseCode: "ENG101", courseLoad: 1, grade: "a" },
        { id: 10, courseName: "Introduction to Engineering", courseCode: "ENG102", courseLoad: 2, grade: "e" },
        { id: 11, courseName: "Engineering Drawing", courseCode: "ENG103", courseLoad: 2, grade: "b" },
        { id: 12, courseName: "Differential Equations", courseCode: "MTH201", courseLoad: 3, grade: "a" },
        { id: 13, courseName: "Computer Hardware", courseCode: "CSC202", courseLoad: 3, grade: "c" },
        { id: 14, courseName: "Electric Circuits", courseCode: "EEE201", courseLoad: 4, grade: "b" },
        { id: 15, courseName: "Electromagnetism", courseCode: "PHY202", courseLoad: 3, grade: "d" },
        { id: 16, courseName: "Technical Communication", courseCode: "GST201", courseLoad: 2, grade: "a" },
        { id: 17, courseName: "Engineering Mathematics", courseCode: "MTH203", courseLoad: 4, grade: "c" },
        { id: 18, courseName: "Digital Logic Design", courseCode: "EEE202", courseLoad: 3, grade: "b" },
        { id: 19, courseName: "Thermodynamics", courseCode: "MEC201", courseLoad: 4, grade: "a" },
        { id: 20, courseName: "Introduction to Databases", courseCode: "CSC203", courseLoad: 3, grade: "f" },
    ]

    const courses: TableRowProps[] = rawCourses.map((course) => ({
        ...course,
        calculated: calculateGradePoint(course.grade, course.courseLoad),
    }))

    const firstSemesterCourses = courses.slice(0, 10)
    const secondSemesterCourses = courses.slice(10, 20)
    const firstSemesterGPA = calculateGPA(firstSemesterCourses)
    const secondSemesterGPA = calculateGPA(secondSemesterCourses)
    const sessionCGPA = calculateGPA([...firstSemesterCourses, ...secondSemesterCourses])

    return (
        <section className="relative">
            <p>
                Session CGPA: <strong>{sessionCGPA}</strong>
            </p>
            <Modal initialIsOpen={false} />
            <ResultsTable level={level} gpa={firstSemesterGPA} title="First" courses={firstSemesterCourses} />
            <ResultsTable level={level} gpa={secondSemesterGPA} title="Second" courses={secondSemesterCourses} />
        </section>
    )
}
