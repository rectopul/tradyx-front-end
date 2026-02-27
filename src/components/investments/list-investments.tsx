import { useUser } from "@/contexts/UserProvider";
import { InvestmentResume } from "./investment-resume";

export function ListInvestments() {
    const { purchases } = useUser();

    return (
        <div className="w-full flex flex-col gap-3">
            {purchases && purchases.length > 0 ? (
                purchases.map((p, idx) => <InvestmentResume key={idx} p={p} />)
            ) : (
                <div className="text-center py-10 bg-white rounded-[32px] border border-gray-100 shadow-sm">
                    <p className="text-gray-400 font-medium text-sm">Você ainda não possui planos ativos.</p>
                </div>
            )}
        </div>
    );
}
