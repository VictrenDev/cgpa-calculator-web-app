"use client";

import useSWR from "swr";
import axios from "axios";
import * as XLSX from "xlsx";
import { Prisma } from "@/generated/prisma";

type UserInfo = Prisma.UserGetPayload<{
    include: { sessions: { include: { semester: { include: { courses: true } } } } };
}>;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function ExportResultClient() {
    const { data: userData, error, isLoading } = useSWR<UserInfo>("/api/export-result", fetcher);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!userData) return <div>User not found</div>;

    const name = [userData.firstName, userData.lastName].filter(Boolean).join(" ") || "User";

    const exportExcel = () => {
        const workbook = XLSX.utils.book_new();

        userData.sessions.forEach((session) => {
            const rows = session.semester.flatMap((semester) =>
                semester.courses.map((course) => ({
                    Session: session.name,
                    Semester: semester.name,
                    Course: course.courseTitle,
                    Load: course.courseLoad,
                    Grade: course.grade,
                }))
            );

            if (rows.length === 0) return; // skip empty sessions
            // Create worksheet from rows
            const worksheet = XLSX.utils.json_to_sheet(rows, { skipHeader: false });

            // Add title row at the top
            XLSX.utils.sheet_add_aoa(worksheet, [[`Result Sheet for ${session.name}`]], { origin: 0 });

            // Optional: set column widths
            worksheet["!cols"] = [
                { wch: 15 }, // Session
                { wch: 20 }, // Semester
                { wch: 30 }, // Course
                { wch: 10 }, // Load
                { wch: 10 }, // Grade
            ];

            // Append worksheet to workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, `Result - ${session.name}`);
        });

        XLSX.writeFile(workbook, `Result for ${name}.xlsx`);
    };

    return (
        <>
            {userData.sessions.length !== 0 && (
                <button
                    className="bg-blue-500 text-white cursor-pointer py-2 px-4 rounded-sm hover:bg-blue-600 transition-colors"
                    onClick={exportExcel}>
                    Download Exported Result
                </button>
            )}
        </>
    );
}
