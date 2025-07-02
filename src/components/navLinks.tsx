import Link from "next/link"
export default function NavLinks({ link, children }: { link: string; children: React.ReactNode }) {
    return (
        <Link
            className="p-3 rounded-md flex gap-1.5 items-center hover:bg-gray-200 transition-colors text-gray-800 duration-100 ease-in-out text-sm"
            href={`${link}`}>
            {children}
            <span>{link}</span>
        </Link>
    )
}
