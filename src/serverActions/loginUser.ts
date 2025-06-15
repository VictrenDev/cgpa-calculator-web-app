"use server"
import { prisma } from "@/utils/prisma"
import bcrypt from "bcryptjs"

export default async function loginUser(formdata: FormData) {
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
