import MainSettingsPage from "./main-page";
import { Suspense } from "react";
import ProfilePage from "./profilepage"; // ✅ safe import here (server → server)
import ProfileSkeleton from "./ProfileSkeleton";

export default function SettingsPage() {
    return (
        <MainSettingsPage
            renderProfile={
                <Suspense fallback={<ProfileSkeleton />}>
                    <ProfilePage />
                </Suspense>
            }
        />
    );
}
