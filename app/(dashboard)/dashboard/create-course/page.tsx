"use client"

import { createMultipleCourses } from "@/lib/serverActions" // a new function you’ll create
import React, { useState } from "react"

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

                <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
                    Add Course
                </button>
            </form>

            {/* List of added courses */}
            {courses.length > 0 && (
                <div className="space-y-2">
                    <h2 className="font-bold text-lg">Courses to be saved:</h2>
                    <ul className="space-y-1">
                        {courses.map((course, idx) => (
                            <li key={idx} className="bg-gray-100 px-4 py-2 rounded">
                                {course.courseCode} - {course.courseTitle} ({course.courseLoad} CU)
                                - Grade: {course.grade}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={saveAllCourses}
                        className="w-full mt-4 py-2 bg-green-600 text-white font-semibold rounded"
                        disabled={isPending}>
                        {isPending ? "Saving..." : "Save All Courses"}
                    </button>
                </div>
            )}
        </div>
    )
}
