import React, { useEffect, useState } from "react";
import { getReferrals } from "../services/referralService";
import { ReferralStats } from "../types/referral.types";
import { Spinner } from "@/components/ui/spinner";
import { formatCurrency } from "@/utils/helpers";
import { useUser } from "@/contexts/UserProvider";
import {
    ChevronRight,
    Users,
    TrendingUp,
    Lightbulb,
    DollarSign,
} from "lucide-react"; // Adicionei ícones para melhor UX
import { ReferralsDetailsPage } from "./ReferralsDetailsPage";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

// Componente para renderizar um cartão de nível de indicação
interface ReferralCardProps {
    level: number;
    title: string;
    commissionPercent: number | undefined;
    inviteCount: number | undefined;
    commissionValue: number;
    onClick: () => void;
}

const ReferralCard: React.FC<ReferralCardProps> = ({
    level,
    title,
    commissionPercent,
    inviteCount,
    commissionValue,
    onClick,
}) => (
    <div className="flex flex-col rounded-[32px] bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Users className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <div className="font-bold text-gray-900 text-base">
                        {title}
                    </div>
                    <span className="text-xs text-brand font-bold uppercase tracking-wider">
                        {commissionPercent ?? 0}% de Comissão
                    </span>
                </div>
            </div>

            <button
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 hover:text-gray-900 transition-colors"
                onClick={onClick}
                aria-label={`Ver detalhes do Nível ${level}`}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>

        <div className="grid grid-cols-2 p-6 text-center">
            <div className="flex flex-col items-center border-r border-gray-50">
                <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    Convidados
                </h4>
                <span className="font-bold text-2xl text-gray-900 mt-1">
                    {inviteCount ?? 0}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    Ganhos Totais
                </h4>
                <span className="font-bold text-2xl text-brand mt-1">
                    {formatCurrency(commissionValue)}
                </span>
            </div>
        </div>
    </div>
);

const ReferralDashboard: React.FC = () => {
    const { settings, comissions } = useUser();
    const [referralStats, setReferralStats] = useState<ReferralStats | null>(
        null
    );
    const [referralsView, setReferralsView] = useState<number | null>(null);
    const [level1Comissions, setLevel1Comissions] = useState<number>(0);
    const [level2Comissions, setLevel2Comissions] = useState<number>(0);
    const [level3Comissions, setLevel3Comissions] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const referralsData = await getReferrals();

                // Filtrar comissões por nível (step)
                const lvl1Referrals = comissions.filter(
                    (reff) => reff.step === 1
                );
                const lvl2Referrals = comissions.filter(
                    (reff) => reff.step === 2
                );
                const lvl3Referrals = comissions.filter(
                    (reff) => reff.step > 2
                ); // Assumindo step > 2 é nível 3

                // Calcular o total das comissões para cada nível
                const totalComissionsLvl1 = lvl1Referrals.reduce(
                    (sum, elm) => sum + (elm.amount || 0),
                    0
                );
                const totalComissionsLvl2 = lvl2Referrals.reduce(
                    (sum, elm) => sum + (elm.amount || 0),
                    0
                );
                const totalComissionsLvl3 = lvl3Referrals.reduce(
                    (sum, elm) => sum + (elm.amount || 0),
                    0
                );

                setLevel1Comissions(totalComissionsLvl1);
                setLevel2Comissions(totalComissionsLvl2);
                setLevel3Comissions(totalComissionsLvl3);

                setReferralStats(referralsData);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [comissions]);

    // Lógica para alternar para a página de detalhes
    if (referralsView && referralsView > 0) {
        return (
            <ReferralsDetailsPage
                nivel={referralsView}
                onClose={() => setReferralsView(null)}
            />
        );
    }

    // Função auxiliar para calcular o valor da comissão de exemplo
    const calcValueOfComission = (value: number) => {
        return {
            first_level: value * ((settings?.comission_first_level ?? 0) / 100),
            second_level:
                value * ((settings?.comission_second_level ?? 0) / 100),
            thirty_level:
                value * ((settings?.comission_thirty_level ?? 0) / 100),
        };
    };

    const valuesComission = calcValueOfComission(500);

    if (loading) {
        // Estilizei o spinner para ficar no centro do fundo escuro
        return (
            <div className="min-h-screen flex items-center justify-center bg-ebony-clay-950">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col font-sans px-2 mb-24">
            <div className="mt-6 flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-900">Centro de Afiliados</h2>
                <p className="text-sm text-gray-400 font-medium">
                    Gerencie sua equipe e acompanhe suas comissões.
                </p>
            </div>

            <div className="mt-8 space-y-8">
                {/* --- Estatísticas de Nível --- */}
                <div className="space-y-4">
                    <ReferralCard
                        level={1}
                        title="Equipe Nível 1"
                        commissionPercent={settings?.comission_first_level}
                        inviteCount={referralStats?.level1_count}
                        commissionValue={level1Comissions}
                        onClick={() => setReferralsView(1)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ReferralCard
                            level={2}
                            title="Equipe Nível 2"
                            commissionPercent={
                                settings?.comission_second_level
                            }
                            inviteCount={referralStats?.level2_count}
                            commissionValue={level2Comissions}
                            onClick={() => setReferralsView(2)}
                        />
                        <ReferralCard
                            level={3}
                            title="Equipe Nível 3"
                            commissionPercent={
                                settings?.comission_thirty_level
                            }
                            inviteCount={referralStats?.level3_count}
                            commissionValue={level3Comissions}
                            onClick={() => setReferralsView(3)}
                        />
                    </div>
                </div>

                {/* --- Instruções e Regras de Comissão --- */}
                {settings && (
                    <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Regras de Comissão da Equipe
                            </h2>
                        </div>

                        <div className="text-gray-500 text-sm leading-relaxed space-y-6">
                            <p className="font-medium">
                                Compartilhe seu link de convite para ganhar comissões quando
                                seus amigos entrarem e investirem.
                            </p>

                            <div className="space-y-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                                <p className="font-bold text-gray-900 uppercase text-[10px] tracking-widest">
                                    Exemplo (Investimento de R$ 500)
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex justify-between items-center">
                                        <span className="text-gray-400">Nível 1 ({settings.comission_first_level}%)</span>
                                        <strong className="text-gray-900 font-bold">
                                            {formatCurrency(valuesComission.first_level)}
                                        </strong>
                                    </li>
                                    <li className="flex justify-between items-center border-y border-gray-100 py-3">
                                        <span className="text-gray-400">Nível 2 ({settings.comission_second_level}%)</span>
                                        <strong className="text-gray-900 font-bold">
                                            {formatCurrency(valuesComission.second_level)}
                                        </strong>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span className="text-gray-400">Nível 3 ({settings.comission_thirty_level}%)</span>
                                        <strong className="text-gray-900 font-bold">
                                            {formatCurrency(valuesComission.thirty_level)}
                                        </strong>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-brand/5 border border-brand/10 rounded-2xl p-4 flex items-start gap-3">
                                <TrendingUp className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                                <p className="text-xs text-brand/80 font-medium">
                                    <span className="font-bold uppercase">Nota:</span> As comissões são geradas apenas na primeira compra de cada membro da equipe.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReferralDashboard;
