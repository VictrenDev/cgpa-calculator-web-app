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
    return (
        <tr className="odd:bg-white even:bg-gray-100 whitespace-nowrap text-gray-600 result-table-row-style">
            <td>{id}</td>
            <td className="capitalize">{courseTitle}</td>
            <td className="uppercase">{courseCode}</td>
            <td>{courseLoad}</td>
            <td className="uppercase">{grade}</td>
            <td>{calculated}</td>
            <td></td>
        </tr>
    )
}
