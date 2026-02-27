import { DepositStatus } from "@/types";
import { formatStatus } from "@/utils/helpers";

export function CardStatus({ status }: { status: DepositStatus }) {
    switch (status) {
        case "approved":
            return (
                <div className="border w-[90px] border-green-600 self-start font-normal rounded-full bg-green-500/5 text-center text-green-500 text-xs py-[2px] px-2 flex items-center justify-center gap-1">
                    <span className="w-[6px] h-[6px] rounded-full bg-green-500"></span>
                    {formatStatus(status)}
                </div>
            );
        case "pending":
            return (
                <div className="border w-[90px] border-orange-500 self-start font-normal rounded-full bg-orange-500/5 text-center text-orange-500 text-xs py-[2px] px-2 flex items-center justify-center gap-1">
                    <span className="w-[6px] h-[6px] rounded-full bg-orange-500"></span>
                    {formatStatus(status)}
                </div>
            );

        case "rejected":
            return (
                <div className="border w-[90px] border-red-500 self-start font-normal rounded-full bg-red-500/5 text-center text-red-500 text-xs py-[2px] px-2 flex items-center justify-center gap-1">
                    <span className="w-[6px] h-[6px] rounded-full bg-red-500"></span>
                    {formatStatus(status)}
                </div>
            );

        case "canceled":
            return (
                <div className="border w-[90px] border-gray-500 self-start font-normal rounded-full bg-gray-500/5 text-center text-gray-500 text-xs py-[2px] px-2 flex items-center justify-center gap-1">
                    <span className="w-[6px] h-[6px] rounded-full bg-gray-500"></span>
                    {formatStatus(status)}
                </div>
            );
    }
}
