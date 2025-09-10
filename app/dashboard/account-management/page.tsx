import { prisma } from "@/lib/prisma"
import { getAcademicProfileData } from "@/lib/serverActions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import AcademicProfileForm from "../createAcademicProfile"
import { authOptions } from "@/lib/authOptions"
import AccountInformation from "./accountData"

export default async function AccountManagement() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) redirect("/login")

    // 🔍 Check for academic profile
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { academicProfile: true },
    })
    if (!user) redirect("/login")

    if (!user.academicProfile) {
        // 📄 Render academic profile creation form
        return <AcademicProfileForm userId={user.id} />
    }

    const userData = await getAcademicProfileData(user?.id)
    console.log(userData)

    return <AccountInformation {...userData} />
}
