import { accountSettings } from "../actions/actions"
import MainSettingsPage from "./main-page"

export default async function SettingsPage() {
    const data = await accountSettings()
    console.log(data)
    return <MainSettingsPage data={data} />
}
