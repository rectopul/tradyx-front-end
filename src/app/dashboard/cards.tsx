import { TotalDeposits } from "@/admin/dashboard/TotalDeposits";
import { AssetTotalCard, MembersCard } from "@/components/admin/AssetTotalCard";

export function DashboardCards() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <TotalDeposits />
                <AssetTotalCard />
                <MembersCard />
            </div>
        </div>
    );
}
