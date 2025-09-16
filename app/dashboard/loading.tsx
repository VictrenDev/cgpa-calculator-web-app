export const DashboardSkeleton = () => {
    return (
        <>
            <div className="flex justify-end font-medium m-8 px-4 container-fluid">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded-2xl py-1 px-3 w-40 md:w-48"></div>
                </div>
            </div>
            <div className="max-w-7xl m-auto p-6 rounded-lg shadow-lg bg-white animate-pulse">
                {/* Header section */}
                <div className="flex justify-between items-center w-full">
                    <div className="grid gap-2">
                        <div className="h-6 bg-gray-200 rounded w-40 md:w-48"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded-2xl w-20"></div>
                </div>

                {/* Stats section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                    {/* Total Semesters */}
                    <div className="bg-gray-100 flex-1 flex flex-col py-6 rounded-md px-4 gap-2">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                        <div className="h-6 bg-gray-200 rounded w-10"></div>
                    </div>

                    {/* Total Courses */}
                    <div className="bg-gray-100 flex-1 flex flex-col py-6 rounded-md px-4 gap-2">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                        <div className="h-6 bg-gray-200 rounded w-10"></div>
                    </div>

                    {/* Session GPA */}
                    <div className="bg-gray-100 flex-1 flex flex-col py-6 rounded-md px-4 gap-2">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                        <div className="flex gap-4">
                            {[1, 2].map((item) => (
                                <div key={item} className="grid gap-1">
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Session CGPA */}
                    <div className="bg-gray-100 flex-1 flex flex-col py-6 rounded-md px-4 gap-2">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                        <div className="h-6 bg-gray-200 rounded w-10"></div>
                    </div>
                </div>

                {/* Button skeleton */}
                <div className="h-10 bg-gray-200 rounded-md w-32 mt-10"></div>
            </div>
        </>
    );
};
export default DashboardSkeleton;
