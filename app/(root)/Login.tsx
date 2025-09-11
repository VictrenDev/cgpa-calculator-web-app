"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GetStartedButton() {
    const { data: session, status } = useSession();

    // While loading, don’t redirect
    if (status === "loading") {
        return <button className="block bg-gray-500 text-white py-2 px-6 rounded-md">Loading...</button>;
    }

    const href = session ? "/dashboard" : "/auth/login";

    return (
        <Link className="block bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors" href={href}>
            {session ? "Go to Dashboard" : "Get Started"}
        </Link>
    );
}
