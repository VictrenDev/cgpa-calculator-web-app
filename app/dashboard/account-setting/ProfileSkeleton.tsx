"use client";
import { Trash2, User } from "lucide-react";

export default function ProfileSkeleton() {
    return (
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-blue-600" />
                Profile Information
            </h2>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                        <div className="h-10 bg-gray-200 rounded-md"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                        <div className="h-10 bg-gray-200 rounded-md"></div>
                    </div>
                </div>

                <div>
                    <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                    <div className="h-10 bg-gray-200 rounded-md"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-28 mb-1"></div>
                        <div className="h-10 bg-gray-200 rounded-md"></div>
                    </div>
                    <div>
                        <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                        <div className="h-10 bg-gray-200 rounded-md"></div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex gap-4 justify-end">
                    <div className="h-10 bg-gray-200 rounded-md w-40"></div>
                    <div className="h-10 bg-gray-200 rounded-md w-32"></div>
                </div>
            </div>

            {/* Dangerous Zone Skeleton */}
            <div className="mt-12 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-red-700 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Delete Account
                </h3>
                <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mt-1"></div>
                <div className="h-10 bg-gray-200 rounded-md w-36 mt-4"></div>
            </div>
        </div>
    );
}
