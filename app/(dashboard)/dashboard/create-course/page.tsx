"use client"

import { createMultipleCourses } from "@/lib/serverActions" // a new function you’ll create
import React, { useState } from "react"
import { toast } from "sonner"

type CreateCourse = {
    session?: string
    semester?: string
    courseTitle: string
    courseCode: string
    grade: "A" | "B" | "C" | "D" | "E" | "F" | ""
    courseLoad: number | ""
}

export default function CreateCoursesPage() {
    const [formData, setFormData] = useState<CreateCourse>({
        session: "",
        semester: "",
        courseTitle: "",
        courseCode: "",
        grade: "",
        courseLoad: "",
    })

    const [courses, setCourses] = useState<CreateCourse[]>([])
    const [isPending, setIsPending] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    function removeCourse(index: number) {
        setCourses((prev) => prev.filter((_, i) => i !== index))
        toast.success("Course removed from list")
    }

    function addCourseToList() {
        if (
            !formData.courseTitle ||
            !formData.courseCode ||
            !formData.grade ||
            !formData.courseLoad ||
            !formData.session ||
            !formData.semester
        )
            return

        setCourses((prev) => [...prev, formData])
        setFormData({
            session: formData.session,
            semester: formData.semester,
            courseTitle: "",
            courseCode: "",
            grade: "",
            courseLoad: "",
        })
        toast.success("Course Successfully Added to List")
    }

    async function saveAllCourses() {
        setIsPending(true)
        try {
            await createMultipleCourses(courses) // Send all at once
            setCourses([])
            alert("Courses saved successfully!")
        } catch (err) {
            console.error("Failed to save courses:", err)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <div className="max-w-xl mx-auto space-y-6 mt-10 px-4">
            {/* Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    addCourseToList()
                }}
                className="space-y-4 bg-white p-6 rounded-lg shadow">
                {/* Session & Semester */}
                <div className="flex gap-4">
                    <select
                        name="session"
                        value={formData.session}
                        onChange={handleChange}
                        required
                        className="input-default-style w-full">
                        <option value="">Select Session</option>
                        <option value="2021-2022">2021-2022</option>
                        <option value="2022-2023">2022-2023</option>
                        <option value="2023-2024">2023-2024</option>
                        <option value="2024-2025">2024-2025</option>
                    </select>

                    <select
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                        className="input-default-style w-full">
                        <option value="">Select Semester</option>
                        <option value="First Semester">First Semester</option>
                        <option value="Second Semester">Second Semester</option>
                    </select>
                </div>

                <input
                    name="courseTitle"
                    value={formData.courseTitle}
                    onChange={handleChange}
                    placeholder="Course Title"
                    className="input-default-style w-full"
                    required
                />

                <input
                    name="courseCode"
                    value={formData.courseCode}
                    onChange={handleChange}
                    placeholder="Course Code"
                    className="input-default-style w-full"
                    required
                />

                <div className="flex gap-4">
                    <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="input-default-style w-full"
                        required>
                        <option value="">Grade</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                    </select>

                    <input
                        type="number"
                        name="courseLoad"
                        value={formData.courseLoad}
                        onChange={handleChange}
                        placeholder="Credit Load"
                        className="input-default-style w-full"
                        required
                        min={1}
                    />
                </div>

                <button
                    type="submit"
                    className={`
    w-full mt-4 py-3 px-4 text-white font-semibold rounded-lg
    transition-all duration-200 ease-in-out cursor-pointer
    ${
        isPending
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
    }
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-75 disabled:cursor-not-allowed
  `}
                    disabled={isPending}>
                    Add Course
                </button>
            </form>

            {/* List of added courses */}
            {courses.length > 0 && (
                <div className="space-y-4">
                    <h2 className="font-bold text-lg text-gray-800">Courses to be saved</h2>
                    <ul className="space-y-3">
                        {courses.map((course, idx) => (
                            <li
                                key={idx}
                                className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-gray-900 truncate">
                                        <span className="uppercase"> {course.courseCode} </span>-
                                        <span>{course.courseTitle}</span>
                                    </h3>
                                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                                        <span>{course.courseLoad} Credit Units</span>
                                        <span>•</span>
                                        <span>Grade: {course.grade}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeCourse(idx)}
                                    className="ml-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                                    aria-label="Remove course">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={saveAllCourses}
                        className={`
        w-full mt-6 py-3 px-4 bg-green-600 text-white font-medium rounded-lg
        flex items-center justify-center gap-2
        hover:bg-green-700 transition-colors cursor-pointer
        ${isPending ? "opacity-75 cursor-not-allowed" : ""}
      `}
                        disabled={isPending}>
                        {isPending ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                    <polyline points="17 21 17 13 7 13 7 21" />
                                    <polyline points="7 3 7 8 15 8" />
                                </svg>
                                Save All Courses
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
}
