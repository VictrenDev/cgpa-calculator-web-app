"use client"

import Link from "next/link"

export default function CreateCourseModal() {
    return (
        <Link
            href="/dashboard/create-course"
            className="fixed bottom-8 right-8 flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                />
            </svg>
            Create Course
        </Link>
    )
}
// import { createCourse } from "@/lib/serverActions"
// import React, { useState } from "react"
// type CreateCourse = {
//     session?: string
//     semester?: string
//     courseTitle: string
//     courseCode: string | ""
//     grade: "A" | "B" | "C" | "D" | "E" | "F" | ""
//     courseLoad: number | ""
// }
// export default function CreateCourseModal({ initialIsOpen = false }: { initialIsOpen?: boolean }) {
//     const [isPending, setIsPending] = useState(false)
//     const [isOpen, setIsOpen] = useState(initialIsOpen)
//     const [formData, setFormData] = useState<CreateCourse>({
//         session: "",
//         semester: "",
//         courseTitle: "",
//         courseCode: "",
//         grade: "",
//         courseLoad: "",
//     })

//     function toggleVisibility(e: React.MouseEvent) {
//         e.preventDefault()
//         if (e.target === e.currentTarget) setIsOpen((prev) => !prev)
//     }

//     function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))
//     }

//     async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault()
//         setIsPending(true)
//         const data = new FormData()
//         Object.entries(formData).forEach(([key, value]) => {
//             data.append(key, value.toString())
//         })
//         try {
//             await createCourse(data)
//             setFormData({
//                 session: "",
//                 semester: "",
//                 courseTitle: "",
//                 courseCode: "",
//                 grade: "",
//                 courseLoad: "",
//             })
//             setIsOpen(false)
//         } catch (err) {
//             console.error("Failed to create course:", err)
//         } finally {
//             setIsPending(false)
//         }
//     }

//     return (
//         <>
//             <button
//                 onClick={toggleVisibility}
//                 className="py-3 px-4 rounded-md bg-gray-800 fixed bottom-10 right-10 cursor-pointer text-xs text-white font-semibold">
//                 Create Course
//             </button>

//             <section
//                 onClick={toggleVisibility}
//                 className={`${
//                     !isOpen ? "hidden" : ""
//                 } w-full h-screen fixed top-0 left-0 z-50 bg-gray-300/30 flex justify-center items-center`}>
//                 <div
//                     onClick={(e) => {
//                         e.stopPropagation()
//                     }}
//                     className="w-120 p-4 pt-8 mx-4 bg-white rounded-xl text-gray-700">
//                     <form className="space-y-4" onSubmit={handleSubmit}>
//                         <div className="flex justify-center gap-4">
//                             <select
//                                 className="input-default-style"
//                                 name="session"
//                                 value={formData.session}
//                                 onChange={handleChange}
//                                 required>
//                                 <option value="">Select Session</option>
//                                 <option value="2021-2022">2021-2022</option>
//                                 <option value="2022-2023">2022-2023</option>
//                                 <option value="2023-2024">2023-2024</option>
//                                 <option value="2024-2025">2024-2025</option>
//                             </select>

//                             <select
//                                 className="input-default-style"
//                                 name="semester"
//                                 value={formData.semester}
//                                 onChange={handleChange}
//                                 required>
//                                 <option value="">Select Semester</option>
//                                 <option value="First Semester">First Semester</option>
//                                 <option value="Second Semester">Second Semester</option>
//                             </select>
//                         </div>

//                         <input
//                             name="courseTitle"
//                             onChange={handleChange}
//                             value={formData.courseTitle}
//                             type="text"
//                             placeholder="Course Title e.g. Mathematics"
//                             className="input-default-style"
//                             required
//                         />

//                         <input
//                             name="courseCode"
//                             onChange={handleChange}
//                             value={formData.courseCode}
//                             type="text"
//                             placeholder="Course Code e.g. MTH 101.1"
//                             className="input-default-style"
//                             required
//                         />

//                         <div className="flex justify-center gap-4">
//                             <select
//                                 className="input-default-style"
//                                 name="grade"
//                                 value={formData.grade}
//                                 onChange={handleChange}
//                                 required>
//                                 <option value="">Select Grade</option>
//                                 <option value="A">A</option>
//                                 <option value="B">B</option>
//                                 <option value="C">C</option>
//                                 <option value="D">D</option>
//                                 <option value="E">E</option>
//                                 <option value="F">F</option>
//                             </select>

//                             <input
//                                 name="courseLoad"
//                                 type="number"
//                                 value={formData.courseLoad}
//                                 onChange={handleChange}
//                                 placeholder="Credit Unit"
//                                 className="input-default-style"
//                                 min={1}
//                                 required
//                             />
//                         </div>

//                         <div className="flex justify-between mx-4">
//                             <button
//                                 type="button"
//                                 onClick={toggleVisibility}
//                                 className="mt-6 outline-2 outline-sky-500 hover:outline-sky-700 rounded-md px-4 py-2 text-sky-500 hover:text-sky-700 text-sm font-bold cursor-pointer">
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={isPending}
//                                 className={`mt-6  ${
//                                     isPending
//                                         ? "bg-sky-300 hover:outline-sky-300"
//                                         : "bg-sky-500 hover:outline-sky-500"
//                                 } hover:outline-2 hover:outline-offset-2  rounded-md px-4 py-2 text-white text-sm font-bold cursor-pointer`}>
//                                 {isPending ? "Creating..." : "Create Course"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//         </>
//     )
// }
