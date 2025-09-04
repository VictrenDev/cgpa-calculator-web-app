import { getServerSession } from "next-auth";
import ExportResultPage from ".";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export default async function Page() {
    const userSessionData = await getServerSession(authOptions);
    if (!userSessionData) {
        throw new Error("User must be signed in first");
    }
    const userData = await prisma.user.findUnique({
        where: { id: userSessionData.user.id },
        include: { sessions: { include: { semester: { include: { courses: true } } } } },
    });
    // if (!userExists) {
    //     throw new Error("User must be signed in first");
    // }
    // console.log(userData);
    return <ExportResultPage data={userData} />;
}
