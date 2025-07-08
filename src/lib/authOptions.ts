import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import type { NextAuthOptions } from "next-auth"
interface CreateUserData {
    email: string
    image?: string
    firstName?: string
    lastName?: string
    name?: string
}
export const authOptions: NextAuthOptions = {
    adapter: {
        ...PrismaAdapter(prisma),
        async createUser(data: CreateUserData) {
            const firstName = data.firstName || data.name?.split(" ")[0] || ""
            const lastName = data.lastName || data.name?.split(" ").slice(1).join(" ") || ""

            return prisma.user.create({
                data: {
                    email: data.email,
                    image: data.image,
                    firstName,
                    lastName,
                    verified: true,
                },
            })
        },
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {}
                if (!email || !password) return null

                const user = await prisma.user.findUnique({ where: { email } })
                if (!user || !user.password) return null

                const isValid = await bcrypt.compare(password, user.password)
                if (!isValid) return null

                return {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    email: profile.email,
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                    image: profile.picture,
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.firstName = user.firstName
                token.lastName = user.lastName
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = session.user || {}
                session.user.id = token.id as string
                session.user.email = token.email as string
                session.user.firstName = token.firstName as string
                session.user.lastName = token.lastName as string
            }
            return session
        },
        async signIn({ user }) {
            const dbUser = await prisma.user.findUnique({
                where: { email: user.email! },
            })

            return dbUser?.verified ?? true
        },
        async redirect({ baseUrl }) {
            // Use Vercel's URL if available
            const deployedUrl = process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : baseUrl
            return `${deployedUrl}/dashboard`
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}
