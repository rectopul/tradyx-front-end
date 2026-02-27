import { Purchase } from "@/types/purchase";
import { asset, formatCurrency } from "@/utils/helpers";
import { usePurchaseIncomeTracker } from "@/utils/usePurchaseIncomeTracker";
import CircularProgressImage from "../cirtular-progress-image";

interface PurchaseMinItemProps {
    purchase: Purchase;
}

export function PurchaseMinItem({ purchase }: PurchaseMinItemProps) {
    const pkg = purchase.package;

    const {
        accumulatedCurrentCycle,
        formatTime,
        timeLeftMs,
        totalCompletionPercentage,
    } = usePurchaseIncomeTracker(purchase);

    return (
        <>
            <div className="flex flex-col rounded-2xl bg-secondary-gradient gap-2 font-space p-3">
                <figure className="rounded-full h-24 w-24 mx-auto overflow-hidden">
                    <CircularProgressImage
                        imageSrc={asset("/" + pkg.photo)}
                        percentage={totalCompletionPercentage}
                    />
                </figure>
                <h4 className="text-center text-sm font-normal text-tradyx-100">
                    {pkg.name}
                </h4>
                <div className="rounded-lg bg-orange-gradient h-8 flex justify-center items-center shadow-top-inset shadow-cream-can-100 text-xs text-cream-can-50 font-semibold">
                    {formatCurrency(accumulatedCurrentCycle)} |{" "}
                    {formatTime(timeLeftMs)}
                </div>
            </div>
        </>
    );
}
