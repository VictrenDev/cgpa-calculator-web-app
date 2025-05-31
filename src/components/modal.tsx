"use client"
import { useState } from "react"

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
    function handleSubmit(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    return (
        <>
            <button onClick={toggleVisibility} className="py-3 px-4 rounded-md bg-gray-800 fixed bottom-10 right-10 cursor-pointer text-xs text-amber-100 font-semibold ">
                Upload Course
            </button>
            <section onClick={toggleVisibility} className={`${!isOpen ? "hidden" : ""} w-full h-screen fixed top-0 bg-gray-300/30 flex justify-center items-center`}>
                <div className="w-120 p-4 pt-8  mx-4 bg-white rounded-xl text-gray-700">
                    <form action="" className="">
                        <div className="flex justify-center gap-4">
                            <select className=" input-default-style" name="" id="course-semester">
                                <option value=""> 2021/2022</option>
                                <option value="something">2022/2023</option>
                                <option value="something">2023/2024</option>
                                <option value="something">2024/2025</option>
                            </select>
                            <select className=" input-default-style" name="" id="course-semester">
                                <option value="">First Semester</option>
                                <option value="something">Second Semester</option>
                            </select>
                        </div>
                        <input name="courseTitle" onChange={handleSubmit} value={formData.courseTitle} type="text" placeholder="Course Title E.g: Mathematics" className="input-default-style" />
                        <input
                            name="courseCode"
                            onChange={handleSubmit}
                            value={formData.courseCode}
                            type="text"
                            placeholder="Course 
                    Code e.g. MTH 101.1"
                            className="input-default-style"
                        />
                        <div className="flex justify-center gap-4">
                            <select className=" input-default-style" name="" id="course-semester">
                                <option value=""> A</option>
                                <option value="something">B</option>
                                <option value="something">C</option>
                                <option value="something">D</option>
                                <option value="something">E</option>
                                <option value="something">F</option>
                            </select>
                            <input type="number" pattern="[/0-9]" minLength={1} placeholder="Credit Unit" className="input-default-style" />
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
                                {" "}
                                Create Course{" "}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
