// types/next-auth.d.ts
import "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            firstName: string | null
            lastName: string | null
        } & DefaultSession["user"]
    }
    interface User {
        id: string
        email: string
        firstName: string | null
        lastName: string | null
    }

    interface User {
        id: string
        firstName?: string
        lastName?: string
    }

    interface JWT {
        id: string
        firstName?: string
        lastName?: string
    }
}
