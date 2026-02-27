import { Question } from "../icons/lib";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HeaderHome() {
    const [active, setActive] = useState<"deposit" | "withdraw">("deposit");
    const navigate = useNavigate();

    return (
        <>
            <div className="font-space font-semibold w-full flex bg-secondary-gradient h-[120px] p-6 shadow-gradient-[#865dc1,#492067] !rounded-b-4xl items-center justify-between px-4 py-2">
                <div className="relative grid grid-cols-2 p-2 bg-morph-back h-14 rounded-full w-3/5 shadow-bottom-inset-tr shadow-royal-purple-700">
                    {/* Slider animado */}
                    <motion.div
                        className="absolute top-2 bottom-2 left-2 right-1 rounded-full bg-gradient-three shadow-top-inset-tl shadow-tradyx-400"
                        animate={{
                            x: active === "deposit" ? "0%" : "100%",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        style={{
                            width: "calc(50% - 0.5rem)",
                        }}
                    />

                    {/* Botão Depósito */}
                    <button
                        onClick={() => setActive("deposit")}
                        className={`relative z-10 rounded-full bg-transparent text-sm transition-colors duration-300 ${
                            active === "deposit"
                                ? "text-tradyx-200"
                                : "text-meteorite-400/50"
                        }`}
                    >
                        Depósito
                    </button>

                    {/* Botão Saque */}
                    <button
                        onClick={() => navigate("/withdraw")}
                        className={`relative z-10 rounded-full bg-transparent text-sm transition-colors duration-300 ${
                            active === "withdraw"
                                ? "text-tradyx-200"
                                : "text-meteorite-400/50"
                        }`}
                    >
                        Saque
                    </button>
                </div>

                <div className="ml-auto">
                    <a
                        href="#"
                        className="bg-gradient-three rounded-full h-12 w-12 flex border border-tradyx-700 items-center justify-center shadow-top-inset-tl shadow-tradyx-400"
                    >
                        <Question className="w-7 h-7" />
                    </a>
                </div>
            </div>
        </>
    );
}
