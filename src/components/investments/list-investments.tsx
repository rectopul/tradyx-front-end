import { useUser } from "@/contexts/UserProvider";
import { InvestmentResume } from "./investment-resume";

export function ListInvestments() {
    const { purchases } = useUser();

    return (
        <div className="w-full flex flex-col font-space gap-1">
            <h2 className="text-tradyx-200 font-semibold text-xl mb-2">
                Planos adquiridos
            </h2>

            {purchases && purchases.map((p) => <InvestmentResume p={p} />)}
        </div>
    );
}
