import ScrollEffect from "@/components/intersectionObserver";
import Link from "next/link";
import NavBar from "./navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cumulative Grade Point Average Calculator",
    description: "Lorem 123",
};

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* NAVBAR */}
                <NavBar />
            {/* HERO SECTION */}
            <header className="py-12 md:py-20" id="hero">
                <ScrollEffect as="h1" className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Welcome to Your Student Dashboard – Track Your Academic Journey Effortlessly
                </ScrollEffect>
                <ScrollEffect as="p" delay={100} className="mt-4 text-lg md:text-xl text-gray-600">
                    Stay updated with your grades, progress, and academic goals all in one place.
                </ScrollEffect>
                <ScrollEffect as="div" delay={200} className="mt-8 md:mt-12 h-60 md:h-96 w-full bg-gray-200 rounded-lg"></ScrollEffect>
            </header>

            {/* FEATURES */}
            <section className="py-12 md:py-20 lg:py-32" id="features">
                <ScrollEffect as="p" className="text-sm mb-2 md:mb-4 uppercase tracking-wider text-gray-500">
                    Features
                </ScrollEffect>
                <ScrollEffect as="h2" delay={100} className="text-2xl md:text-4xl lg:text-5xl mb-4 font-bold">
                    Explore the Key Features of Our Application
                </ScrollEffect>
                <ScrollEffect as="p" delay={200} className="pb-6 text-lg text-gray-600">
                    Our CGPA Calculator offers a comprehensive overview of your academic performance. With interactive charts and summary cards, you
                    can easily track your progress and set achievable goals.
                </ScrollEffect>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-8">
                    {[
                        {
                            title: "Real-Time Academic Performance Tracking",
                            desc: "Stay updated with your current GPA and CGPA.",
                        },
                        {
                            title: "Visual Grade Distribution Insights",
                            desc: "Understand how your grades are spread across subjects.",
                        },
                        {
                            title: "Recent Course Activity Overview",
                            desc: "Easily view your recently added courses.",
                        },
                    ].map((feature, index) => (
                        <ScrollEffect
                            as="div"
                            key={feature.title}
                            delay={index * 200}
                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-gray-200 w-full h-48 rounded-lg"></div>
                            <p className="mt-6 font-semibold text-xl md:text-2xl">{feature.title}</p>
                            <p className="mt-2 md:mt-4 text-gray-600">{feature.desc}</p>
                        </ScrollEffect>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-12 md:py-20 items-center" id="contact">
                <div>
                    <ScrollEffect as="h2" className="text-2xl md:text-4xl lg:text-5xl pb-4 md:pb-6 font-bold">
                        Join Our CGPA Calculator Today
                    </ScrollEffect>
                    <ScrollEffect as="p" delay={100} className="pb-4 md:pb-6 text-lg text-gray-600">
                        Track your academic performance effortlessly and achieve your goals with our intuitive tool.
                    </ScrollEffect>
                    <ScrollEffect as="div" delay={200} className="flex flex-wrap gap-4">
                        <Link className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors" href="/auth/signup">
                            Get Started
                        </Link>
                        <Link className="border border-black text-black py-2 px-6 rounded-md hover:bg-gray-100 transition-colors" href="/learn-more">
                            Learn More
                        </Link>
                    </ScrollEffect>
                </div>

                <ScrollEffect as="div" className="bg-gray-200 h-64 md:h-80 rounded-lg"></ScrollEffect>
            </section>
        </div>
    );
}
