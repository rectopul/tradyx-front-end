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
            <div className="container mx-auto pt-2 pb-24 space-y-8 relative w-full">
                <div className="w-full">
                    <SummaryBar />
                </div>

                <div className="relative flex w-full">
                    <PackagesGrid
                        packages={packages}
                        onBuy={console.log}
                        label="Oportunidades de Investimento"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Organizações Populares</h2>
                        <button className="text-gray-400 font-medium hover:text-gray-600">Ver Todas</button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                         <ListInvestments />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
