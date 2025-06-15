"use server"
import { prisma } from "@/utils/prisma"

export default async function createCourse(formData: FormData) {
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
        const user = await prisma.user.findUnique({ where: { email: "vic@gmail.com" } }) //gets the user by unique identity (email)
        if (!user) throw new Error("User not found")

        const session = await prisma.session.upsert({
            where: {
                //uses that user id to create a relationship between the session and the user if the session exists
                userId_name: {
                    userId: user.id, //foreign relationship
                    name: UserSession, //name of the session
                },
            },
            update: {},
            // create the user id and name if it does not exist yet
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
