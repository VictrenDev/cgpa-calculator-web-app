import TableRowData, { TableRowProps } from "@/components/tableRow"
import MenuActions from "./menuAction"

export default function ResultsTable({
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
        <>
            <div className="relative rounded-lg shadow-md bg-white mb-6 w-full max-w-6xl mx-auto bg-orange-70">
                <div className=" py-6 px-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center w-full">
                    <h2 className="md:text-lg font-medium text-gray-700">{title} Results</h2>
                    <p className="text-sm text-gray-500 mt-1 flex gap-2 items-center  ">
                        GPA:{" "}
                        <span className="font-bold bg-blue-100 py-2 px-4 rounded-xl text-blue-500">
                            {gpa.toFixed(2)}
                        </span>
                    </p>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block ">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="table-head-row-styles">
                                <th scope="col" className="">
                                    S/N
                                </th>
                                <th scope="col text-left">Course Title</th>
                                <th scope="col text-left">Code</th>
                                <th scope="col text-center">Units</th>
                                <th scope="col text-center">Grade</th>
                                <th scope="col text-center">Points</th>
                                <th scope="col text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.map((course, index) => {
                                return <TableRowData key={index} {...course} id={index + 1} />
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden">
                    {courses.map((course, index) => (
                        <MobileCourseCard key={index} {...course} gpa={gpa} />
                    ))}
                </div>
            </div>
        </>
    )
}

function MobileCourseCard({ ...course }: TableRowProps & { gpa: number }) {
    const gradeColor = {
        a: "bg-green-100 text-green-800",
        b: "bg-blue-100 text-blue-800",
        c: "bg-yellow-100 text-yellow-800",
        d: "bg-orange-100 text-orange-800",
        e: "bg-red-100 text-red-800",
        f: "bg-red-100 text-red-800",
    }[course.grade]
    return (
        <div className="p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-medium text-gray-900">
                        {course.courseCode.toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 capitalize">
                        {course.courseTitle.toUpperCase()}
                    </p>
                </div>
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gradeColor}`}>
                    {course.grade.toUpperCase()}
                </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <div>
                    <p className="text-gray-500">Units</p>
                    <p className="font-medium">{course.courseLoad}</p>
                </div>
                <div>
                    <p className="text-gray-500">Points</p>
                    <p className="font-medium">{course.calculated}</p>
                </div>
                <div>
                    <MenuActions course={course} />
                </div>
            </div>
        </div>
    )
}
