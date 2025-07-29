"use client"
import ScrollEffect from "@/components/intersectionObserver"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navItems = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/features" },
        { name: "How to Use", href: "/how-to-use" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-8">
                    {/* Logo */}
                    <Link className="text-xl font-bold" href="/">
                        Logo
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex gap-6">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-gray-700 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
                            href="/signup">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Button */}
                    <button
                        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu">
                        <svg className="w-6 h-6" fill="none" stroke="#fff" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden px-4 sm:px-6 lg:px-8 pb-4">
                        <ul className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="block py-2 hover:text-gray-700 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    className="block bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
                                    href="/signup"
                                    onClick={() => setIsMenuOpen(false)}>
                                    Get Started
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>

            {/* HERO SECTION */}
            <header className="py-12 md:py-20">
                <ScrollEffect
                    as="h1"
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Welcome to Your Student Dashboard – Track Your Academic Journey Effortlessly
                </ScrollEffect>
                <ScrollEffect as="p" delay={100} className="mt-4 text-lg md:text-xl text-gray-600">
                    Stay updated with your grades, progress, and academic goals all in one place.
                </ScrollEffect>
                <ScrollEffect
                    as="div"
                    delay={200}
                    className="mt-8 md:mt-12 h-60 md:h-96 w-full bg-gray-200 rounded-lg"></ScrollEffect>
            </header>

            {/* FEATURES */}
            <section className="py-12 md:py-20 lg:py-32">
                <ScrollEffect
                    as="p"
                    className="text-sm mb-2 md:mb-4 uppercase tracking-wider text-gray-500">
                    Features
                </ScrollEffect>
                <ScrollEffect
                    as="h2"
                    delay={100}
                    className="text-2xl md:text-4xl lg:text-5xl mb-4 font-bold">
                    Explore the Key Features of Our Application
                </ScrollEffect>
                <ScrollEffect as="p" delay={200} className="pb-6 text-lg text-gray-600">
                    Our CGPA Calculator offers a comprehensive overview of your academic
                    performance. With interactive charts and summary cards, you can easily track
                    your progress and set achievable goals.
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
                    ].map((feature, idx) => (
                        <ScrollEffect
                            as="div"
                            key={feature.title}
                            delay={idx * 200}
                            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-gray-200 w-full h-48 rounded-lg"></div>
                            <p className="mt-6 font-semibold text-xl md:text-2xl">
                                {feature.title}
                            </p>
                            <p className="mt-2 md:mt-4 text-gray-600">{feature.desc}</p>
                        </ScrollEffect>
                    ))}
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-12 md:py-20 items-center">
                <div>
                    <ScrollEffect
                        as="h2"
                        className="text-2xl md:text-4xl lg:text-5xl pb-4 md:pb-6 font-bold">
                        Join Our CGPA Calculator Today
                    </ScrollEffect>
                    <ScrollEffect as="p" delay={100} className="pb-4 md:pb-6 text-lg text-gray-600">
                        Track your academic performance effortlessly and achieve your goals with our
                        intuitive tool.
                    </ScrollEffect>
                    <ScrollEffect as="div" delay={200} className="flex flex-wrap gap-4">
                        <Link
                            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
                            href="/signup">
                            Get Started
                        </Link>
                        <Link
                            className="border border-black text-black py-2 px-6 rounded-md hover:bg-gray-100 transition-colors"
                            href="/learn-more">
                            Learn More
                        </Link>
                    </ScrollEffect>
                </div>

                <ScrollEffect
                    as="div"
                    className="bg-gray-200 h-64 md:h-80 rounded-lg"></ScrollEffect>
            </section>
        </div>
    )
}
