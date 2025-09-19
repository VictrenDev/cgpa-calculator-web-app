"use client";
import { Trash2, User } from "lucide-react";
import { updateProfileInfo } from "../actions/actions";
import { useState } from "react";
import DeleteAccount from "../deleteAccount";
type AcademicProfile = {
    universityName: string;
    departmentName: string;
} | null;

export type AcademicInfoData = {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        academicProfile: AcademicProfile;
    } | null;
};

export default function Profile({ data }: { data: AcademicInfoData }) {
    const [isEditingProfileData, setIsEditingProfileData] = useState<boolean>(true);

    return (
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-blue-600" />
                Profile Information
            </h2>

            <form action={updateProfileInfo} className={`space-y-4 ${isEditingProfileData ? "is-editing-styles" : ""}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            disabled={isEditingProfileData}
                            defaultValue={`${data.user?.firstName ?? ""}`}
                            className="w-full  px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            disabled={isEditingProfileData}
                            defaultValue={`${data.user?.lastName ?? ""}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        disabled={isEditingProfileData}
                        name="email"
                        defaultValue={`${data.user?.email ?? ""}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                        <input
                            type="text"
                            disabled={isEditingProfileData}
                            name="univeristyName"
                            defaultValue={`${data.user?.academicProfile?.universityName ?? ""}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                        <input
                            type="text"
                            disabled={isEditingProfileData}
                            name="departmentName"
                            defaultValue={`${data.user?.academicProfile?.departmentName ?? ""}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex gap-4 justify-end">
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditingProfileData((prev) => !prev);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer ">
                        {isEditingProfileData ? "Edit Profile Data" : "Lock Profile Data"}
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer">
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
                    Once you delete your account, there is no going back. All your data will be permanently removed.
                </p>
                <DeleteAccount />
            </div>
        </div>
    );
}
