"use client"
import { useState } from "react"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
export default function LogoutUser() {
    const [isOpen, setIsOpen] = useState(false)
    const handleLogout = () => {
        signOut({
            callbackUrl: "/",
            redirect: true,
        })
    }
    function toggleVisibility(e: React.MouseEvent) {
        e.preventDefault()
        if (e.target === e.currentTarget) setIsOpen((prev) => !prev)
    }

    return (
        <>
            <button
                onClick={toggleVisibility}
                className="py-3 px-4 rounded-md bg-gray-800 cursor-pointer text-xs text-white inline-flex gap-2 ml-auto">
                <LogOut className="w-4 h-4 " /> Logout
            </button>
            <section
                onClick={toggleVisibility}
                className={`${
                    !isOpen ? "hidden" : ""
                } w-full h-[100dvh]  fixed top-0 left-0 z-50 bg-gray-300/30 flex justify-center items-center`}>
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className="w-120 p-4 md:p-8 mx-4 bg-white rounded-xl text-gray-700">
                    <p className="text-lg md:text-xl font-bold mb-4">Log Out?</p>
                    <p>Are you sure you want to log out?</p>
                    <div className="mt-8 flex gap-4 justify-end">
                        <button
                            onClick={() => {
                                setIsOpen(false)
                            }}
                            className="py-3 px-6 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ease-in-out  hover:cursor-pointer">
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            className="py-3 px-6 text-sm rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-300 ease-in-out hover:cursor-pointer">
                            Logout
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
