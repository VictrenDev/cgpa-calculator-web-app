"use client"
import { useState } from "react"
import Link from "next/link"

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navItems = [
        { name: "Home", href: "#hero" },
        { name: "Features", href: "#features" },
        // { name: "How to Use", href: "/how-to-use" },
        { name: "Contact", href: "#contact" },
    ]
    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8s py-2">
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
                                    className="hover:text-gray-700 transition-colors inline-block p-2">
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
                    className="md:hidden p-2 rounded-md hover:cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu">
                    <svg className="w-6 h-6" fill="none" stroke="#000" viewBox="0 0 24 24">
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
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}>
                                Get Started
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}
