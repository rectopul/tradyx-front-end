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
        <div className="w-full mx-auto font-sans px-2 mb-24">
            <div className="mt-6 flex flex-col gap-1 mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Desafios</h2>
                <p className="text-sm text-gray-400 font-medium">
                    Complete tarefas e ganhe recompensas exclusivas.
                </p>
            </div>

            <div className="flex flex-col gap-4">

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

                {goals.map((goal) => (
                    <div
                        key={goal.id}
                        className="w-full bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm relative overflow-hidden"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center">
                                    <img
                                        src={asset("/assets/images/icons/bonus.svg")}
                                        alt="bonus"
                                        className="w-8 h-8"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-brand uppercase tracking-widest">
                                        Desempenho de Equipe
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                        {goal.title}
                                    </h3>
                                </div>
                            </div>

                            {goal.is_completed && (
                                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <span className="text-xs font-bold text-gray-400">Progresso</span>
                                <span className="text-sm font-bold text-gray-900">
                                    {Math.min(100, goal.progress_percentage)}%
                                </span>
                            </div>
                            <Progress
                                value={goal.progress_percentage}
                                className="h-2 bg-gray-100"
                            />
                            <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                <span>Lucro de rede</span>
                                <span>{formatCurrency(goal.required_investment)}</span>
                            </div>
                        </div>

                        {goal.is_completed && (
                            <button
                                onClick={() => claimBonus(goal.id)}
                                className="w-full mt-6 bg-brand hover:bg-brand/90 text-gray-900 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-brand/20 active:scale-[0.98]"
                            >
                                Resgatar Recompensa
                            </button>
                        )}
                    </div>
                ))}

                {goals.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-[32px] border border-gray-100 shadow-sm px-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-6">
                            <Target className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Nenhum desafio ativo
                        </h3>
                        <p className="text-sm text-gray-400 font-medium">
                            Volte mais tarde para novas oportunidades de ganhar recompensas extras.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengeGoals;
