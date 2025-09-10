"use server";

import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

export const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return { error: "theres no user with this session" };
    }
    const user = await prisma.user.findUnique({ where: { email: session?.user?.email } });
    if (!user || !user.password) {
        return { error: "no user exists" };
    }

    const isCurrentPasswordValid = await bcrypt.compare(data.currentPassword, user.password);

    if (!isCurrentPasswordValid) {
        return { error: "Current password is incorrect" };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    // Update password in database
    await prisma.user.update({
        where: { email: session.user.email },
        data: { password: hashedPassword },
    });
};
