import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { PackageCard } from "../package/PackageCard";
import { Package } from "../admin/packages/columns";

interface PackagesCarouselProps {
    packages: Package[];
}

export function PackagesCarousel({ packages }: PackagesCarouselProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Pacotes em destaque</h2>
            <Carousel className="w-full">
                <CarouselContent>
                    {packages.map((pkg) => (
                        <CarouselItem
                            key={pkg.id}
                            className="md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <PackageCard pkg={pkg} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="max-md:left-0" />
                <CarouselNext className="max-md:right-0" />
            </Carousel>
        </div>
    );
}
