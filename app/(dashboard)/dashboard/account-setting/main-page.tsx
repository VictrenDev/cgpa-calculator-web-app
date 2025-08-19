"use client";
import { ArrowLeft, User, Lock, Trash2, BookOpen, Settings } from "lucide-react";
import Link from "next/link";
import AccountInfo from "./account-info";
import { useState } from "react";
import Security from "./security";
import Profile from "./profile";
type AcademicProfile = {
    universityName: string;
    departmentName: string;
};

export type AcademicInfoData = {
    firstName: string;
    lastName: string;
    email: string;
    academicProfile: AcademicProfile;
} | null;

export default function MainSettingsPage({ data }: { data: AcademicInfoData }) {
    const [activePage, setActivePage] = useState<string>("profile");

    const renderActivePage = () => {
        switch (activePage) {
            case "academic-info":
                return <AccountInfo />;
            case "security":
                return <Security />;
            case "profile":
                return <Profile data={data} />;
            default:
                return <AccountInfo />;
        }
    };
    return (
        <div className="container mx-auto p-4 pt-0 max-w-4xl">
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
                    <button
                        onClick={() => {
                            setActivePage("profile");
                        }}
                        className={`account-settings-navigation-links ${
                            activePage === "profile" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                        }`}>
                        <User className="w-5 h-5" />
                        Profile
                    </button>
                    <button
                        onClick={() => {
                            setActivePage("security");
                        }}
                        className={`account-settings-navigation-links ${
                            activePage === "security" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                        }`}>
                        <Lock className="w-5 h-5" />
                        Security
                    </button>

                    {/* <button
                        onClick={() => {
                            setActivePage("academic-info");
                        }}
                        className={`account-settings-navigation-links ${
                            activePage === "academic-info" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                        }`}>
                        <BookOpen className="w-5 h-5" />
                        Academic Info
                    </button> */}
                    {/* <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg text-red-600 mt-8">
                        <Trash2 className="w-5 h-5" />
                        Delete Account
                    </button> */}
                </div>

                {/* Main Content */}
                {renderActivePage()}
            </div>
        </div>
    );
}
