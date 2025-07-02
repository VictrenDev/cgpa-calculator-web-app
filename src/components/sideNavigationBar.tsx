import ScrollEffect from "./intersectionObserver"
import {
    AnalyticsIcon,
    CourseManagementIcon,
    HelpIcon,
    OverviewIcon,
    ProfileIcon,
    SettingsIcon,
} from "./navigationIcons"
import NavLinks from "./navLinks"
export default function MainNavigationBar() {
    return (
        <nav
            id="navbar"
            className="bg-gray-50 h-screen w-[80%] md:w-60 overflow-y-auto p-4 flex-shrink-0 md:-translate-x-0 -translate-x-full transition-transform duration-400 ease-in-out fixed z-10 md:static">
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
                <p className="text-gray-500 text-xs font-semibold mb-2">Dashboard</p>
                <ul className="space-y-1">
                    <ScrollEffect as="li" delay={100}>
                        <NavLinks link="Overview">
                            <OverviewIcon />
                        </NavLinks>
                    </ScrollEffect>
                    <ScrollEffect as="li" delay={150}>
                        <NavLinks link="Course Manager">
                            <CourseManagementIcon />
                        </NavLinks>
                    </ScrollEffect>
                    <ScrollEffect as="li" delay={200}>

                        <NavLinks link="Analytics">
                            <AnalyticsIcon />
                        </NavLinks>
                    </ScrollEffect>
                    <ScrollEffect as="li" delay={250}>
                        <NavLinks link="Settings">
                            <SettingsIcon />
                        </NavLinks>
                    </ScrollEffect>
                    <ScrollEffect as="li" delay={300}>

                        <NavLinks link="Profile">
                            <ProfileIcon />
                        </NavLinks>       </ScrollEffect>
                    <ScrollEffect as="li" delay={350}>
                        <NavLinks link="Help / Guide">
                            <HelpIcon />
                        </NavLinks>
                    </ScrollEffect>





                </ul>
            </div>
        </nav>
    )
}
