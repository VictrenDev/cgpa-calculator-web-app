export default function Loading() {
    return (
        <div className="relative rounded-lg shadow-md bg-white mb-6 w-full max-w-6xl mx-auto animate-pulse">
            {/* Header section */}
            <div className="py-6 px-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center w-full">
                <div className="h-6 bg-gray-200 rounded w-40"></div>
                <div className="flex gap-2 items-center">
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                    <div className="h-8 bg-gray-200 rounded-xl w-16"></div>
                </div>
            </div>

            {/* Desktop Table Skeleton */}
            <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {["S/N", "Course Title", "Code", "Units", "Grade", "Points", "Action"].map((header) => (
                                <th
                                    key={header}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {[...Array(5)].map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-6"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-10 mx-auto"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-6 bg-gray-200 rounded w-10 mx-auto"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-10 mx-auto"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-8 bg-gray-200 rounded w-16 mx-auto"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards Skeleton */}
            <div className="md:hidden">
                {[...Array(3)].map((_, index) => (
                    <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="h-5 bg-gray-200 rounded w-16 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded-full w-10"></div>
                        </div>

                        <div className="mt-3 grid grid-cols-3 gap-2">
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-10 mb-1"></div>
                                <div className="h-4 bg-gray-200 rounded w-6"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-12 mb-1"></div>
                                <div className="h-4 bg-gray-200 rounded w-8"></div>
                            </div>
                            <div>
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
