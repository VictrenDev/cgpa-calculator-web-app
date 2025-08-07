"use client"
import { deleteCourse } from "@/lib/serverActions"
import { useState, useRef, useEffect } from "react"
import { MoreVertical, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { TableRowProps } from "./tableRow"
import EditCourseModal from "@/components/editCourse"

export default function MenuActions({ course }: { course: TableRowProps }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

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
        await deleteCourse(course.courseId)
        setIsOpen(false)
        router.refresh()
    }

    return (
        <div ref={menuRef} className="relative inline-block">
            <button
                onClick={(e) => {
                    e.stopPropagation() // ✅ stops bubbling to outside click handler
                    setIsOpen((prev) => !prev)
                }}
                className="p-3 rounded-full border border-gray-200 hover:cursor-pointer">
                <MoreVertical className="w-3 h-3" />
            </button>

            {isOpen && (
                <div
                    className="dropdown-menu bg-gray-50 absolute right-0 mt-2 z-50 overflow-hidden rounded-md shadow"
                    onClick={(e) => e.stopPropagation()} // ✅ stop closing when clicking inside
                >
                    <button
                        className="px-4 py-6 cursor-pointer flex gap-2 items-center w-full border-b border-b-gray-200 bg-blue-50"
                        onClick={() => {
                            setIsEditing(true)
                            setIsOpen(false)
                        }}>
                        <Edit className="w-4 h-4 text-blue-500" />
                        <span className="text-xs md:text-sm text-blue-500">Edit Course</span>
                    </button>
                    <button
                        className="px-4 py-6 cursor-pointer flex gap-2 items-center bg-red-50 w-fit text"
                        onClick={handleDelete}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                        <span className="text-xs block md:text-sm text-red-500">Delete Course</span>
                    </button>
                </div>
            )}

            {isEditing && (
                <EditCourseModal
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                    courseId={course.courseId}
                />
            )}
        </div>
    )
}
