"use client"
import { Lock, Key, Shield, LogOut } from "lucide-react"
import { useState } from "react"
import { changePassword, enableTwoFactorAuth } from "../actions/actions"

export default function Security() {
    const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false)
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false)

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Validate passwords match
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match!")
            return
        }
        // Call changePassword action
        await changePassword({ currentPassword, newPassword })
        setShowPasswordForm(false)
    }

    const toggleTwoFactorAuth = async () => {
        await enableTwoFactorAuth(!twoFactorEnabled)
        setTwoFactorEnabled(!twoFactorEnabled)
    }

    return (
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-blue-600" />
                Security Settings
            </h2>

            {/* Password Change Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-medium flex items-center gap-2">
                            <Key className="w-5 h-5 text-gray-700" />
                            Password
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Change your account password</p>
                    </div>
                    <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        {showPasswordForm ? "Cancel" : "Change Password"}
                    </button>
                </div>

                {showPasswordForm && (
                    <form
                        onSubmit={handlePasswordSubmit}
                        className="space-y-4 border-t border-gray-200 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                                minLength={8}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Password must be at least 8 characters long
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
                                Update Password
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Two-Factor Authentication */}
            <div className="mb-8 border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium flex items-center gap-2">
                            <Shield className="w-5 h-5 text-gray-700" />
                            Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Add an extra layer of security to your account
                        </p>
                    </div>
                    <button
                        onClick={toggleTwoFactorAuth}
                        className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 text-sm ${
                            twoFactorEnabled
                                ? "bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500"
                        }`}>
                        {twoFactorEnabled ? "Enabled" : "Disabled"}
                    </button>
                </div>
                {twoFactorEnabled && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 text-sm mb-2">Recovery Codes</h4>
                        <p className="text-xs text-blue-700 mb-3">
                            Save these codes in a secure place. You can use them to access your
                            account if you lose access to your authentication device.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {["A1B2-C3D4", "E5F6-G7H8", "I9J0-K1L2", "M3N4-O5P6"].map((code) => (
                                <div
                                    key={code}
                                    className="bg-white p-2 text-center font-mono text-sm">
                                    {code}
                                </div>
                            ))}
                        </div>
                        <button className="text-xs text-blue-600 hover:underline">
                            Generate New Codes
                        </button>
                    </div>
                )}
            </div>

            {/* Session Management */}
            <div className="mb-8 border-t border-gray-200 pt-6">
                <h3 className="font-medium mb-4">Active Sessions</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">Chrome on Windows</p>
                            <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
                            <p className="text-xs text-gray-500">IP: 192.168.1.1</p>
                        </div>
                        <button className="text-red-600 text-sm hover:underline">Log Out</button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium">Safari on iPhone</p>
                            <p className="text-xs text-gray-500">Last active: 5 days ago</p>
                            <p className="text-xs text-gray-500">IP: 203.0.113.42</p>
                        </div>
                        <button className="text-red-600 text-sm hover:underline">Log Out</button>
                    </div>
                </div>
            </div>

            {/* Log Out Everywhere */}
            <div className="border-t border-gray-200 pt-6">
                <button className="flex items-center gap-2 text-red-600 hover:underline">
                    <LogOut className="w-5 h-5" />
                    Log Out of All Devices
                </button>
            </div>
        </div>
    )
}
