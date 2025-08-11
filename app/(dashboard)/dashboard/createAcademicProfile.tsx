"use client"

import { useState } from "react"
import { createAcademicProfile } from "@/lib/serverActions"

export default function AcademicProfileForm() {
    const [form, setForm] = useState({
        universityName: "",
        facultyName: "",
        departmentName: "",
        startYear: new Date().getFullYear(),
        courseDuration: 4,
        gradePointSystem: 5,
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        try {
            await createAcademicProfile({ ...form })
            setSuccess(true)
            // Optional: refresh the page or redirect
            window.location.reload()
            // } catch (err: ) {
            //     setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="fixed w-full top-0 z-50 h-screen flex justify-center items-center bg-gray-400/20 backdrop-blur-[1.5px] px-4 py-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-lg  mx-auto p-8 bg-white shadow-lg rounded-lg mt-12 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Create Your Academic Profile
                    </h2>
                    <p className="text-gray-600">Fill in your academic details to get started</p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label
                            htmlFor="universityName"
                            className="block text-sm font-medium text-gray-700 mb-1">
                            University Name
                        </label>
                        <input
                            id="universityName"
                            name="universityName"
                            value={form.universityName}
                            onChange={handleChange}
                            placeholder="e.g. Harvard University"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="facultyName"
                            className="block text-sm font-medium text-gray-700 mb-1">
                            Faculty Name
                        </label>
                        <input
                            id="facultyName"
                            name="facultyName"
                            value={form.facultyName}
                            onChange={handleChange}
                            placeholder="e.g. Faculty of Engineering"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="departmentName"
                            className="block text-sm font-medium text-gray-700 mb-1">
                            Department Name
                        </label>
                        <input
                            id="departmentName"
                            name="departmentName"
                            value={form.departmentName}
                            onChange={handleChange}
                            placeholder="e.g. Computer Science"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="startYear"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Start Year
                            </label>
                            <input
                                id="startYear"
                                name="startYear"
                                type="number"
                                value={form.startYear}
                                onChange={handleChange}
                                placeholder="e.g. 2020"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="courseDuration"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Duration (Years)
                            </label>
                            <input
                                id="courseDuration"
                                name="courseDuration"
                                type="number"
                                value={form.courseDuration}
                                onChange={handleChange}
                                placeholder="e.g. 4"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="gradePointSystem"
                            className="block text-sm font-medium text-gray-700 mb-1">
                            Grade Point System
                        </label>
                        <select
                            id="gradePointSystem"
                            name="gradePointSystem"
                            value={form.gradePointSystem}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                            <option value="">Select grading system</option>
                            <option value="4">4.0 Scale</option>
                            <option value="5">5.0 Scale</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-md text-center">{error}</div>
                )}

                {success && (
                    <div className="p-3 bg-green-50 text-green-700 rounded-md text-center">
                        Profile created successfully!
                    </div>
                )}

                <div className="text-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-70">
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                Processing...
                            </span>
                        ) : (
                            "Create Profile"
                        )}
                    </button>
                </div>
            </form>
        </section>
    )
}
