import { Wallet } from "lucide-react";

export function TotalDeposits() {
    return (
        <>
            <div className="aspect-video flex flex-col relative justify-between rounded-xl bg-blue-500/85 p-4 overflow-hidden">
                <div className="text-lg text-white font-semibold mb-4 p-4 w-full  flex gap-3 items-center">
                    <span>
                        <Wallet size={25} />
                    </span>
                    <span>Depósitos aprovados</span>

                    <span className="self-end ml-auto py-1 px-3 text-sm bg-blue-900/25 text-white rounded text-center">
                        +12%
                    </span>
                </div>

                <div className="w-full self-baseline  text-white p-4 text-[40px] font-bold rounded-lg flex">
                    R$ 1.234,56
                </div>
                <div className="absolute inset-0 ">
                    <svg
                        className="absolute top-0 left-0 w-full h-full"
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0.00,49.98 C150.00,150.00 349.00,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                            style={{
                                stroke: "none",
                                fill: "#eeeeff",
                                opacity: 0.2,
                            }}
                        ></path>
                    </svg>
                </div>
            </div>
        </>
    );
}
