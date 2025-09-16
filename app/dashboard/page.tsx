import { Suspense } from "react";

import DashboardSkeleton from "@/components/Dashboard Skeleton UI/DashboardSkeleton";
import Dashboard from "./Dashboard";

export default function Page() {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
        </Suspense>
    );
}
