import ScrollEffect from "@/components/intersectionObserver"
import Link from "next/link"

export default function Home() {
    return (
        <>
            <nav className=" mb-8">
                <div className="container-fluid flex justify-between items-center">
                    <Link className="inline-block" href="/">logo</Link>
                    <ul className="flex gap-2">
                        <li><Link className="inline-block p-6 bg-gray-300" href="/">HOME</Link></li>
                        <li><Link className="inline-block p-6 bg-gray-300" href="/">HOME</Link></li>
                        <li><Link className="inline-block p-6 bg-gray-300" href="/">HOME</Link></li>
                        <li><Link className="inline-block p-6 bg-gray-300" href="/">HOME</Link></li>
                        <li><Link className="inline-block p-6 bg-gray-300" href="/">HOME</Link></li>
                    </ul>
                    <Link className="inline-block" href="/signup">Get Started</Link>

                </div>
            </nav>
            <header className="container-fluid py-8">
                <ScrollEffect as="h1" className="lg:w-130 text-4xl md:text-5xl font-bold text-gray-900 leading-[1.2]">Welcome to Your Student Dashboard – Track Your Academic Journey Effortlessly</ScrollEffect>
                <ScrollEffect as="p" delay={100} className="mt-4">Stay updated with your grades, progress, and academic goals all in one place.</ScrollEffect>
                <ScrollEffect as="div" delay={200} className="mt-12 h-80 md:h-120 w-full bg-gray-300"></ScrollEffect>
            </header>
            <section className="container-fluid py-20">
                <p className="text-sm mb-4">Features</p>
                <h2 className="text-3xl md:text-4xl max-w-120 mb-4 font-bold">Explore the Key Features of Our Application</h2>
                <p className="lg:w-150 pb-6">Our CGPA Calculator offers a comprehensive overview of your academic performance. With interactive charts and summary cards, you can easily track your progress and set achievable goals.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6 mt-8">
                    <div className="">
                        <div className="bg-gray-300 w-full h-60" ></div>
                        <p className="mt-8 font-semibold text-2xl">Real-Time Academic Performance Tracking</p>
                        <p className="mt-4">Stay updated with your current GPA and CGPA.</p>
                    </div>
                    <div className="">
                        <div className="bg-gray-300 w-full h-60" ></div>
                        <p className="mt-8 font-semibold text-2xl">Visual Grade Distribution Insights</p>
                        <p className="mt-4">Visual Grade Distribution Insights</p>
                    </div>
                    <div className="">
                        <div className="bg-gray-300 w-full h-60" ></div>
                        <p className="mt-8 font-semibold text-2xl">Recent Course Activity Overview</p>
                        <p className="mt-4">Easily view your recently added courses.</p>
                    </div>
                </div>
            </section>

            <section className="container-fluid py-40 grid md:grid-cols-[350px_1fr] gap-12">
                <div>
                    <p className="text-sm mb-4">Features</p>
                    <h2 className="text-4xl  mb-4 font-bold">Explore the Key Features of Our Application</h2>
                    <p className="">Our CGPA Calculator offers a comprehensive overview of your academic performance. With interactive charts and summary cards, you can easily track your progress and set achievable goals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="">
                        <p className="">icon</p>
                        <p className="mt-8 font-semibold text-2xl">Real-Time Academic Performance Tracking</p>
                        <p className="mt-4">Stay updated with your current GPA and CGPA.</p>
                    </div>
                    <div className="">
                        <p className="">icon</p>
                        <p className="mt-8 font-semibold text-2xl">Visual Grade Distribution Insights</p>
                        <p className="mt-4">Visual Grade Distribution Insights</p>
                    </div>
                    <div className="">
                        <p className="">icon</p>
                        <p className="mt-8 font-semibold text-2xl">Recent Course Activity Overview</p>
                        <p className="mt-4">Easily view your recently added courses.</p>
                    </div>
                    <div className="">
                        <div className="bg-gray-300" ></div>
                        <p className="mt-8 font-semibold text-2xl">Recent Course Activity Overview</p>
                        <p className="mt-4">Easily view your recently added courses.</p>
                    </div>
                </div>
            </section>

            <section className="container-fluid py-12 lg:py-20">
                <h2 className="text-4xl lg:w-170 mb-4 font-bold">Comprehensive Academic Insights at Your Fingertips</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-4 gap-12 pt-20">
                    <div className="lg:grid lg:grid-rows-subgrid lg:row-start-1 lg:row-end-5 lg:gap-4">
                        <p>icon</p>
                        <p className=" font-semibold text-xl">Track Your Progress and Achieve Your Academic Goals</p>
                        <p className=" ">Our CGPA Calculator provides real-time updates on your academic performance.</p>
                        <Link href="/" className="">Explore</Link>
                    </div>
                    <div className="lg:grid lg:grid-rows-subgrid lg:row-start-1 lg:row-end-5 lg:gap-4">
                        <p>icon</p>
                        <p className="font-semibold text-xl ">Visualise Your Academic Journey with Interactive Charts</p>
                        <p className=" ">Engage with dynamic charts that illustrate your grade distribution and progress.</p>
                        <Link href="/" className="">Explore</Link>
                    </div>
                    <div className="lg:grid lg:grid-rows-subgrid lg:row-start-1 lg:row-end-5 lg:gap-4">
                        <p>icon</p>
                        <p className=" font-semibold text-xl ">Stay Updated with Recent Course Activities</p>
                        <p className=" ">Easily access your recently added courses and monitor your academic journey.</p>
                        <Link href="/" className="">Explore</Link>
                    </div>
                </div>
            </section>

            <section className="container-fluid grid grid-cols-1 md:grid-cols-2 gap-8 py-20 items-center">
                <div>
                    <p className="text-sm pb-6">Features</p>
                    <h2 className="text-4xl pb-6 font-bold">Explore the Key Features of Our Application</h2>
                    <p className=" pb-6">Our CGPA Calculator offers a comprehensive overview of your academic performance. With interactive charts and summary cards, you can easily track your progress and set achievable goals.</p>
                    <div className="space-x-2">
                        <Link className="inline-block bg-gray-100 py-2 px-4 rounded-xs text-sm" href="/">logo</Link>
                        <Link className="inline-block bg-gray-100 py-2 px-4 rounded-xs text-sm" href="/">logo</Link>

                    </div>
                </div>

                <div className="bg-gray-300 h-120">

                </div>
            </section>
            <section className="container-fluid grid grid-cols-1 md:grid-cols-2 gap-8 py-20 items-center">
                <div>
                    <h2 className="text-4xl pb-6 font-bold">Explore the Key Features of Our Application</h2>
                    <p className=" pb-6">Our CGPA Calculator offers a comprehensive overview of your academic performance. With interactive charts and summary cards, you can easily track your progress and set achievable goals.</p>
                    <div className="space-x-2">
                        <Link className="inline-block bg-gray-100 py-2 px-4 rounded-xs text-sm" href="/">logo</Link>
                        <Link className="inline-block bg-gray-100 py-2 px-4 rounded-xs text-sm" href="/">logo</Link>

                    </div>
                </div>

                <div className="bg-gray-300 h-80">

                </div>
            </section>

            <section className="flex flex-col items-center justify-center">

                <Link
                    href="/login"
                    className="inline-block font-semibold border border-gray-300 rounded-md py-2 px-4 mt-8 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors duration-200 ease-in-out ">
                    Start Calculating
                </Link>
            </section>
        </>
    )
}
