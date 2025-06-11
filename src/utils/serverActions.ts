"use server"

import { prisma } from "@/utils/prisma"
import bcrypt from "bcryptjs"

export async function createUser(formData: FormData) {
    try {
        const firstName = formData.get("firstName") as string
        const lastName = formData.get("lastName") as string
        const email = formData.get("email") as string
        const userPassword = formData.get("password") as string

        const encryptedUserPassword = await bcrypt.hash(userPassword, 10)

        if (!firstName || !lastName || !userPassword || !email) {
            console.log("error")
        }
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
            },
        })
        console.log(newUser)
    } catch (error) {
        console.log(error)
    }
}

export async function createCourse(formData: FormData) {
    const UserSession = formData.get("session") as string
    const courseTitle = formData.get("courseTitle") as string
    const courseCode = formData.get("courseCode") as string
    const grade = formData.get("grade") as string
    const courseLoad = Number(formData.get("courseLoad"))
    const UserSemester = formData.get("semester") as string

    if (!UserSession || !UserSession || !courseCode || !courseTitle || !courseLoad || !grade) {
        return console.log("one or more of the fields was left empty")
    }
    try {
        const user = await prisma.user.findUnique({ where: { email: "vic@gmail.com" } })
        if (!user) throw new Error("User not found")

        const session = await prisma.session.upsert({
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

    if (!user) {
        return console.log("User not found")
    }

    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
        console.log("invalid password")
    }
    console.log("found user")
}

export async function getUserCourse(sessionId: string) {
    const user = await prisma.user.findUnique({
        where: { email: "vic@gmail.com" },
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
    const user = await prisma.user.findUnique({
        where: { email: "vic@gmail.com" },
        include: {
            sessions: {
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
