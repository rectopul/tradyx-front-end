import { useUser } from "@/contexts/UserProvider";
import { Popup } from "@/components/popup";
import { PackagesGrid } from "@/components/investments/packages-grid";
import { SummaryBar } from "@/components/summary-bar";
import { PurchasesSlide } from "@/components/investments/purchases-slide";
import { ListInvestments } from "@/components/investments/list-investments";

const UserDashboard = () => {
    const { user, packages } = useUser();

    if (!user) return null;

    return (
        <>
            <Popup />
            <div className="container mx-auto py-6 space-y-6 relative w-full mb-20">
                <div className="w-full">
                    <SummaryBar />
                </div>

                <PurchasesSlide />

                <div className="relative flex w-full">
                    <PackagesGrid
                        packages={packages}
                        onBuy={console.log}
                        label="Planos"
                        featured
                    />
                </div>

                <ListInvestments />
            </div>
        </>
    );
};

export default UserDashboard;
