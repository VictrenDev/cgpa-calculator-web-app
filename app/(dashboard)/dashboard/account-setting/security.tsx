"use client";
import { Lock, Key } from "lucide-react";
import { useState } from "react";
import { changePassword } from "./actions";

export default function Security() {
    const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    // const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Validate passwords match
        if (newPassword !== confirmPassword) {
            alert("passwords don't match");
            return;
        }
        // Call changePassword action
        const result = await changePassword({ currentPassword, newPassword });
        if (result?.error) {
            alert(result.error);
        }
        setShowPasswordForm(false);
    };

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
                    <form onSubmit={handlePasswordSubmit} className="space-y-4 border-t border-gray-200 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                                minLength={8}
                            />
                            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
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
        </div>
    );
}
