import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useUser } from "@/contexts/UserProvider";
import { useEffect, useState } from "react";
import { PurchaseMinItem } from "./purchase-min-item";

export function PurchasesSlide() {
    const [api, setApi] = useState<CarouselApi>();
    const { purchases } = useUser();

    useEffect(() => {
        if (!api) {
            return;
        }
    }, [api]);
    return (
        <div className="w-full flex justify-center">
            <Carousel
                className="w-full max-w-md overflow-visible"
                setApi={setApi}
                opts={{
                    slidesToScroll: 2,
                }}
            >
                <CarouselContent className="-ml-2">
                    {purchases &&
                        purchases.map((purch, key) => (
                            <>
                                {purch.package && (
                                    <CarouselItem
                                        className="pl-2 basis-[calc(47%-0.5rem)] sm:basis-[calc(40%-0.5rem)]"
                                        key={`purchase-summary-${key}`}
                                    >
                                        <PurchaseMinItem purchase={purch} />
                                    </CarouselItem>
                                )}
                            </>
                        ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
