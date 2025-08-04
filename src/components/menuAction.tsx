"use client"
import { deleteAction } from "@/lib/serverActions"
import { useState, useRef, useEffect } from "react"
import { MoreVertical, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MenuActions({ courseId }: { courseId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

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

    const handleDelete = async () => {
        await deleteAction(courseId)
        setIsOpen(false)
        console.log(courseId)
        router.refresh()
    }
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
                        onClick={handleDelete}>
                        <Trash2 className="w-4 h-4" />
                        <span className="text-xs md:text-sm text-nowrap">Delete Course</span>
                    </button>
                </div>
            )}
        </div>
    )
}
