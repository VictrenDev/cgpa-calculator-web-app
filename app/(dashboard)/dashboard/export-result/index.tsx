"use client";
import * as XLSX from "xlsx";

export default function ExportResultPage({ data }) {
    let rows = [];
    let name = [data.firstName, data.lastName].filter(Boolean).join(" ");
    data.sessions.forEach((session) => {
        session.semester.forEach((semester) => {
            semester.courses.forEach((course) => {
                rows.push({
                    Session: session.name,
                    Semester: semester.name,
                    Course: course.courseTitle,
                    Load: course.courseLoad,
                    Grade: course.grade,
                });
            });
        });
    });
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `Result Sheet for ${name}`);
        XLSX.writeFile(workbook, `Result for ${name}.xlsx`);
    };
    return (
        <div>
            <button onClick={exportExcel}>Download exported result</button>
        </div>
    );
}
