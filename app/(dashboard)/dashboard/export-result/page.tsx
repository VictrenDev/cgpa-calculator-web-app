import { getServerSession } from "next-auth";
import ExportResultPage from ".";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export default async function Page() {
    const userSessionData = await getServerSession(authOptions);
    if (!userSessionData) {
        throw new Error("User must be signed in first");
    }
    const userExists = await prisma.user.findUnique({ where: { id: userSessionData.user.id } });
    if (!userExists) {
        throw new Error("User must be signed in first");
    }
    console.log(userSessionData);
    return <ExportResultPage />;
}
