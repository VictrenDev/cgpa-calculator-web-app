"use client"

import { createCourse } from "@/utils/serverActions"
import React, { useState } from "react"

export default function Modal({ initialIsOpen = false }: { initialIsOpen: boolean }) {
    const [isOpen, setIsOpen] = useState(initialIsOpen)
    const [formData, setFormData] = useState({
        session: "",
        semester: "",
        courseTitle: "",
        courseCode: "",
        grade: "",
        courseLoad: "",
    })

    function toggleVisibility(e: React.MouseEvent) {
        e.preventDefault()
        if (e.target === e.currentTarget) setIsOpen((prev) => !prev)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        console.log("form is submitted")
        e.preventDefault()

        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value)
        })

        try {
            await createCourse(data)
            setFormData({
                session: "",
                semester: "",
                courseTitle: "",
                courseCode: "",
                grade: "",
                courseLoad: "",
            })
            setIsOpen(false) // close modal on success
        } catch (err) {
            console.error("Failed to create course:", err)
        }
    }

    return (
        <>
            <button
                onClick={toggleVisibility}
                className="py-3 px-4 rounded-md bg-gray-800 fixed bottom-10 right-10 cursor-pointer text-xs text-white font-semibold">
                Upload Course
            </button>

            <section
                onClick={toggleVisibility}
                className={`${
                    !isOpen ? "hidden" : ""
                } w-full h-screen fixed top-0 bg-gray-300/30 flex justify-center items-center`}>
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className="w-120 p-4 pt-8 mx-4 bg-white rounded-xl text-gray-700">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex justify-center gap-4">
                            <select
                                className="input-default-style"
                                name="session"
                                value={formData.session}
                                onChange={handleChange}
                                required>
                                <option value="">Select Session</option>
                                <option value="2021-2022">2021-2022</option>
                                <option value="2022-2023">2022-2023</option>
                                <option value="2023-2024">2023-2024</option>
                                <option value="2024-2025">2024-2025</option>
                            </select>

                            <select
                                className="input-default-style"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                required>
                                <option value="">Select Semester</option>
                                <option value="First Semester">First Semester</option>
                                <option value="Second Semester">Second Semester</option>
                            </select>
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
                                className="mt-6 bg-sky-500 hover:bg-sky-700 hover:outline-2 hover:outline-offset-2 hover:outline-sky-700 rounded-md px-4 py-2 text-white text-sm font-bold cursor-pointer">
                                Create Course
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
