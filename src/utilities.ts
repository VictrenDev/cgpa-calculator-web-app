export const gradePointMap: Record<string, number> = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
}
export function calculateGradePoint(grade: string, load: number): number {
    return load * (gradePointMap[grade.toUpperCase()] ?? 0)
}
//
export function calculateGPA(courses: { courseLoad: number; grade: string }[]): number {
    const { totalPoints, totalLoad } = courses.reduce(
        (acc, course) => {
            const points = calculateGradePoint(course.grade, course.courseLoad)
            acc.totalPoints += points
            acc.totalLoad += course.courseLoad
            return acc
        },
        { totalPoints: 0, totalLoad: 0 }
    )

    return totalLoad === 0 ? 0 : parseFloat((totalPoints / totalLoad).toFixed(2))
}
