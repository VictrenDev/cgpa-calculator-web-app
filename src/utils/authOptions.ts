import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/utils/prisma"
import bcrypt from "bcryptjs"
import type { NextAuthOptions } from "next-auth"

const baseAdapter = PrismaAdapter(prisma)

const customAdapter = {
    ...baseAdapter,
    async createUser(data) {
        let firstName = ""
        let lastName = ""

        if (data.name) {
            const parts = data.name.trim().split(" ")
            firstName = parts[0]
            lastName = parts.length > 1 ? parts.slice(1).join(" ") : ""
        }

        const userData = {
            ...data,
            firstName,
            lastName,
            password: data.password ?? "", // provide default
        }

        delete userData.name // 'name' isn't in your schema

        return prisma.user.create({ data: userData })
    },
}

export const authOptions: NextAuthOptions = {
    adapter: customAdapter,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {}

                const user = await prisma.user.findUnique({ where: { email } })
                if (!user || !user.password) return null

                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) return null

                return user
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "database",
    },
    callbacks: {
        async signIn({ user, account }) {
            const dbUser = await prisma.user.findUnique({
                where: { email: user.email! },
            })

            // Only block login if unverified
            if (dbUser && !dbUser.verified) {
                return false // blocked
            }

            return true
        },

        async redirect({ url, baseUrl }) {
            // Redirect to dashboard after login/signup
            return `${baseUrl}/dashboard`
        },

        async session({ session, user }) {
            session.user.id = user.id
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { prisma } from "@/utils/prisma"
// import bcrypt from "bcryptjs"
// import type { NextAuthOptions } from "next-auth"

// const baseAdapter = PrismaAdapter(prisma)

// const customAdapter = {
//     ...baseAdapter,
//     async createUser(data: any) {
//         let firstName = ""
//         let lastName = ""

//         if (data.name) {
//             const parts = data.name.trim().split(" ")
//             firstName = parts[0]
//             lastName = parts.length > 1 ? parts.slice(1).join(" ") : ""
//         }

//         // 🔥 remove unsupported fields FIRST
//         const { name, image, ...cleaned } = data

//         const userData = {
//             ...cleaned,
//             firstName,
//             lastName,
//             password: cleaned.password ?? "",
//         }

//         return prisma.user.create({ data: userData })
//     },
// }

// export const authOptions: NextAuthOptions = {
//     adapter: customAdapter,
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 const { email, password } = credentials ?? {}

//                 const user = await prisma.user.findUnique({ where: { email } })
//                 if (!user || !user.password) return null

//                 const isValid = await bcrypt.compare(password, user.password)
//                 return isValid ? user : null
//             },
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//     ],
//     session: {
//         strategy: "database",
//     },
//     callbacks: {
//         async signIn({ user, account }) {
//             if (account?.provider === "credentials") {
//                 const dbUser = await prisma.user.findUnique({ where: { email: user.email! } })
//                 if (!dbUser || !dbUser.verified) return false
//             }
//             return true
//         },
//         async session({ session, user }) {
//             session.user.id = user.id
//             return session
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// }

// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { prisma } from "@/utils/prisma"
// import bcrypt from "bcryptjs"
// import type { NextAuthOptions } from "next-auth"

// export const authOptions: NextAuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 const { email, password } = credentials ?? {}

//                 const user = await prisma.user.findUnique({
//                     where: { email },
//                 })

//                 if (!user || !user.password) return null

//                 const isValid = await bcrypt.compare(password, user.password)
//                 if (!isValid) return null

//                 return user
//             },
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//     ],
//     session: {
//         strategy: "database",
//     },
//     callbacks: {
//         async signIn({ user, account }) {
//             if (account?.provider === "credentials") {
//                 const dbUser = await prisma.user.findUnique({
//                     where: { email: user.email! },
//                 })

//                 if (!dbUser || !dbUser.verified) {
//                     return false
//                 }
//             }

//             return true
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// }
