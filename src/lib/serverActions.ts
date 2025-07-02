"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

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

export async function getUserSessions() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        throw new Error("Not authenticated")
    }

    const email = session.user.email
    const user = await prisma.user.findUnique({
        where: { email: email },
        include: {
            sessions: {
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
    })
    const sessionsWithLevels = user?.sessions.map((session, index) => {
        const level = (index + 1) * 100
        return { ...session, level }
    })
    if (!user) throw new Error("User not found")

    return { sessions: sessionsWithLevels, totalSessions: user.sessions.length, email: email }
}
