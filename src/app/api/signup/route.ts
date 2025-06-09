import { NextResponse } from "next/server"
import { prisma } from "@/utils/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, password } = await req.json()

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json({
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
        })
    } catch (error) {
        console.error("Signup Error:", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}
