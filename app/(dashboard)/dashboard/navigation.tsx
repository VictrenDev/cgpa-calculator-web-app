"use client"
import { ChevronDown, Settings } from "lucide-react"
import LogoutUser from "./logoutScreen"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function NavigationData() {
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef<HTMLDivElement | null>(null)

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])
    return (
        <section className="sticky top-0 mb-4 w-full bg-[var(--background-bg)] z-50">
            <div ref={modalRef} className="container-fluid py-4 flex justify-end items-center ">
                <div ref={modalRef} className="relative">
                    <button
                        onClick={() => {
                            setIsOpen((prev) => !prev)
                        }}
                        className="flex gap-2 items-center py-2 px-4 bg-white rounded-sm shadow-xs cursor-pointer">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 font-medium rounded-full text-sm">
                            VO
                        </div>
                        <div className="text-xs text-left">
                            <p className="font-semibold text-gray-700">Victor Odoi</p>
                            <p className="text-gray-500">Electronic Engineering</p>
                        </div>
                        <ChevronDown
                            className={`ml-2 w-4 h-4 text-gray-500 transition-transform ${
                                isOpen ? "rotate-180" : ""
                            } `}
                        />
                    </button>

                    {/* Enhanced Dropdown Content */}
                    <div
                        className={`absolute top-full right-0 mt-2 w-100 bg-white rounded-md shadow-lg border border-gray-100   ${
                            isOpen ? "visible opacity-100" : "invisible opacity-0"
                        } transition-all duration-200 z-50`}>
                        {/* User Profile Section */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-medium flex items-center justify-center">
                                    VO
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 ">Victor Odoi</p>
                                    <p className="text-xs text-gray-500">victor@email.com</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[0.65rem] bg-green-100 text-green-800">
                                        First Class
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Academic Dashboard Section */}
                        <div className="p-2 border-b border-gray-100">
                            <div className="px-3 py-2 text-sm">
                                {/* <p className="text-gray-700 font-medium mb-2">Academic Dashboard</p> */}

                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span>CGPA:</span>
                                        <span className="font-medium text-green-600">3.72/4.0</span>
                                    </div>

                                    <div className="mt-1">
                                        <div className="flex justify-between">
                                            <span>Credits:</span>
                                            <span>72/128 (56%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-1 mt-1 rounded-full">
                                            <div
                                                className="bg-blue-500 h-1 rounded-full"
                                                style={{ width: "56%" }}></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>University:</span>
                                        <span>KNUST</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Current Semester:</span>
                                        <span>2023/2024 - 2nd</span>
                                    </div>
                                </div>

                                {/* <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                                    <p className="font-medium text-blue-800">Progress Tip:</p>
                                    <p className="text-blue-700">
                                        Need 3.8 in next 16 credits to reach 3.8 CGPA
                                    </p>
                                </div> */}
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="p-2">
                            <Link
                                href="account-setting"
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors justify-center">
                                <Settings className="w-4 h-4" />
                                Account Settings
                            </Link>
                            <Link
                                href="academic-report"
                                className="block w-full text-center px-3 py-2 mb-1 text-xs text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                View full academic report →
                            </Link>
                            <LogoutUser />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
