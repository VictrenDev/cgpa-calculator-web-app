"use client"
import { useSession, signOut } from "next-auth/react"

export default function LogoutButton() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p> // or a spinner/loading UI
    }

    if (!session) {
        return <p>You are not logged in</p>
    }

    return (
        <div>
            <p>{session.user?.name || session.user?.email}</p>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-logout">
                Logout
            </button>
        </div>
    )
}
