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
    <div className="flex flex-col rounded-xl bg-ebony-clay-800 shadow-lg border border-ebony-clay-700 hover:border-ebony-clay-500 transition-colors duration-300">
        <div className="flex items-center justify-between p-4 border-b border-ebony-clay-700">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-ebony-clay-600">
                    {/* Ícone ou imagem para o nível, usando um placeholder de cor */}
                    <Users className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold text-white text-base">
                    {title} ({commissionPercent ?? 0}%)
                </div>
            </div>

            <button
                className="text-ebony-clay-400 hover:text-ebony-clay-50 transition-colors"
                onClick={onClick}
                aria-label={`Ver detalhes do Nível ${level}`}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>

        <div className="grid grid-cols-2 p-4 text-center divide-x divide-ebony-clay-700">
            <div className="flex flex-col items-center">
                <h4 className="text-ebony-clay-300 text-xs font-light uppercase tracking-wider">
                    Convidados
                </h4>
                <span className="font-bold text-xl text-white mt-1">
                    {inviteCount ?? 0}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <h4 className="text-ebony-clay-300 text-xs font-light uppercase tracking-wider">
                    Comissão Total
                </h4>
                <span className="font-bold text-xl text-ebony-clay-400 mt-1">
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
        <>
            <Carousel className="w-full max-w-md overflow-visible">
                <CarouselContent className="-ml-2">
                    <CarouselItem className="pl-2 basis-[calc(90%-0.5rem)] sm:basis-[calc(90%-0.5rem)]">
                        <div className="w-full bg-tradyx-800/85 font-space border shadow-top-inset shadow-tradyx-200 border-tradyx-500 rounded-2xl p-4 flex flex-col text-tradyx-200">
                            <div className="font-semibold flex items-center gap-2 text-sm">
                                Ganhos nível 1
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-tradyx-800/60 border border-tradyx-900">
                                    <DollarSign className="w-3 h-3" />
                                </div>
                            </div>

                            <div className="font-semibold flex items-center gap-2 mt-3 text-xl">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-tradyx-800/60 border border-tradyx-900">
                                    <DollarSign className="w-4 h-4" />
                                </div>
                                {formatCurrency(level1Comissions)} | Quantidade:{" "}
                                {referralStats?.level1_count}
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="pl-2 basis-[calc(90%-0.5rem)] sm:basis-[calc(90%-0.5rem)]">
                        <div className="w-full bg-tradyx-800/85 font-space border shadow-top-inset shadow-tradyx-200 border-tradyx-500 rounded-2xl p-4 flex flex-col text-tradyx-200">
                            <div className="font-semibold flex items-center gap-2 text-sm">
                                Ganhos nível 2
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-tradyx-800/60 border border-tradyx-900">
                                    <DollarSign className="w-3 h-3" />
                                </div>
                            </div>

                            <div className="font-semibold flex items-center gap-2 mt-3 text-xl">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-tradyx-800/60 border border-tradyx-900">
                                    <DollarSign className="w-4 h-4" />
                                </div>
                                {formatCurrency(level2Comissions)} | Quantidade:{" "}
                                {referralStats?.level2_count}
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="pl-2 basis-[calc(90%-0.5rem)] sm:basis-[calc(90%-0.5rem)]">
                        <div className="w-full bg-tradyx-800/85 font-space border shadow-top-inset shadow-tradyx-200 border-tradyx-500 rounded-2xl p-4 flex flex-col text-tradyx-200">
                            <div className="font-semibold flex items-center gap-2 text-sm">
                                Ganhos nível 3
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-tradyx-800/60 border border-tradyx-900">
                                    <DollarSign className="w-3 h-3" />
                                </div>
                            </div>

                            <div className="font-semibold flex items-center gap-2 mt-3 text-xl">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-tradyx-800/60 border border-tradyx-900">
                                    <DollarSign className="w-4 h-4" />
                                </div>
                                {formatCurrency(level3Comissions)} | Quantidade:{" "}
                                {referralStats?.level3_count}
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="min-h-screen bg-transparent text-white pt-8 pb-12 mb-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-extrabold mb-6 text-ebony-clay-100">
                        Painel de Indicações
                    </h1>
                    <p className="text-ebony-clay-300 mb-8">
                        Acompanhe o desempenho da sua equipe e as comissões
                        geradas.
                    </p>

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
                                onClick={() => setReferralsView(3)} // Assumindo que Nível 3 usa '3' para a view
                            />
                        </div>
                    </div>

                    {/* --- Instruções e Regras de Comissão --- */}
                    {settings && (
                        <div className="bg-ebony-clay-800 mt-8 rounded-xl shadow-2xl p-6 border border-ebony-clay-700">
                            <div className="flex items-center gap-3 mb-4">
                                <Lightbulb className="w-6 h-6 text-ebony-clay-400" />
                                <h2 className="text-xl font-bold text-white">
                                    Regras de Comissão da Equipe
                                </h2>
                            </div>

                            <div className="text-ebony-clay-300 text-sm leading-relaxed space-y-4">
                                <p>
                                    Compartilhe seu link ou código de convite
                                    para ganhar uma comissão de equipe quando
                                    seus amigos se cadastrarem e investirem. A
                                    estrutura é de multinível:
                                </p>

                                <div className="space-y-3 p-3 bg-ebony-clay-900 rounded-lg border border-ebony-clay-700">
                                    <p className="font-semibold text-white">
                                        Exemplo de Ganhos (Investimento de R$
                                        500):
                                    </p>
                                    <ul className="list-disc list-inside ml-2 space-y-2">
                                        <li className="text-sm">
                                            Usuário A (Time 1): Comissão de{" "}
                                            <strong className="text-ebony-clay-400">
                                                {formatCurrency(
                                                    valuesComission.first_level
                                                )}
                                            </strong>{" "}
                                            ({settings.comission_first_level}%).
                                        </li>
                                        <li className="text-sm">
                                            Usuário B (Time 2): Comissão de{" "}
                                            <strong className="text-ebony-clay-400">
                                                {formatCurrency(
                                                    valuesComission.second_level
                                                )}
                                            </strong>{" "}
                                            ({settings.comission_second_level}
                                            %).
                                        </li>
                                        <li className="text-sm">
                                            Usuário C (Time 3): Comissão de{" "}
                                            <strong className="text-ebony-clay-400">
                                                {formatCurrency(
                                                    valuesComission.thirty_level
                                                )}
                                            </strong>{" "}
                                            ({settings.comission_thirty_level}
                                            %).
                                        </li>
                                    </ul>
                                </div>

                                <p>
                                    <strong className="text-white">
                                        Dica de Sucesso:
                                    </strong>{" "}
                                    Quanto mais amigos você convidar e quanto
                                    maior o investimento deles, mais comissão
                                    você ganha.
                                </p>

                                <p className="text-red-400 font-medium bg-red-900/20 p-3 rounded-lg border border-red-700/50">
                                    <TrendingUp className="inline w-4 h-4 mr-2" />
                                    <span className="font-bold">Atenção:</span>{" "}
                                    As comissões são geradas{" "}
                                    <strong className="text-red-300">
                                        somente na primeira compra
                                    </strong>{" "}
                                    de um produto por um membro da sua equipe.
                                    Compras repetidas não geram comissão.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ReferralDashboard;
