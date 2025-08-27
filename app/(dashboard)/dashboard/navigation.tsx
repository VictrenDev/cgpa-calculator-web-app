"use client";
import { ChevronDown, Settings } from "lucide-react";
import LogoutUser from "./logoutScreen";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
type AcademicProfile = {
    universityName: string;
    departmentName: string;
    gradePointSystem: number;
    startYear: number;
    courseDuration: number;
};

type UserProps = {
    firstName: string | null;
    lastName: string | null;
    email: string;
    academicProfile: AcademicProfile | null;
} | null;
type Props = {
    user: UserProps;
    cgpa: number;
    currentSemester?: string;
    totalCourses?: number;
    coursesCAndAbove?: number;
};

export default function NavigationData({
    user,
    cgpa,
    // currentSemester,
    totalCourses,
    coursesCAndAbove,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    let gradeClass: string;
    const cgpaFormatted = Number(cgpa.toFixed(2));

    switch (true) {
        case cgpaFormatted >= 4.5:
            gradeClass = "First Class";
            break;
        case cgpaFormatted >= 3.5:
            gradeClass = "Second Class Upper";
            break;
        case cgpaFormatted >= 3.0:
            gradeClass = "Second Class Lower";
            break;
        case cgpaFormatted >= 2.5:
            gradeClass = "Third Class Upper";
            break;
        case cgpaFormatted >= 2.0:
            gradeClass = "Third Class Lower";
            break;
        default:
            gradeClass = "Pass";
    }

    const firstName = user?.firstName ?? "";
    const lastName = user?.lastName ?? "";
    const name = user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "";
    const nameAbbrv = name
        ? name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()
        : "";

    const total = totalCourses ?? 0;
    const coursesAbove = coursesCAndAbove ?? 0;
    const coursePercentage = total > 0 ? (coursesAbove / total) * 100 : 0;
    const startYear: number = user?.academicProfile?.startYear ?? 0;
    const courseDuration: number = user?.academicProfile?.courseDuration ?? 0;
    const expectedGraduationYear: number = startYear + courseDuration;
    return (
        <section className="sticky top-0 mb-4 w-full bg-[var(--background-bg)] z-50">
            <div ref={modalRef} className="container-fluid py-4 flex justify-end items-center ">
                <div ref={modalRef} className="relative">
                    <button
                        onClick={() => {
                            setIsOpen((prev) => !prev);
                        }}
                        className="flex gap-2 items-center py-2 px-4 bg-white rounded-sm shadow-xs cursor-pointer">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 font-medium rounded-full text-sm">
                            {nameAbbrv}
                        </div>
                        <div className="text-xs text-left">
                            <p className="font-semibold text-gray-700 capitalize">
                                {firstName} {lastName}
                            </p>
                            <p className="text-gray-500">{user?.academicProfile?.departmentName ?? "N/A"}</p>
                        </div>
                        <ChevronDown className={`ml-2 w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""} `} />
                    </button>

                    {/* Enhanced Dropdown Content */}
                    <div
                        className={`absolute top-full right-0 mt-2 md:w-100 w-75 bg-white rounded-md shadow-lg border border-gray-100   ${
                            isOpen ? "visible opacity-100" : "invisible opacity-0"
                        } transition-all duration-200 z-50`}>
                        {/* User Profile Section */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-medium flex items-center justify-center">
                                    {nameAbbrv}
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 capitalize">
                                        {firstName} {lastName}
                                    </p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[0.65rem] bg-green-100 text-green-800">
                                        {gradeClass}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Academic Dashboard Section */}
                        <div className="p-2 border-b border-gray-100">
                            <div className="px-3 py-2 text-sm">
                                {/* <p className="text-gray-700 font-medium mb-2">Academic Dashboard</p> */}

                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span>CGPA:</span>
                                        <span className="font-medium text-green-600">
                                            {cgpa.toFixed(2)}/{user?.academicProfile?.gradePointSystem.toFixed(2) ?? 0}
                                        </span>
                                    </div>

                                    <div className="mt-1">
                                        <div className="flex justify-between">
                                            <span>Credits:</span>
                                            <span>
                                                {coursesCAndAbove}/{totalCourses} ({coursePercentage.toFixed()}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 h-1 mt-1 rounded-full">
                                            <div
                                                className="bg-blue-500 h-1 rounded-full"
                                                style={{
                                                    width: `${coursePercentage.toFixed(2)}%`,
                                                }}></div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Institution:</span>
                                        <span className="text-gray-500">{user?.academicProfile?.universityName}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Grad Year:</span>
                                        <span className="text-gray-500">{expectedGraduationYear}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Section */}
                        <div className="p-2">
                            <Link
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                href="/dashboard/account-setting"
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors ">
                                <Settings className="w-4 h-4" />
                                Account Settings
                            </Link>
                            {/* <Link
                                onClick={() => {
                                    setIsOpen(false)
                                }}
                                href="/dashboard/academic-report"
                                className="block w-full text-center px-3 py-2 mb-1 text-xs text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                View full academic report →
                            </Link> */}
                            <LogoutUser />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
