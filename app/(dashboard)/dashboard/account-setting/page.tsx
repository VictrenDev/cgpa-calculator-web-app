"use client"
import {
    ArrowLeft,
    User,
    Lock,
    Mail,
    Trash2,
    BookOpen,
    // GraduationCap,
    Settings,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="mb-6">
                <Link href="/dashboard" className="flex items-center text-blue-600 hover:underline">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold mt-4 flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Account Settings
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Navigation */}
                <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium">
                        <User className="w-5 h-5" />
                        Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-700">
                        <Lock className="w-5 h-5" />
                        Security
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-700">
                        <Mail className="w-5 h-5" />
                        Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-gray-700">
                        <BookOpen className="w-5 h-5" />
                        Academic Info
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-red-600 mt-8">
                        <Trash2 className="w-5 h-5" />
                        Delete Account
                    </button>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                        <User className="w-5 h-5 text-blue-600" />
                        Profile Information
                    </h2>

                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Victor"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Odoi"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                defaultValue="victor@email.com"
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
                                    defaultValue="KNUST"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Program
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Electronic Engineering"
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
                            Once you delete your account, there is no going back. All your data will
                            be permanently removed.
                        </p>
                        <button className="mt-4 px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50">
                            Delete My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
