"use client"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { createUser } from "@/utils/serverActions"
import { signIn } from "next-auth/react"

export default function Signup() {
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    return (
        <section className="w-full h-screen fixed top-0 bg-gray-300/30 flex justify-center items-center">
            <div className="w-120 p-4 pt-4 mx-4 bg-white rounded-xl text-gray-700 container">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
                    Create an Account
                </h1>
                <p className="text-sm text-gray-600 mb-6">
                    Already have an account?
                    <u className="inline-block ml-2">
                        <Link href="/login">Login</Link>
                    </u>
                </p>
                <form action={createUser} className="text-sm md:text-base">
                    <div className="flex justify-center gap-4">
                        <input
                            ref={firstNameRef}
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            className="input-default-style"
                        />
                        <input
                            ref={lastNameRef}
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            className="input-default-style"
                        />
                    </div>
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="input-default-style"
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input-default-style"
                    />
                    <button
                        type="submit"
                        className="border border-gray-300 rounded-md w-full p-2 flex items-center justify-center gap-2 transition-colors duration-800 ease-in-out mt-8 mb-4">
                        Create Account
                    </button>
                    <div className="flex justify-between gap-6 my-4 mt-2 items-center">
                        <div className="w-full h-[1px] bg-gray-300"></div>
                        <p className="text-gray-300 text-xs whitespace-nowrap w-fit">
                            Or register with
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
