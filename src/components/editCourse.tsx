"use client"

import { editCourse, getCourseWithDetails } from "@/lib/serverActions"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type EditCourseProps = {
    courseId: string
    initialIsOpen?: boolean
}

export default function EditCourseModal({ courseId, initialIsOpen = false }: EditCourseProps) {
    const [isPending, setIsPending] = useState(false)
    const [isOpen, setIsOpen] = useState(initialIsOpen)
    const [formData, setFormData] = useState({
        session: "",
        semester: "",
        courseTitle: "",
        courseCode: "",
        grade: "",
        courseLoad: "",
    })
    //initalize the router object
    const router = useRouter()
    // Load course details when modal opens
    useEffect(() => {
        if (!isOpen) return
        async function loadCourse() {
            try {
                const details = await getCourseWithDetails(courseId)
                setFormData({
                    session: details.session,
                    semester: details.semester,
                    courseTitle: details.courseTitle,
                    courseCode: details.courseCode,
                    grade: details.grade,
                    courseLoad: details.courseLoad.toString(),
                })
            } catch (err) {
                console.error("Failed to fetch course details:", err)
            }
        }
        loadCourse()
    }, [isOpen, courseId])

    function toggleVisibility(e: React.MouseEvent) {
        e.preventDefault()
        if (e.target === e.currentTarget) setIsOpen((prev) => !prev)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsPending(true)
        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value.toString())
        })
        try {
            await editCourse(courseId, data)
            router.refresh() //refresh page after updating the course
            setIsOpen(false)
        } catch (err) {
            console.error("Failed to update course:", err)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <>
            <section
                onClick={toggleVisibility}
                className={`${
                    !isOpen ? "hidden" : ""
                } w-full h-screen fixed top-0 left-0 z-50 bg-gray-300/30 flex justify-center items-center`}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="w-120 p-4 pt-8 mx-4 bg-white rounded-xl text-gray-700">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex justify-center gap-4">
                            <input
                                name="session"
                                value={formData.session}
                                disabled
                                className="input-default-style bg-gray-100 cursor-not-allowed"
                            />
                            <input
                                name="semester"
                                value={formData.semester}
                                disabled
                                className="input-default-style bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <input
                            name="courseTitle"
                            onChange={handleChange}
                            value={formData.courseTitle}
                            type="text"
                            placeholder="Course Title e.g. Mathematics"
                            className="input-default-style"
                            required
                        />

                        <input
                            name="courseCode"
                            onChange={handleChange}
                            value={formData.courseCode}
                            type="text"
                            placeholder="Course Code e.g. MTH 101.1"
                            className="input-default-style"
                            required
                        />

                        <div className="flex justify-center gap-4">
                            <select
                                className="input-default-style"
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                required>
                                <option value="">Select Grade</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </select>

                            <input
                                name="courseLoad"
                                type="number"
                                value={formData.courseLoad}
                                onChange={handleChange}
                                placeholder="Credit Unit"
                                className="input-default-style"
                                min={1}
                                required
                            />
                        </div>

                        <div className="flex justify-between mx-4">
                            <button
                                type="button"
                                onClick={toggleVisibility}
                                className="mt-6 outline-2 outline-sky-500 hover:outline-sky-700 rounded-md px-4 py-2 text-sky-500 hover:text-sky-700 text-sm font-bold cursor-pointer">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className={`mt-6 ${
                                    isPending
                                        ? "bg-sky-300 hover:outline-sky-300"
                                        : "bg-sky-500 hover:outline-sky-500"
                                } hover:outline-2 hover:outline-offset-2 rounded-md px-4 py-2 text-white text-sm font-bold cursor-pointer`}>
                                {isPending ? "Updating..." : "Update Course"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
