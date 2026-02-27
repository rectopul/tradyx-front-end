import { VipDetails } from "./vip-details";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { toast } from "sonner";
import { userChallenges } from "@/services/userService";
import { useEffect, useState } from "react";
import { Challenge } from "@/types/challenges";

export function VipCards() {
    const [challenges, setChallnges] = useState<Challenge[]>([]);

    const handleGetChallengeGoals = async () => {
        try {
            const challenges = await userChallenges();

            console.log("missoes listadas", challenges);
            setChallnges(challenges);
        } catch (error) {
            toast.error("Erro ao buscar missoes");
        }
    };

    useEffect(() => {
        handleGetChallengeGoals();
    }, []);

    return (
        <>
            <div className="w-full overflow-hidden">
                <Carousel className="w-full max-w-3xl mx-auto">
                    <CarouselContent>
                        {challenges.map((cl, key) => (
                            <CarouselItem
                                className="basis-[60%] sm:basis-[50%]"
                                key={`challenge-goal-item-${key}`}
                            >
                                <VipDetails challeng={cl} step={key + 1} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    );
}
