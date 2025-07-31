"use client"
import { useState, useRef, useEffect } from "react"
import { MoreVertical, Edit, Trash2 } from "lucide-react"

export default function MenuActions({ remove, edit }: { remove: string; edit: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent immediate closing
        setIsOpen((prev) => !prev)
    }

    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={toggleMenu}
                className="p-3 rounded-full border border-gray-200 hover:cursor-pointer">
                <MoreVertical className="w-3 h-3" />
            </button>
            {isOpen && (
                <div className="rounded-md absolute md:top-6 top-10 md:left-24 -left-10 bg-gray-50 z-50 overflow-hidden">
                    <button
                        className="w-full p-4 hover:bg-gray-100 hover:cursor-pointer flex gap-2 items-center"
                        onClick={() => setIsOpen(false)}>
                        <Edit className="w-4 h-4" />
                        <span className="text-xs md:text-sm text-nowrap">Edit Course</span>
                    </button>
                    <button
                        className="w-full p-4 hover:bg-gray-100 hover:cursor-pointer flex gap-2 items-center"
                        onClick={() => setIsOpen(false)}>
                        <Trash2 className="w-4 h-4" />
                        <span className="text-xs md:text-sm text-nowrap">Delete Course</span>
                    </button>
                </div>
            )}
        </div>
    )
}
