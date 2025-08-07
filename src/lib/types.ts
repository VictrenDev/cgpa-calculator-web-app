export type AcademicProfileInput = {
    universityName: string
    facultyName: string
    departmentName: string
    startYear: number
    courseDuration: number // in years
    gradePointSystem: number // e.g., 5 or 4
}

export type CreateCourse = {
    session: string
    semester: string
    courseTitle: string
    courseCode: string
    courseLoad: number
    grade: string
}

export type AccountData = {
    startYear: number
    universityName: string
    facultyName: string
    departmentName: string
    courseDuration: number
    gradePointSystem: number
}
