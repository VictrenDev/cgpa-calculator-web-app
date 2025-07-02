"use client"
import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        if (!email || !password) {
            setError("Email and password are required")
            return
        }

        const result = await signIn("credentials", {
            redirect: false, // We’ll redirect manually
            email,
            password,
        })

        if (result?.error) {
            setError("Invalid email or password")
        } else {
            router.push("/dashboard")
        }
    }

    return (
        <section className="w-full h-screen fixed top-0 bg-gray-300/30 flex justify-center items-center">
            <div className="w-120 p-4 pt-4 mx-4 bg-white rounded-xl text-gray-700 container">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
                    Login to your Account
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    Don&apos;t have an account?
                    <u className="inline-block ml-2">
                        <Link href="/signup">Signup</Link>
                    </u>
                </p>

                {error && <p className="text-red-600 mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="text-sm md:text-base">
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="input-default-style"
                    />
                    <input
                        ref={passwordRef}
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input-default-style"
                    />
                    <button
                        type="submit"
                        className="border border-gray-300 rounded-md w-full p-2 flex items-center justify-center gap-2 transition-colors duration-800 ease-in-out mt-8 mb-4">
                        Login to CGPA Calculator
                    </button>

                    <div className="flex justify-between gap-6 my-4 mt-2 items-center">
                        <div className="w-full h-[1px] bg-gray-300"></div>
                        <p className="text-gray-300 text-xs whitespace-nowrap w-fit">
                            or login with
                        </p>
                        <div className="w-full h-[1px] bg-gray-300"></div>
                    </div>

                    <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="border border-gray-300 rounded-md w-full p-2 flex items-center justify-center gap-2 transition-colors duration-800 ease-in-out">
                        <Image src="/search.png" alt="Google logo" width={24} height={24} />
                        Google
                    </button>
                </form>
            </div>
        </section>
    )
}
