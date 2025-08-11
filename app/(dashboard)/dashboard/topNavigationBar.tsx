import NavigationData from "./navigation"
import { getUserAcademicStats } from "./actions/actions"

export default async function NavigationBar() {
    const { user, cgpa, currentSemester, allCourses, coursesCAndAbove } =
        await getUserAcademicStats()
    return (
        <NavigationData
            user={user}
            cgpa={cgpa}
            currentSemester={currentSemester}
            totalCourses={allCourses.length}
            coursesCAndAbove={coursesCAndAbove}
        />
    )
}
