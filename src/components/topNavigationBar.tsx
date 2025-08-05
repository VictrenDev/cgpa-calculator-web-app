"use client"
import LogoutUser from "./logoutScreen"
export default function TopNavigationBar() {
    return (
        <section className=" bg-[#fafafa] px-8 py-4 mb-4 ">
            <div className="w-full flex gap-2 justify-end items-center container-fluid">
                <LogoutUser />
            </div>
        </section>
    )
}
