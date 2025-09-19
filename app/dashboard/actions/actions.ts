"use server";

import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getUserAcademicStats = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/login");
    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            academicProfile: {
                select: {
                    universityName: true,
                    departmentName: true,
                    gradePointSystem: true,
                    startYear: true,
                    courseDuration: true,
                },
            },
            sessions: {
                select: {
                    semester: {
                        select: {
                            name: true,
                            createdAt: true,
                            courses: {
                                select: { courseLoad: true, grade: true },
                            },
                            _count: {
                                select: {
                                    courses: {
                                        where: {
                                            grade: {
                                                in: ["A", "B", "C"],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    // Flatten courses for CGPA calculation
    const allCourses = user?.sessions.flatMap((s) => s.semester.flatMap((sem) => sem.courses)) ?? [];

    // Determine latest semester
    const allSemesters = user?.sessions.flatMap((s) => s.semester) ?? [];
    const currentSemester = allSemesters.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]?.name ?? "";

    // Get total count of courses C and above (sum from all semesters)
    const coursesCAndAbove = allSemesters.reduce((sum, sem) => sum + (sem._count.courses ?? 0), 0);

    // CGPA calculation
    const gradeMap5 = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
    const gradeMap4 = { A: 4, B: 3, C: 2, D: 1, F: 0 };
    const gradeMap = user?.academicProfile?.gradePointSystem === 5 ? gradeMap5 : gradeMap4;

    let totalPoints = 0;
    let totalLoad = 0;
    for (const course of allCourses) {
        const gradePoint = gradeMap[course.grade as keyof typeof gradeMap] ?? 0;
        totalPoints += gradePoint * course.courseLoad;
        totalLoad += course.courseLoad;
    }
    const cgpa = totalLoad > 0 ? totalPoints / totalLoad : 0;

    return {
        cgpa,
        coursesCAndAbove,
        allCourses,
        currentSemester,
        user,
    };
};
export const accountSettings = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) redirect("/login");
    if (!session.user.email) {
        throw new Error("No session with this email is found");
    }
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            academicProfile: {
                select: {
                    universityName: true,
                    departmentName: true,
                },
            },
        },
    });
    if (!user) {
        throw new Error("No user found");
    }

    return {
        user: {
            firstName: user.firstName ?? "",
            lastName: user.firstName ?? "",
            email: user.email,
            academicProfile: user.academicProfile ?? {
                universityName: "",
                departmentName: "",
            },
        },
    };
};

export const updateProfileInfo = async (formData: FormData) => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");

    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    // const email = formData.get("email")?.toString().trim()
    const universityName = formData.get("universityName")?.toString().trim();
    const departmentName = formData.get("departmentName")?.toString().trim();

    // Update user and academicProfile
    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            firstName,
            lastName,
            academicProfile: {
                update: {
                    universityName,
                    departmentName,
                },
            },
        },
    });
    revalidatePath("/dashboard/account-setting");
};
export const updateAcademicInfo = async (formData: FormData) => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) throw new Error("Unauthorized");

    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const universityName = formData.get("universityName")?.toString().trim();
    const departmentName = formData.get("departmentName")?.toString().trim();
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
        throw new Error("User with this email already exists");
    }
    // Update user and academicProfile
    await prisma.user.update({
        where: { email: session.user.email },
        data: {
            firstName,
            lastName,
            email,
            academicProfile: {
                update: {
                    universityName,
                    departmentName,
                },
            },
        },
    });
    revalidatePath("/dashboard/account-setting");
};

export const deleteUser = async () => {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("No user Session");
    await prisma.user.delete({ where: { id: session.user.id } });
    return redirect("/auth/login");
};

export const getSessionYears = async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) throw new Error("Not authenticated");
    const academicProfileData = await prisma.academicProfile.findUnique({
        where: { userId: session.user.id },
        select: { startYear: true, courseDuration: true },
    });
    return { startYear: academicProfileData?.startYear, courseDuration: academicProfileData?.courseDuration };
};
