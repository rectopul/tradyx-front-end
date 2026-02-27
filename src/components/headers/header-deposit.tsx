import { CashIn } from "../icons/lib";

export function HeaderDeposit() {
    return (
        <>
            <div className="w-full text-white flex items-center justify-center gap-2 text-2xl flex-col text-center font-semibold p-4">
                <CashIn className="w-14 h-14 text-white" />
                Deposite para começar a investir
            </div>
        </>
    );
}
