"use server"
import { prisma } from "@/utils/prisma"
import bcrypt from "bcryptjs"

export default async function createUser(formData: FormData) {
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
