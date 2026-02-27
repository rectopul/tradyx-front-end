import React, { useEffect, useState } from "react";

import {
    CommissionStats,
    ReferralLink,
    ReferralStats,
} from "@/types/referral.types";
import StatsOverview from "./StatsOverview";
import CommissionChart from "./CommissionChart";
import ReferralTable from "./ReferralTable";
import ReferralLinkGenerator from "./ReferralLinkGenerator";
import { CircleUser, Users, TrendingUp, Wallet } from "lucide-react";
import {
    generateReferralLink,
    getCommissionStats,
    getReferrals,
} from "@/services/referralService";

const ReferralDashboardNew: React.FC = () => {
    const [referralStats, setReferralStats] = useState<ReferralStats | null>(
        null
    );
    const [commissionStats, setCommissionStats] =
        useState<CommissionStats | null>(null);
    const [referralLink, setReferralLink] = useState<ReferralLink | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<string>("overview");
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [referralsData, commissionsData] = await Promise.all([
                    getReferrals(),
                    getCommissionStats(),
                ]);

                setReferralStats(referralsData);
                setCommissionStats(commissionsData);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleGenerateLink = async () => {
        try {
            const data = await generateReferralLink();
            setReferralLink(data);
        } catch (error) {
            console.error("Erro ao gerar link:", error);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen ">
            <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 sm:px-8">
                        <h1 className="text-2xl font-bold text-white mb-2">
                            Programa de Referência Premium
                        </h1>
                        <p className="text-blue-100 max-w-2xl">
                            Compartilhe oportunidades de investimento com sua
                            rede e ganhe comissões por cada investimento
                            realizado.
                        </p>

                        <ReferralLinkGenerator
                            referralLink={referralLink}
                            onGenerateLink={handleGenerateLink}
                            onCopy={copyToClipboard}
                            copySuccess={copySuccess}
                        />
                    </div>

                    {commissionStats && referralStats && (
                        <div className="px-6 sm:px-8 py-6">
                            <StatsOverview
                                totalCommission={
                                    commissionStats.total_commission
                                }
                                pendingCommission={
                                    commissionStats.pending_commission
                                }
                                paidCommission={commissionStats.paid_commission}
                                totalReferrals={referralStats.total_count}
                                activeReferrals={referralStats.active_count}
                                investorReferrals={referralStats.investor_count}
                            />

                            <div className="mt-8">
                                <nav className="flex space-x-4 border-b border-slate-200">
                                    <button
                                        onClick={() => setActiveTab("overview")}
                                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
                                            activeTab === "overview"
                                                ? "text-blue-700 border-b-2 border-blue-600 -mb-px"
                                                : "text-slate-600 hover:text-blue-600"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <TrendingUp size={16} />
                                            <span>Visão Geral</span>
                                        </span>
                                    </button>
                                    <button
                                        onClick={() =>
                                            setActiveTab("referrals")
                                        }
                                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition ${
                                            activeTab === "referrals"
                                                ? "text-blue-700 border-b-2 border-blue-600 -mb-px"
                                                : "text-slate-600 hover:text-blue-600"
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span>Meus Indicados</span>
                                        </span>
                                    </button>
                                </nav>

                                <div className="mt-6">
                                    {activeTab === "overview" && (
                                        <div className="space-y-8">
                                            <section>
                                                <h3 className="text-lg font-medium text-slate-800 mb-4">
                                                    Performance Mensal
                                                </h3>
                                                <div className="bg-white rounded-lg border border-slate-200 p-4">
                                                    <CommissionChart
                                                        monthlyData={
                                                            commissionStats.monthly_data
                                                        }
                                                    />
                                                </div>
                                            </section>

                                            <section>
                                                <h3 className="text-lg font-medium text-slate-800 mb-4">
                                                    Estatísticas de Indicações
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="bg-white rounded-lg border border-slate-200 p-5">
                                                        <div className="flex items-center">
                                                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                                                                <Users
                                                                    className="text-indigo-600"
                                                                    size={24}
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-slate-500">
                                                                    Total de
                                                                    Indicados
                                                                </p>
                                                                <p className="text-2xl font-bold text-slate-800">
                                                                    {
                                                                        referralStats.total_count
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white rounded-lg border border-slate-200 p-5">
                                                        <div className="flex items-center">
                                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                                <CircleUser
                                                                    className="text-blue-600"
                                                                    size={24}
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-slate-500">
                                                                    Membros
                                                                    Ativos
                                                                </p>
                                                                <p className="text-2xl font-bold text-slate-800">
                                                                    {
                                                                        referralStats.active_count
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white rounded-lg border border-slate-200 p-5">
                                                        <div className="flex items-center">
                                                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                                                                <Wallet
                                                                    className="text-emerald-600"
                                                                    size={24}
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-slate-500">
                                                                    Investidores
                                                                </p>
                                                                <p className="text-2xl font-bold text-slate-800">
                                                                    {
                                                                        referralStats.investor_count
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    )}

                                    {activeTab === "referrals" && (
                                        <section>
                                            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                                                <ReferralTable
                                                    referrals={
                                                        referralStats.referrals
                                                    }
                                                />
                                            </div>
                                        </section>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ReferralDashboardNew;
