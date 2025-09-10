"use client"
import { BookOpen } from "lucide-react"
import { updateAcademicInfo } from "../actions/actions"
import { useState } from "react"

export default function AccountInfo() {
    const [isEditing, setIsEditing] = useState<boolean>(false)

    return (
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Academic Information
            </h2>

            <form
                action={updateAcademicInfo}
                className={`space-y-4 ${isEditing ? "is-editing-styles" : ""}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            University
                        </label>
                        <input
                            type="text"
                            name="university"
                            disabled={!isEditing}
                            defaultValue="University of Example"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>
                        <input
                            type="text"
                            name="department"
                            disabled={!isEditing}
                            defaultValue="Computer Science"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Degree Level
                        </label>
                        <select
                            name="degreeLevel"
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            defaultValue="bachelor">
                            <option value="bachelor">Bachelor's</option>
                            <option value="master">Master's</option>
                            <option value="phd">PhD</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Enrollment Year
                        </label>
                        <input
                            type="number"
                            name="enrollmentYear"
                            disabled={!isEditing}
                            defaultValue="2020"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* e */}

                <div className="pt-4 border-t border-gray-200 flex gap-4 justify-end">
                    <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer">
                        {isEditing ? "Cancel Editing" : "Edit Academic Info"}
                    </button>
                    {isEditing && (
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer">
                            Save Changes
                        </button>
                    )}
                </div>
            </form>

            {/* <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium flex items-center gap-2 text-blue-700">
                    <GraduationCap className="w-5 h-5" />
                    Academic Verification
                </h3>
                <p className="text-sm text-gray-600 mt-1 mb-4">
                    Verify your academic status by uploading official documents.
                </p>
                <div className="flex items-center gap-4">
                    <div className="flex-1 border border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500 mb-2">Student ID Card</p>
                        <button className="text-sm text-blue-600 hover:underline">
                            {false ? "View Document" : "Upload Document"}
                        </button>
                    </div>
                    <div className="flex-1 border border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-500 mb-2">Enrollment Verification</p>
                        <button className="text-sm text-blue-600 hover:underline">
                            {false ? "View Document" : "Upload Document"}
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
