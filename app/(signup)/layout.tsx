import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "/app/globals.css"

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--font-plus-jakarta",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={plusJakarta.className}>
            <body>{children}</body>
        </html>
    )
}
