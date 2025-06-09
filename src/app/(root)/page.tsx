import Link from "next/link"

export default function Home() {
    return (
        <>
            <section className="h-screen flex flex-col items-center justify-center">
                <div className="text-center container [&>*]:mx-auto">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                        CGPA Calculator
                    </h1>
                    <p className="md:text-2xl font-bold text-gray-800 mt-4">
                        Track your academic performance effortlessly.
                    </p>
                    <p className=" lg:w-200 text-gray-600 mt-2">
                        Our smart CGPA calculator helps students compute their
                        semester and cumulative GPA in seconds. Simple,
                        accurate, and tailored for your academic system.
                    </p>
                    <Link
                        href="/signup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-semibold border border-gray-300 rounded-md py-2 px-4 mt-8 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-200 ease-in-out ">
                        Start Calculating
                    </Link>
                </div>
            </section>
        </>
    )
}
