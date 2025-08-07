"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { gradePointMap } from "./utilities"
import { revalidatePath } from "next/cache"
import { AcademicProfileInput, CreateCourse } from "./types"

export async function createUser(formData: FormData) {
    try {
        const firstName = formData.get("firstName") as string
        const lastName = formData.get("lastName") as string
        const email = formData.get("email") as string
        const userPassword = formData.get("password") as string

        if (!firstName || !lastName || !userPassword || !email) {
            console.log("error")
        }
        const encryptedUserPassword = await bcrypt.hash(userPassword, 10)
        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (userExists) {
            return console.log("user already exists")
        }
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                password: encryptedUserPassword,
                email,
                verified: true,
            },
        })
        console.log(newUser)
    } catch (error) {
        console.log(error)
    }
}

export async function createCourse(formData: FormData) {
    const session = await getServerSession(authOptions)

    const UserSession = formData.get("session") as string
    const courseTitle = formData.get("courseTitle") as string
    const courseCode = formData.get("courseCode") as string
    const grade = formData.get("grade") as string
    const courseLoad = Number(formData.get("courseLoad"))
    const UserSemester = formData.get("semester") as string

    if (!UserSession || !UserSession || !courseCode || !courseTitle || !courseLoad || !grade) {
        return console.log("one or more of the fields was left empty")
    }
    if (!session?.user?.email) {
        throw new Error("Not authenticated")
    }

    const email = session.user.email
    try {
        const user = await prisma.user.findUnique({ where: { email: email } })
        if (!user) throw new Error("User not found")

        const session = await prisma.academicSession.upsert({
            where: {
                userId_name: {
                    userId: user.id,
                    name: UserSession,
                },
            },
            update: {},
            create: {
                name: UserSession,
                userId: user.id,
            },
        })

        const semester = await prisma.semester.upsert({
            where: {
                sessionId_name: {
                    sessionId: session.id,
                    name: UserSemester,
                },
            },
            update: {},
            create: {
                name: UserSemester,
                sessionId: session.id,
            },
        })

        await prisma.course.create({
            data: {
                courseTitle,
                courseCode,
                grade,
                courseLoad,
                semesterId: semester.id,
            },
        })
        console.log(createCourse)
        revalidatePath("/dashboard")
    } catch (error) {
        console.log(error)
    }
}

export async function loginUser(formdata: FormData) {
    const email = formdata.get("email") as string
    const password = formdata.get("password") as string

    if (!email || !password) {
        return console.log("Email and password are required")
    }

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user || !user.password) {
        return console.log("User not found")
    }
    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
        console.log("invalid password")
    }
    console.log("found user")
    return user
}

export async function getUserCourse(sessionId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        throw new Error("Not authenticated")
    }

    const email = session.user.email
    const user = await prisma.user.findUnique({
        where: { email: email },
        include: {
            sessions: {
                where: {
                    name: sessionId,
                },
                include: {
                    semester: {
                        include: {
                            courses: true,
                        },
                    },
                },
            },
        },
    })

    if (!user) throw new Error("User not found")

    return user.sessions
}

export async function deleteCourse(courseId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Not authenticated")

    await prisma.course.delete({
        where: { id: courseId },
    })

    revalidatePath("/dashboard")
}

export async function editCourse(courseId: string, formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Not authenticated")

    const courseTitle = formData.get("courseTitle") as string
    const courseCode = formData.get("courseCode") as string
    const grade = formData.get("grade") as string
    const courseLoad = Number(formData.get("courseLoad"))

    if (!courseTitle || !courseCode || !grade || !courseLoad) {
        throw new Error("All fields are required")
    }

    await prisma.course.update({
        where: { id: courseId },
        data: {
            courseTitle,
            courseCode,
            grade,
            courseLoad,
        },
    })
}
export async function getCourseWithDetails(courseId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Not authenticated")

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            semester: {
                include: {
                    session: true, // get session info too
                },
            },
        },
    })

    if (!course) throw new Error("Course not found")

    return {
        courseId: course.id,
        courseTitle: course.courseTitle,
        courseCode: course.courseCode,
        grade: course.grade,
        courseLoad: course.courseLoad,
        semester: course.semester.name,
        session: course.semester.session.name,
    }
}

export async function getUserSessions() {
    // 🔐 1. Authenticate the user
    const authSession = await getServerSession(authOptions)

    if (!authSession?.user?.email) {
        throw new Error("Not authenticated")
    }

    const email = authSession.user.email

    // 🗄️ 2. Fetch user with sessions → semesters → courses
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            sessions: {
                include: {
                    semester: {
                        include: { courses: true },
                    },
                },
                orderBy: { createdAt: "asc" }, // oldest session first
            },
        },
    })

    if (!user) throw new Error("User not found")

    // 📊 3. Add GPA to each semester and session
    const sessionsWithStats = user.sessions.map((session, index) => {
        let sessionQualityPoints = 0
        let sessionCredits = 0

        // Loop through semesters in this session
        const semestersWithGPA = session.semester.map((sem) => {
            let semesterQualityPoints = 0
            let semesterCredits = 0

            // Loop through courses in this semester
            sem.courses.forEach((course) => {
                const points = gradePointMap[course.grade.toUpperCase()] ?? 0
                semesterQualityPoints += points * course.courseLoad
                semesterCredits += course.courseLoad
            })

            // 🎯 GPA = total points ÷ total credits for this semester
            const semesterGPA = semesterCredits > 0 ? semesterQualityPoints / semesterCredits : 0

            // Add semester totals to session totals
            sessionQualityPoints += semesterQualityPoints
            sessionCredits += semesterCredits

            // Return the semester with GPA included
            return {
                ...sem,
                gpa: semesterGPA,
            }
        })

        // 🎯 Calculate GPA for the entire session
        const sessionGPA = sessionCredits > 0 ? sessionQualityPoints / sessionCredits : 0

        return {
            ...session,
            level: (index + 1) * 100, // 100, 200, 300 level, etc.
            semesters: semestersWithGPA, // now includes GPA per semester
            gpa: sessionGPA,
            cgpa: sessionGPA, // currently same as GPA (can be cumulative)
        }
    })

    // 📈 4. Calculate overall CGPA across all sessions
    const overallQualityPoints = sessionsWithStats.reduce((sum, s) => {
        return (
            sum +
            s.semesters
                .flatMap((sem) => sem.courses)
                .reduce(
                    (csum, c) => csum + (gradePointMap[c.grade.toUpperCase()] ?? 0) * c.courseLoad,
                    0
                )
        )
    }, 0)

    const overallCredits = sessionsWithStats.reduce((sum, s) => {
        return (
            sum +
            s.semesters.flatMap((sem) => sem.courses).reduce((csum, c) => csum + c.courseLoad, 0)
        )
    }, 0)

    const overallCGPA = overallCredits > 0 ? overallQualityPoints / overallCredits : 0

    // 📦 5. Return data for the dashboard
    return {
        sessions: sessionsWithStats,
        totalSessions: user.sessions.length,
        email,
        overallCGPA,
    }
}

// Add this to your actions file
export async function hasAnyCourses() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        throw new Error("Not authenticated")
    }

    const email = session.user.email

    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            sessions: {
                include: {
                    semester: {
                        include: {
                            courses: {
                                take: 1, // Just check if at least one exists
                            },
                        },
                    },
                },
            },
        },
    })

    if (!user) throw new Error("User not found")

    return user.sessions.some((s) => s.semester.some((sem) => sem.courses.length > 0))
}

export async function createMultipleCourses(courses: CreateCourse[]) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Not authenticated")

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })

    if (!user) throw new Error("User not found")

    const courseData: {
        courseTitle: string
        courseCode: string
        courseLoad: number
        grade: string
        semesterId: string
    }[] = []

    const semesterCache = new Map<string, string>() // Cache: "session-semester" → semesterId

    for (const course of courses) {
        const key = `${course.session}-${course.semester}`
        let semesterId = semesterCache.get(key)

        if (!semesterId) {
            // 1. Upsert AcademicSession
            const sessionRecord = await prisma.academicSession.upsert({
                where: {
                    userId_name: {
                        userId: user.id,
                        name: course.session,
                    },
                },
                update: {},
                create: {
                    userId: user.id,
                    name: course.session,
                },
            })

            // 2. Upsert Semester
            const semesterRecord = await prisma.semester.upsert({
                where: {
                    sessionId_name: {
                        sessionId: sessionRecord.id,
                        name: course.semester,
                    },
                },
                update: {},
                create: {
                    name: course.semester,
                    sessionId: sessionRecord.id,
                },
            })

            semesterId = semesterRecord.id
            semesterCache.set(key, semesterId)
        }

        // 3. Prepare course data
        courseData.push({
            courseTitle: course.courseTitle,
            courseCode: course.courseCode,
            courseLoad: Number(course.courseLoad),
            grade: course.grade,
            semesterId,
        })
    }

    // 4. Create courses
    await prisma.course.createMany({
        data: courseData,
        skipDuplicates: true,
    })

    revalidatePath("/dashboard") // Optional
}

export async function createAcademicProfile(input: AcademicProfileInput) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        throw new Error("You must be logged in.")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })

    if (!user) throw new Error("User not found.")

    // Convert string inputs to number types here:
    const startYearNum = Number(input.startYear)
    const courseDurationNum = Number(input.courseDuration)
    const gradePointSystemNum = Number(input.gradePointSystem)

    if (isNaN(startYearNum) || isNaN(courseDurationNum) || isNaN(gradePointSystemNum)) {
        throw new Error("Invalid numeric values provided")
    }

    const existing = await prisma.academicProfile.findUnique({
        where: { userId: user.id },
    })

    if (existing) {
        await prisma.academicProfile.update({
            where: { userId: user.id },
            data: {
                ...input,
                startYear: startYearNum,
                courseDuration: courseDurationNum,
                gradePointSystem: gradePointSystemNum,
            },
        })
    } else {
        await prisma.academicProfile.create({
            data: {
                ...input,
                startYear: startYearNum,
                courseDuration: courseDurationNum,
                gradePointSystem: gradePointSystemNum,
                userId: user.id,
            },
        })
    }

    revalidatePath("/dashboard")
}

export async function getAcademicProfileData(userId: string) {
    const session = await getServerSession(authOptions)

    if (!session) throw new Error("No session found")
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!user) throw new Error("No user found")

    const academicProfileData = await prisma.academicProfile.findUnique({
        where: {
            userId,
        },
    })
    return academicProfileData
}
