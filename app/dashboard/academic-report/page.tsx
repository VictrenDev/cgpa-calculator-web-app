"use client"
import {
    BookOpenText,
    GraduationCap,
    Calendar,
    LineChart,
    LibraryBig,
    Award,
    Gauge,
    ScrollText,
    PieChart,
    List,
    ArrowUp,
    TrendingUp,
    Download,
    Printer,
    Calculator,
} from "lucide-react"

export default function AcademicReportPage() {
    // Sample data - replace with real data
    const cgpaData = [
        { semester: "2021/1", gpa: 3.2 },
        { semester: "2021/2", gpa: 3.4 },
        { semester: "2022/1", gpa: 3.5 },
        { semester: "2022/2", gpa: 3.6 },
        { semester: "2023/1", gpa: 3.7 },
        { semester: "2023/2", gpa: 3.72 },
    ]

    const gradeData = [
        { grade: "A", count: 12, color: "text-green-600" },
        { grade: "B+", count: 8, color: "text-blue-600" },
        { grade: "B", count: 5, color: "text-yellow-600" },
        { grade: "C+", count: 3, color: "text-orange-600" },
    ]

    const transcriptData = [
        { code: "EE 401", title: "Power Systems", credits: 3, grade: "A", semester: "2023/2" },
        { code: "EE 402", title: "Control Systems", credits: 3, grade: "B+", semester: "2023/2" },
        {
            code: "MATH 405",
            title: "Advanced Calculus",
            credits: 4,
            grade: "A",
            semester: "2023/1",
        },
        // Add more courses...
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header */}
            <header className="mb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                            <ScrollText className="text-blue-600" />
                            Academic Report
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Detailed overview of your academic performance and progress
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50">
                            <Download className="w-4 h-4" />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-50">
                            <Printer className="w-4 h-4" />
                            <span className="hidden sm:inline">Print</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Summary Cards */}
                <div className="space-y-6">
                    {/* Student Profile Card */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                                VO
                            </div>
                            <div>
                                <h2 className="font-bold text-lg">Victor Odoi</h2>
                                <p className="text-gray-600 text-sm">Electronic Engineering</p>
                                <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium">
                                    First Class Standing
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="space-y-1">
                                <p className="text-gray-500 flex items-center gap-1">
                                    <BookOpenText className="w-4 h-4" />
                                    University
                                </p>
                                <p className="font-medium">KNUST</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 flex items-center gap-1">
                                    <GraduationCap className="w-4 h-4" />
                                    Expected Graduation
                                </p>
                                <p className="font-medium">May 2025</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 flex items-center gap-1">
                                    <LibraryBig className="w-4 h-4" />
                                    Advisor
                                </p>
                                <p className="font-medium">Dr. Mensah</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 flex items-center gap-1">
                                    <Gauge className="w-4 h-4" />
                                    Grading Scale
                                </p>
                                <p className="font-medium">4.0 Scale</p>
                            </div>
                        </div>
                    </div>

                    {/* CGPA Summary Card */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                            <LineChart className="text-blue-600" />
                            CGPA Overview
                        </h3>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="space-y-1">
                                <p className="text-gray-500 text-sm">Current</p>
                                <p className="text-3xl font-bold text-green-600">3.72</p>
                                <p className="text-xs text-gray-500">/4.0</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 text-sm">This Semester</p>
                                <p className="text-2xl font-bold text-blue-600">3.85</p>
                                <p className="text-xs flex items-center justify-center text-green-600">
                                    <ArrowUp className="w-3 h-3" /> +0.13
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-500 text-sm">Target</p>
                                <p className="text-2xl font-bold text-purple-600">3.80</p>
                                <p className="text-xs text-gray-500">First Class</p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                To reach target:
                            </p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>Credits needed:</span>
                                    <span className="font-medium">16</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span>Average required:</span>
                                    <span className="font-medium">3.8 GPA</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Semester Progress Card */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                            <Calendar className="text-blue-600" />
                            Semester Progress
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Credits Completed:</span>
                                    <span className="font-medium">72/128 (56%)</span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: "56%" }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Current Semester:</span>
                                    <span className="font-medium">2023/2024 - 2nd</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Next Semester:</span>
                                    <span className="font-medium">2024/2025 - 1st</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Column - Charts & Performance */}
                <div className="space-y-6">
                    {/* CGPA Progress Chart */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                            <TrendingUp className="text-blue-600" />
                            CGPA Trend
                        </h3>

                        <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center text-gray-400">
                            [Line Chart Visualization]
                            {/* Replace with actual chart component */}
                        </div>

                        <div className="mt-3 flex justify-between text-xs text-gray-500">
                            <span>Start: 3.2</span>
                            <span>Current: 3.72</span>
                            <span>Change: +0.52</span>
                        </div>
                    </div>

                    {/* Grade Distribution Chart */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                            <PieChart className="text-blue-600" />
                            Grade Distribution
                        </h3>

                        <div className="h-48 flex items-center justify-center bg-gray-50 rounded-md text-gray-400">
                            [Donut Chart Visualization]
                            {/* Replace with actual chart component */}
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                            {gradeData.map((item) => (
                                <div key={item.grade} className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                                    <span>{item.grade}:</span>
                                    <span className="font-medium">{item.count} courses</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Course Details */}
                <div className="space-y-6">
                    {/* Recent Semester Performance */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                            <Award className="text-blue-600" />
                            Recent Semester
                        </h3>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">2023/2024 - 2nd Semester</span>
                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    3.85 GPA
                                </span>
                            </div>

                            <div className="space-y-2">
                                {transcriptData
                                    .filter((c) => c.semester === "2023/2")
                                    .map((course) => (
                                        <div
                                            key={course.code}
                                            className="flex justify-between text-sm border-b pb-2 border-gray-100">
                                            <div>
                                                <span className="font-medium">{course.code}</span>
                                                <span className="text-gray-500 ml-2">
                                                    {course.title}
                                                </span>
                                            </div>
                                            <div className="flex gap-4">
                                                <span className="text-gray-500">
                                                    {course.credits} cr
                                                </span>
                                                <span
                                                    className={`font-bold ${
                                                        course.grade === "A"
                                                            ? "text-green-600"
                                                            : course.grade === "B+"
                                                            ? "text-blue-600"
                                                            : "text-yellow-600"
                                                    }`}>
                                                    {course.grade}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Credit Completion Tracker */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
                            <Calculator className="text-blue-600" />
                            Credit Tracker
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Core Courses:</span>
                                    <span className="font-medium">48/60 (80%)</span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: "80%" }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Electives:</span>
                                    <span className="font-medium">24/48 (50%)</span>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: "50%" }}></div>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <div className="flex justify-between font-medium">
                                    <span>Total:</span>
                                    <span>72/128 (56%)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                                <Calculator className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="text-sm">GPA Calculator</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                                <BookOpenText className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="text-sm">Course Plan</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                                <GraduationCap className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="text-sm">Graduation Check</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                                <Download className="w-5 h-5 text-blue-600 mb-1" />
                                <span className="text-sm">Export Data</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Complete Transcript Section */}
            <div className="mt-10 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <List className="text-blue-600" />
                        Complete Transcript
                    </h3>
                    <div className="flex gap-2">
                        <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
                            <option>All Semesters</option>
                            <option>2023/2024</option>
                            <option>2022/2023</option>
                        </select>
                        <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            PDF
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left border-b border-gray-200">
                            <tr>
                                <th className="pb-2 font-medium">Code</th>
                                <th className="pb-2 font-medium">Course Title</th>
                                <th className="pb-2 font-medium text-center">Credits</th>
                                <th className="pb-2 font-medium text-center">Grade</th>
                                <th className="pb-2 font-medium">Semester</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {transcriptData.map((course) => (
                                <tr key={course.code}>
                                    <td className="py-3 font-medium">{course.code}</td>
                                    <td>{course.title}</td>
                                    <td className="text-center">{course.credits}</td>
                                    <td
                                        className={`text-center font-bold ${
                                            course.grade === "A"
                                                ? "text-green-600"
                                                : course.grade === "B+"
                                                ? "text-blue-600"
                                                : "text-yellow-600"
                                        }`}>
                                        {course.grade}
                                    </td>
                                    <td>{course.semester}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
