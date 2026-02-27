import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserProvider";

// Icons
import { ChevronLeft } from "lucide-react";

// Dynamic Components
import { formatCurrency } from "@/utils/helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ReferralLink } from "@/types/referral.types";
import { siteUrl } from "@/services/api";
import { HeaderMissions } from "./header-missions";
import { HeaderHome } from "./header-home";
import { HeaderDeposit } from "../headers/header-deposit";
import { WithdrawnHeader } from "../withdraw/withdraw-header";
import InvestmentSummaryCard from "./header-purchases";
import { HeaderProfile } from "./header-profile";
import { HeaderTransactions } from "./header-transactions";

export function Header() {
    const { user, purchases, withdraws, ledgers } = useUser();
    const [referralLink, setReferralLink] = useState<ReferralLink | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [_, setIsMobile] = useState(window.innerWidth < 768);
    const [__, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const safePurchases = purchases || [];
    const safeWithdraws = withdraws || [];
    const safeLedgers = ledgers || [];

    const totalInvestment = safePurchases.reduce(
        (sum, elm) => sum + (elm.amount || 0),
        0
    );

    const totalProfit = safeLedgers.reduce(
        (sum, elm) => sum + (elm.amount || 0),
        0
    );

    const totalWithdraws = safeWithdraws.reduce(
        (sum, elm) => sum + (elm.amount || 0),
        0
    );

    let pageTitle: string = "";

    if (location.pathname === "/withdraw") {
        pageTitle = "Sacar";
    } else if (location.pathname === "/deposit") {
        pageTitle = "Recarga";
    } else if (location.pathname === "/withdraw_account") {
        pageTitle = "Conta de Saque";
    } else if (location.pathname === "/transactions") {
        pageTitle = "Transações";
    } else if (location.pathname === "/packages") {
        pageTitle = "Aluguel de IA";
    } else if (location.pathname === "/purchases") {
        pageTitle = "Planos Adquiridos";
    } else if (location.pathname === "/profile") {
        pageTitle = "Informações da Conta";
    } else if (location.pathname === "/support") {
        pageTitle = "Canais de Atendimento";
    } else {
        pageTitle = "Painel";
    }

    const handleGenerateLink = async () => {
        try {
            setReferralLink({
                ref_id: String(user?.ref_id),
                referral_link: String(`${siteUrl}/signup?ref=${user?.ref_id}`),
            });
        } catch (error) {
            console.error("Erro ao gerar link:", error);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    // Handle window resize and scroll
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleGenerateLink();

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        handleGenerateLink();
    }, [user]);

    if (location.pathname === "/") {
        return (
            <>
                <HeaderHome />
            </>
        );
    }

    if (location.pathname === "/challenges") {
        return <HeaderMissions />;
    }
    if (location.pathname === "/deposit") {
        return <HeaderDeposit />;
    }
    if (location.pathname === "/withdraw") {
        return <WithdrawnHeader />;
    }
    if (location.pathname === "/profile") {
        return <HeaderProfile />;
    }
    if (location.pathname === "/transactions") {
        return <HeaderTransactions />;
    }
    if (location.pathname === "/purchases") {
        return (
            <InvestmentSummaryCard
                totalInvested={totalInvestment}
                totalProfit={totalProfit}
            />
        );
    }

    if (location.pathname === "/referrals") {
        return (
            <div className="w-full bg-transparent p-4 pt-8 flex flex-col font-avenir">
                <div className="gap-4 hidden">
                    <div className="flex flex-col items-center text-white text-xs">
                        <h3>Investimento total</h3>
                        <div className="text-xl font-semibold">
                            {formatCurrency(totalInvestment)}
                        </div>
                    </div>

                    <div className="flex flex-col items-center text-white text-xs">
                        <h3>Total saques</h3>
                        <div className="text-xl font-semibold">
                            {formatCurrency(totalWithdraws)}
                        </div>
                    </div>
                </div>
                {/* w-full border border-ebony-clay-700 shadow-sm shadow-ebony-clay-700 bg-gradient-to-r from-ebony-clay-950 to-ebony-clay-900 p-4 flex flex-col rounded-xl */}
                <div className="border border-tradyx-900 font-space shadow-top-inset shadow-tradyx-100 bg-gradient-three relative  mt-3 rounded-lg p-4 flex flex-col">
                    {referralLink && (
                        <>
                            <div className="w-full pb-2 border-b border-dashed border-pacific-blue-600/20 flex items-center text-tradyx-950 text-xl font-bold">
                                <div className="flex justify-between items-center w-1/2 border-r border-pacific-blue-600/20">
                                    <span>{referralLink.ref_id}</span>
                                </div>

                                <div className="flex items-center justify-end w-1/2">
                                    <button
                                        onClick={() =>
                                            copyToClipboard(referralLink.ref_id)
                                        }
                                        className="bg-orange-gradient shadow-top-inset shadow-cream-can-100 border border-cream-can-900 hover:bg-orange-500 text-cream-can-950 font-semibold text-xs h-7 px-3 flex justify-center items-center rounded-lg"
                                    >
                                        {copySuccess ? "Copiado" : "Copiar"}
                                    </button>
                                </div>
                            </div>
                            <div className="w-full pt-1 flex items-center text-tradyx-950 text-xs font-bold">
                                <div className="flex justify-between items-center w-4/6 bg-tradyx-50/50 rounded-lg border-2 p-2 border-tradyx-800">
                                    <span className="break-all">
                                        {referralLink.referral_link}
                                    </span>
                                </div>

                                <div className="flex items-center justify-end w-2/6">
                                    <button
                                        onClick={() =>
                                            copyToClipboard(
                                                referralLink.referral_link
                                            )
                                        }
                                        className="bg-orange-gradient shadow-top-inset shadow-cream-can-100 border border-cream-can-900 hover:bg-orange-500 text-cream-can-950 font-semibold text-xs h-7 px-3 flex justify-center items-center rounded-lg"
                                    >
                                        {copySuccess ? "Copiado" : "Copiar"}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            {location.pathname === "/withdraw_account" ||
            location.pathname === "/packages" ? (
                <header className="bg-transparent flex flex-col p-4 font-sans ">
                    <div className="flex justify-center items-center relative font-semibold text-slate-600">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-0"
                            onClick={() => navigate("/")}
                        >
                            <ChevronLeft
                                className="!w-6 !h-6"
                                strokeWidth={2}
                            />
                        </Button>
                        {pageTitle}
                    </div>
                </header>
            ) : (
                <header className="bg-transparent flex flex-col font-sans">
                    <HeaderHome />
                </header>
            )}
        </>
    );
}
