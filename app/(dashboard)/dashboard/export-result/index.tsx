"use client";
import * as XLSX from "xlsx";

export default function ExportResultPage() {
    const exportExcel = () => {
        const data = [
            { name: "ictor", index: 1 },
            { name: "Maya", index: 2 },
        ];
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
        XLSX.writeFile(workbook, "Results.xlsx");
    };
    return (
        <div>
            <button onClick={exportExcel}>Download exported result</button>
        </div>
    );
}
