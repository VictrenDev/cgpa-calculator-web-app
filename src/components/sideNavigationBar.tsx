import NavLinks from "./navLinks"
export default function MainNavigationBar() {
    return (
        <nav
            id="navbar"
            className="bg-gray-50 h-screen w-[80%] md:w-70 overflow-y-auto p-4 flex-shrink-0 md:-translate-x-0 -translate-x-full transition-transform duration-400 ease-in-out fixed z-50 md:static">
            <p className="text-center text-xl font-semibold mt-4 relative">
                SmartGPA
                <button
                    id="closeNavBar"
                    className="md:hidden absolute h-10 w-10 -top-4 right-8 p-3 hover:cursor-pointer ">
                    <div className=" bg-white rounded-sm w-6 h-[3px] absolute rotate-45"></div>
                    <div className="bg-white rounded-sm w-6 h-[3px] absolute -rotate-45"></div>
                </button>
            </p>
            {/* Navigation for Dashboard Section  */}
            <div className="mt-6">
                <p className="text-gray-500 text-sm mb-2">Dashboard</p>
                <ul className="space-y-2">
                    <NavLinks link="Summary" icon="/icons/home-icon.svg" />

                    <NavLinks link="Sessions" icon="/icons/home-icon.svg" />
                    <NavLinks link="Semesters" icon="/icons/home-icon.svg" />
                </ul>
            </div>
            {/*  Navigation for User Account Section  */}
            <div className="mt-6">
                <p className="text-gray-500 text-sm mb-2">User Account</p>
                <ul className="space-y-2">
                    <NavLinks link="Settings" icon="/icons/home-icon.svg" />
                    <NavLinks link="Account" icon="/icons/home-icon.svg" />
                    <NavLinks link="Log Out" icon="/icons/home-icon.svg" />
                </ul>
            </div>
        </nav>
    )
}
