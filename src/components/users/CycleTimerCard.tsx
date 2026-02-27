import { Timer } from "lucide-react"; // ou seu ícone
import { CardContent } from "@/components/ui/card";
import { UserCycle } from "@/types";

const CycleTimerCard = ({ cycles }: { cycles: UserCycle[] }) => {
    const now = new Date();

    const latestCycle =
        cycles && cycles.length && cycles.length > 0
            ? cycles.reduce((latest, cycle) =>
                  new Date(cycle.completed_date) >
                  new Date(latest.completed_date)
                      ? cycle
                      : latest
              )
            : null;

    let remaining = "Concluído";

    if (latestCycle) {
        const completedDate = new Date(latestCycle.completed_date);
        const diffMs = completedDate.getTime() - now.getTime();

        if (diffMs > 0) {
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
            const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
            remaining = `${diffDays}d ${diffHours}h ${diffMinutes}m`;
        }
    }

    return (
        <CardContent className="p-4 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">
                    Tempo Restante
                </p>
                <h3 className="text-2xl font-bold">{remaining}</h3>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
                <Timer className="h-5 w-5 text-indigo-600" />
            </div>
        </CardContent>
    );
};

export default CycleTimerCard;
