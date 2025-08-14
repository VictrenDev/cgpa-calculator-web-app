import { getServerSession } from "next-auth"
import { accountSettings } from "../actions/actions"
import MainSettingsPage from "./main-page"
import { authOptions } from "@/lib/authOptions"

export default async function SettingsPage() {
    const data = await accountSettings()
    const session = await getServerSession(authOptions)
    console.log(session)

    console.log(data)
    return <MainSettingsPage data={data} />
}
