"use client";
import * as XLSX from "xlsx";
import { Prisma } from "@/generated/prisma";
type UserInfo = Prisma.UserGetPayload<{
    include: { sessions: { include: { semester: { include: { courses: true } } } } };
}>;
const ExportResultPage = ({ data }: { data: UserInfo }) => {
    console.log(data);
    const name = [data.firstName, data.lastName].filter(Boolean).join(" ");

    const exportExcel = () => {
        const workbook = XLSX.utils.book_new();
        data.sessions.forEach((session) => {
            const rows = session.semester.flatMap((semester) =>
                semester.courses.map((course) => ({
                    Session: session.name,
                    Semester: semester.name,
                    Course: course.courseTitle,
                    Load: course.courseLoad,
                    Grade: course.grade,
                }))
            );
            const worksheet = XLSX.utils.json_to_sheet(rows, { skipHeader: true });
            worksheet["!cols"] = [
                { wch: 12 }, // Session
                { wch: 20 }, // Semester
                { wch: 30 }, // Course
                { wch: 5 }, // Load
                { wch: 6 }, // Grade
            ];
            // Add a title row at the top

            XLSX.utils.book_append_sheet(workbook, worksheet, `Result Sheet for ${rows[0].Session}`);
        });
        XLSX.writeFile(workbook, `Result for ${name}.xlsx`);
    };
    return (
        <div>
            <button onClick={exportExcel}>Download exported result</button>
        </div>
    );
};
export default ExportResultPage;
