"use client"

import { useState } from "react"
import { createAcademicProfile } from "@/lib/serverActions"

export default function AcademicProfileForm({ userId }: { userId: string }) {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        } catch (err: any) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-md mt-12">
            <h2 className="text-xl font-bold mb-6">Create Your Academic Profile</h2>

            <div className="space-y-4">
                <input
                    name="universityName"
                    value={form.universityName}
                    onChange={handleChange}
                    placeholder="University Name"
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    name="facultyName"
                    value={form.facultyName}
                    onChange={handleChange}
                    placeholder="Faculty Name"
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    name="departmentName"
                    value={form.departmentName}
                    onChange={handleChange}
                    placeholder="Department Name"
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    name="startYear"
                    type="number"
                    value={form.startYear}
                    onChange={handleChange}
                    placeholder="Start Year"
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    name="courseDuration"
                    type="number"
                    value={form.courseDuration}
                    onChange={handleChange}
                    placeholder="Course Duration (Years)"
                    required
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    name="gradePointSystem"
                    type="number"
                    value={form.gradePointSystem}
                    onChange={handleChange}
                    placeholder="Grade Point System (e.g. 5 or 4)"
                    required
                    min={4}
                    max={5}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-600 mt-4">Profile created!</p>}

            <button
                type="submit"
                disabled={loading}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                {loading ? "Saving..." : "Create Profile"}
            </button>
        </form>
    )
}
