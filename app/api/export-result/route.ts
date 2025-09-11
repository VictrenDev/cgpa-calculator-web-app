    import { getServerSession } from "next-auth";
    import { authOptions } from "@/lib/authOptions";
    import { prisma } from "@/lib/prisma";
    import { NextResponse } from "next/server";

    export async function GET() {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Not signed in" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { sessions: { include: { semester: { include: { courses: true } } } } },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    }
