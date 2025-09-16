import { accountSettings } from "../actions/actions";
import Profile from "./profile";

export default async function ProfilePage() {
    const data = await accountSettings();
    return <Profile data={data} />;
}
