import { accountSettings } from "../actions/actions";
import MainSettingsPage from "./main-page";

export default async function SettingsPage() {
    const data = await accountSettings();
    return <MainSettingsPage data={data} />;
}
