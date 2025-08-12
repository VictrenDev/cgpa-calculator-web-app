"use client"
import { Trash2, User } from "lucide-react"
import { updateAccountInfo } from "../actions/actions"
import { AcademicInfoData } from "./main-page"

export default function Profile({ data }: { data: AcademicInfoData }) {
    console.log(data)
    return (
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-blue-600" />
                Profile Information
            </h2>

            <form action={updateAccountInfo} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            defaultValue={`${data?.user?.firstName ?? ""}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            defaultValue={`${data?.user?.lastName ?? ""}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        defaultValue={`${data?.user?.email ?? ""}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            University
                        </label>
                        <input
                            type="text"
                            name="univeristy"
                            defaultValue={`${data?.user?.academicProfile?.universityName ?? ""}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Program
                        </label>
                        <input
                            type="text"
                            name="department"
                            defaultValue={`${data?.user?.academicProfile?.departmentName ?? ""}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Save Changes
                    </button>
                </div>
            </form>

            {/* Dangerous Zone */}
            <div className="mt-12 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-red-700 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Delete Account
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                    Once you delete your account, there is no going back. All your data will be
                    permanently removed.
                </p>
                <button className="mt-4 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50">
                    Delete My Account
                </button>
            </div>
        </div>
    )
}
