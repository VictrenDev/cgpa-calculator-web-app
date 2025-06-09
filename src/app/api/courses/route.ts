// // src/app/api/courses/route.ts
// import { NextRequest, NextResponse } from "next/server"

// export async function POST(req: NextRequest) {
//     try {
//         const data = await req.json()
//         console.log("Received data:", data)

//         return NextResponse.json({ message: "Course received successfully", data }, { status: 200 })
//     } catch (error) {
//         console.error("API error:", error)
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//     }
// }

// src/app/api/courses/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/prisma"

export async function POST(req: NextRequest) {
    const body = await req.json()

    const { session, semester, courseTitle, courseCode, courseLoad, grade, userEmail } = body

    try {
        // Example logic to find or create session/semester, then create course
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        })

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

        // Create or find session
        const sessionRecord = await prisma.session.upsert({
            where: {
                userId_name: {
                    userId: user.id,
                    name: session,
                },
            },
            update: {},
            create: {
                userId: user.id,
                name: session,
            },
        })

        // Create or find semester
        const semesterRecord = await prisma.semester.upsert({
            where: {
                sessionId_name: {
                    sessionId: sessionRecord.id,
                    name: semester,
                },
            },
            update: {},
            create: {
                sessionId: sessionRecord.id,
                name: semester,
            },
        })

        const course = await prisma.course.create({
            data: {
                courseTitle,
                courseCode,
                courseLoad: parseInt(courseLoad),
                grade,
                semesterId: semesterRecord.id,
            },
        })

        return NextResponse.json(course, { status: 201 })
    } catch (err) {
        console.error("Error creating course:", err)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
