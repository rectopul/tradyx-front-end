import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Target, CheckCircle2 } from "lucide-react";
import { fetchClainBonus, userChallenges } from "@/services/userService";
import { Spinner } from "../ui/spinner";
import { asset, formatCurrency } from "@/utils/helpers";
import { Challenge } from "@/types/challenges";
import { Progress } from "../ui/progress";
import { Coin } from "../icons/lib";

const ChallengeGoals: React.FC = () => {
    const [goals, setGoals] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [_, setClaimingBonus] = useState<number | null>(null);

    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    // Função para buscar as metas
    const fetchChallengeGoals = async () => {
        try {
            const challengeGoals = await userChallenges();

            if (challengeGoals) {
                setGoals(challengeGoals);
            } else {
                throw new Error("Erro ao carregar metas");
            }
        } catch (error) {
            console.error("Erro ao buscar metas:", error);
            setAlert({
                type: "error",
                message: "Erro ao carregar as metas de desafio",
            });
        } finally {
            setLoading(false);
        }
    };

    // Função para reivindicar bônus
    const claimBonus = async (challengeGoalId: number) => {
        setClaimingBonus(challengeGoalId);

        try {
            const response = await fetchClainBonus({
                challenge_goal_id: challengeGoalId,
            });

            if (response) {
                setAlert({
                    type: "success",
                    message: "Bônus reivindicado com sucesso!",
                });
                // Recarregar as metas
                fetchChallengeGoals();
            }
        } catch (error) {
            console.error("Erro ao reivindicar bônus:", error);
            setAlert({
                type: "error",
                message: "Erro ao reivindicar bônus",
            });
        } finally {
            setClaimingBonus(null);
        }
    };

    useEffect(() => {
        fetchChallengeGoals();
    }, []);

    // Auto-hide alert after 5 seconds
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    if (loading) {
        return (
            <>
                <Spinner />
            </>
        );
    }

    return (
        <div className="w-full mx-auto space-y-6 mb-12">
            <div className="w-full space-y-6 bg-blue-zodiac-950/30 p-4 rounded-t-3xl border border-blue-zodiac-950/50 pb-20">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-white mb-2 flex items-center justify-center gap-2">
                        Recompensas
                    </h1>
                </div>

                {alert && (
                    <Alert
                        className={`${
                            alert.type === "success"
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                        }`}
                    >
                        <AlertDescription
                            className={
                                alert.type === "success"
                                    ? "text-green-700"
                                    : "text-red-700"
                            }
                        >
                            {alert.message}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map((goal) => (
                        <div
                            key={goal.id}
                            className="relative overflow-hidden rounded-xl bg-secondary-gradient transition-all duration-300 hover:shadow-lg border border-tradyx-800"
                        >
                            {/* Header com status */}
                            <div className="pb-2">
                                <div className="w-full font-space flex flex-col p-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-[40px] h-10 bg-contain bg-center bg-no-repeat"
                                            style={{
                                                backgroundImage: `url(${asset(
                                                    "/assets/images/icons/bonus.svg"
                                                )})`,
                                            }}
                                        ></div>
                                        <div className="flex flex-col gap-3 w-3/4">
                                            <div className="w-full relative flex-col text-sm text-tradyx-200 font-bold">
                                                Desempenho de equipe
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col mt-2">
                                        <div className="w-full font-semibold text-tradyx-950 flex items-center gap-2">
                                            {goal.title}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Progress
                                            value={goal.progress_percentage}
                                            className="h-3"
                                        />
                                        <div className="w-[20px] h-[20px]">
                                            <Coin className="w-full h-full" />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-tradyx-200">
                                            Lucro de rede
                                        </div>

                                        <div className="text-sm text-tradyx-200">
                                            {formatCurrency(
                                                goal.required_investment
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Efeito visual para metas completadas */}
                            {goal.is_completed && (
                                <>
                                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-green-500">
                                        <CheckCircle2 className="absolute -top-7 -right-7 h-4 w-4 text-white" />
                                    </div>
                                    <button onClick={() => claimBonus(goal.id)}>
                                        Resgatar
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {goals.length === 0 && (
                    <div className="text-center py-12">
                        <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Nenhuma meta disponível
                        </h3>
                        <p className="text-gray-500">
                            As metas de desafio aparecerão aqui quando estiverem
                            ativas.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengeGoals;
