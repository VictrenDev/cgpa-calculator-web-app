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
        <div ref={menuRef} className="[anchor-name:--trigger] relative inline-block">
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen((prev) => !prev)
                }}
                className="p-3 rounded-full border border-gray-200 hover:cursor-pointer">
                <MoreVertical className="w-3 h-3" />
            </button>

            {isOpen && (
                <div className="dropdown-menu bg-gray-50 z-50 overflow-hidden rounded-md shadow">
                    <button
                        className="w-full p-4 hover:bg-gray-100 flex gap-2 items-center"
                        onClick={() => {
                            setIsEditing(true)
                            setIsOpen(false)
                        }}>
                        <Edit className="w-4 h-4" />
                        <span className="text-xs md:text-sm">Edit Course</span>
                    </button>
                    <button
                        className="w-full p-4 hover:bg-gray-100 flex gap-2 items-center"
                        onClick={handleDelete}>
                        <Trash2 className="w-4 h-4" />
                        <span className="text-xs md:text-sm">Delete Course</span>
                    </button>
                </div>
            )}

            {isEditing && (
                <EditCourseModal
                    initialIsOpen={true}
                    courseId={course.courseId}
                    session=""
                    semester=""
                    courseTitle={course.courseTitle}
                    courseCode={course.courseCode}
                    grade={course.grade.toUpperCase() as "A" | "B" | "C" | "D" | "E" | "F"}
                    courseLoad={course.courseLoad}
                />
            )}
        </div>
    )
}
