import MainSettingsPage from "./main-page";
import { Suspense } from "react";
import ProfileSkeleton from "./ProfileSkeleton";
import { accountSettings } from "../actions/actions";
import Profile from "./profile";
import { setTimeout } from "timers/promises";

export default function SettingsPage() {
    async function ProfilePage() {
        await setTimeout(3000);
        const data = await accountSettings();
        return <Profile data={data} />;
    }
    return <MainSettingsPage renderProfile={<Suspense fallback={<ProfileSkeleton />}>{ProfilePage()}</Suspense>} />;
}
