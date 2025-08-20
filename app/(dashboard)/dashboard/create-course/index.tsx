"use client";

import { createMultipleCourses } from "@/lib/serverActions";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type CreateCourse = {
    session?: string;
    semester?: string;
    courseTitle: string;
    courseCode: string;
    grade: "A" | "B" | "C" | "D" | "E" | "F" | "";
    courseLoad: number | "";
};

export default function CreateCoursesPage({ startYear, courseDuration }: { startYear: number; courseDuration: number }) {
    const [formData, setFormData] = useState<CreateCourse>({
        session: "",
        semester: "",
        courseTitle: "",
        courseCode: "",
        grade: "",
        courseLoad: "",
    });

    const generateSessionOptions = () => {
        const options = [];
        for (let i = 0; i < courseDuration; i++) {
            const year = startYear + i;
            const endYear = year + 1;
            const value = `${year}-${endYear}`;
            options.push(
                <option key={value} value={value}>
                    {value}
                </option>
            );
        }
        return options;
    };
    const [courses, setCourses] = useState<CreateCourse[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function removeCourse(index: number) {
        setCourses((prev) => prev.filter((_, i) => i !== index));
        toast.success("Course removed from list");
    }

    function addCourseToList() {
        if (!formData.courseTitle || !formData.courseCode || !formData.grade || !formData.courseLoad || !formData.session || !formData.semester) {
            toast.error("Please fill all required fields");
            return;
        }

        setCourses((prev) => [...prev, formData]);
        setFormData({
            session: formData.session,
            semester: formData.semester,
            courseTitle: "",
            courseCode: "",
            grade: "",
            courseLoad: "",
        });
        toast.success("Course added to list");
    }

    async function saveAllCourses() {
        if (courses.length === 0) {
            toast.error("No courses to save");
            return;
        }

        setIsPending(true);
        try {
            await createMultipleCourses(courses);
            setCourses([]);
            toast.success("Courses saved successfully! Redirecting to dashboard...");
            // You might want to add a redirect here after a brief delay
        } catch (err) {
            console.error("Failed to save courses:", err);
            toast.error("Failed to save courses. Please try again.");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto space-y-6 mt-6 px-4">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Add Your Courses</h1>
                <p className="text-gray-600 mt-2">Add courses one by one, then save them all at once</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    className={`py-3 px-6 font-medium text-sm ${
                        activeTab === "form" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("form")}>
                    Add Course
                </button>
                <button
                    className={`py-3 px-6 font-medium text-sm flex items-center ${
                        activeTab === "preview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("preview")}
                    disabled={courses.length === 0}>
                    Review Courses
                    {courses.length > 0 && (
                        <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{courses.length}</span>
                    )}
                </button>
            </div>

            {/* Form Section */}
            {activeTab === "form" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Course Information</h2>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addCourseToList();
                        }}
                        className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Academic Session *</label>
                                <select
                                    name="session"
                                    value={formData.session}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                    <option value="">Select Session</option>

                                    {generateSessionOptions()}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Semester *</label>
                                <select
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                                    <option value="">Select Semester</option>
                                    <option value="First Semester">First Semester</option>
                                    <option value="Second Semester">Second Semester</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                            <input
                                name="courseTitle"
                                value={formData.courseTitle}
                                onChange={handleChange}
                                placeholder="e.g. Introduction to Computer Science"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Code *</label>
                                <input
                                    name="courseCode"
                                    value={formData.courseCode}
                                    onChange={handleChange}
                                    placeholder="e.g. CS101"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Load *</label>
                                <input
                                    type="number"
                                    name="courseLoad"
                                    value={formData.courseLoad}
                                    onChange={handleChange}
                                    placeholder="Credit units"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    required
                                    min={1}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Grade *</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                                {(["A", "B", "C", "D", "E", "F"] as const).map((grade) => (
                                    <button
                                        key={grade}
                                        type="button"
                                        className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                                            formData.grade === grade
                                                ? "bg-blue-100 border-blue-500 text-blue-700 font-medium"
                                                : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => setFormData({ ...formData, grade })}>
                                        {grade}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`
                w-full mt-2 py-3 px-4 text-white font-semibold rounded-lg
                transition-all duration-200 ease-in-out
                ${isPending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:opacity-75 disabled:cursor-not-allowed
              `}
                            disabled={isPending}>
                            Add to Course List
                        </button>
                    </form>
                </div>
            )}

            {/* Preview Section */}
            {activeTab === "preview" && (
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Courses to Save <span className="text-blue-600">({courses.length})</span>
                        </h2>
                        <button onClick={() => setActiveTab("form")} className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Add Another Course
                        </button>
                    </div>

                    {courses.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 mx-auto text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <p className="mt-4 text-gray-600">No courses added yet</p>
                            <button onClick={() => setActiveTab("form")} className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                                Add your first course
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-hidden border border-gray-200 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Code
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Credits
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Grade
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {courses.map((course, idx) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <span className="font-mono text-sm font-medium text-gray-900">{course.courseCode}</span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="text-sm text-gray-900 max-w-xs truncate">{course.courseTitle}</div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{course.courseLoad}</td>
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        {course.grade}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => removeCourse(idx)}
                                                        className="text-red-600 hover:text-red-900 transition-colors">
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blue-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-blue-800">Ready to save?</h3>
                                        <div className="mt-2 text-sm text-blue-700">
                                            <p>
                                                You're about to save {courses.length} course{courses.length !== 1 ? "s" : ""} for{" "}
                                                {courses[0]?.session} ({courses[0]?.semester}).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={saveAllCourses}
                                className={`
                  w-full mt-6 py-3.5 px-4 bg-green-600 text-white font-medium rounded-lg
                  flex items-center justify-center gap-2
                  hover:bg-green-700 transition-colors
                  ${isPending ? "opacity-75 cursor-not-allowed" : "shadow-md hover:shadow-lg"}
                `}
                                disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving Courses...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Save All Courses
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
