import TableRowData, { TableRowProps } from "@/components/tableRow"

export default function ResultsTable({
    level,
    title,
    gpa,
    courses,
}: {
    level: number
    title: string
    gpa: number
    courses: TableRowProps[]
}) {
    return (
        <div className="w-screen overflow-x-auto container">
            <table className="table-fixed min-w-full border-collapse border my-4 border-gray-300 border-spacing-4">
                <caption className="caption-top mt-2 mb-4 text-md text-gray-500 font-bold">
                    {level} {title} Semester Results | GPA: <strong>{gpa}</strong>
                </caption>
                <thead>
                    <tr>
                        <th className="border border-gray-300 text-gray-700 py-2.5 px-2 whitespace-nowrap">
                            S/N
                        </th>
                        <th className="border border-gray-300 text-gray-700 py-2.5 px-2">
                            Course Title
                        </th>
                        <th className="border border-gray-300 text-gray-700 py-2.5 px-2">
                            Course Code
                        </th>
                        <th className="border border-gray-300 text-gray-700 py-2.5 px-2">
                            Credit Unit
                        </th>
                        <th className="border border-gray-300 text-gray-700 py-2.5 px-2">Grade</th>
                        <th className="border border-gray-300 text-gray-700 py-2.5 px-2">Points</th>
                        <th className="border border-gray-300 text-gray-700 py-2.5 px-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <TableRowData key={index} {...course} id={index + 1} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
