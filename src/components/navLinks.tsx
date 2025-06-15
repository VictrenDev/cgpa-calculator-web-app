import Link from "next/link"
import Image from "next/image"
export default function NavLinks({ link, icon }: { link: string; icon?: string }) {
    return (
        <li>
            <Link
                className="p-3 rounded-md flex gap-2 items-center hover:bg-gray-200 transition-colors text-gray-800 duration-100 ease-in-out"
                href={`${link}`}>
                <Image src={`${icon}`} alt="icon" width={16} height={16} />
                <span>{link}</span>
            </Link>
        </li>
    )
}
