import { CircleMinus, Users, Wallet } from "lucide-react";

export type TransactioType = "withdrawn" | "deposit" | "equip" | "invest";

export type TypeTransactionProps = {
    type: TransactioType;
};

export function TypeTransaction({ type }: TypeTransactionProps) {
    switch (type) {
        case "withdrawn":
            return (
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center overflow-hidden bg-gradient-to-r from-pacific-blue-600 to-pacific-blue-300">
                    <CircleMinus size={15} />
                </div>
            );
        case "deposit":
            return (
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center overflow-hidden bg-gradient-to-r from-pacific-blue-600 to-pacific-blue-300">
                    <Wallet size={15} />
                </div>
            );
        case "equip":
            return (
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center overflow-hidden bg-gradient-to-r from-pacific-blue-600 to-pacific-blue-300">
                    <Users size={15} />
                </div>
            );

        default:
            return (
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center overflow-hidden bg-gradient-to-r from-pacific-blue-600 to-pacific-blue-300">
                    <CircleMinus size={14} />
                </div>
            );
    }
}
