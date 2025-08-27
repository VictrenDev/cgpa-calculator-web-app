import { toast } from "sonner";
import { getSessionYears } from "../actions/actions";
import CreateCoursesPage from "./index";

export default async function Page() {
    const { startYear, courseDuration } = await getSessionYears();

    if (!startYear || !courseDuration) {
        return toast.error("Please Fill in Academic Details");
    }
    return (
        <>
            <CreateCoursesPage startYear={startYear} courseDuration={courseDuration} />;
        </>
    );
}
