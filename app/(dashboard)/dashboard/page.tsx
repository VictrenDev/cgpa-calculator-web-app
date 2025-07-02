import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { redirect } from "next/navigation"
// import LogoutButton from "@/components/signOut"
import Chart from "@/components/chartComponent"
import ScrollEffect from "@/components/intersectionObserver"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    const { firstName, lastName, email } = session.user as {
        firstName: string,
        lastName: string,
        email: string
    }
    console.log(session.user)

    return (
        <div className="bg-[#f5f5f5]">
            {/* <h1>
                Welcome {firstName || ""} {lastName || ""} ({email})
            </h1>
            <LogoutButton /> */}

            <div className=" grid grid-cols-4 grid-rows-6 gap-2 p-4">
                <ScrollEffect className="bg-[#fefefe] lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2 rounded-md p-2">
                    1
                </ScrollEffect>

                <ScrollEffect delay={200} className="bg-[#fefefe] lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3 rounded-md p-2">
                    2
                </ScrollEffect>

                <ScrollEffect delay={600} className="bg-[#fefefe] lg:row-start-2 lg:row-end-4 lg:col-start-1 lg:col-end-3 rounded-md p-2">
                    3
                </ScrollEffect>

                <ScrollEffect delay={400} className="bg-[#fefefe] lg:row-start-1 lg:row-end-4 lg:col-start-3 lg:col-end-5 rounded-md p-2 flex justify-center items-center flex-col">
                    <p className="mb-6 text-4xl text-gray-500">Grade Graph</p>
                    <Chart />
                </ScrollEffect>

                <ScrollEffect delay={800} className="bg-[#fefefe] lg:row-start-4 lg:row-end-6 lg:col-start-1 lg:col-end-5 rounded-md p-2">
                    5
                </ScrollEffect>
            </div>
        </div>
    )
}
