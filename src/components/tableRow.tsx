import MenuActions from "./menuAction"

export interface TableRowProps {
    id?: number
    courseTitle: string
    courseCode: string
    courseLoad: number
    grade: "a" | "b" | "c" | "d" | "e" | "f"
    calculated: number
}

export default function TableRowData({
    id,
    courseTitle,
    courseCode,
    courseLoad,
    grade,
    calculated,
}: TableRowProps) {
    const gradeColor = {
        a: "bg-green-100 text-green-800",
        b: "bg-blue-100 text-blue-800",
        c: "bg-yellow-100 text-yellow-800",
        d: "bg-orange-100 text-orange-800",
        e: "bg-red-100 text-red-800",
        f: "bg-red-100 text-red-800",
    }[grade]

    return (
        <tr className="hover:bg-gray-50 result-table-row-style">
            <td className="">{id}</td>
            <td className="font-medium capitalize">{courseTitle}</td>
            <td className="font-medium uppercase">{courseCode}</td>
            <td className="text-center">{courseLoad}</td>
            <td className="text-center">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gradeColor}`}>
                    {grade.toUpperCase()}
                </span>
            </td>
            <td className="text-center">{calculated}</td>
            <td className="text-center">
                <MenuActions edit="edit text" remove="remove text" />
            </td>
        </tr>
    )
}
