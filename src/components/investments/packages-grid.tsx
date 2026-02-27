import { PackageCard } from "@/components/investments/investment-card";
import { Skeleton } from "../ui/skeleton";
import { asset } from "@/utils/helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";
import { Package } from "../admin/packages/columns";

interface PackagesGridProps {
    packages: Package[];
    onBuy: (pkg: Package) => void;
    loading?: boolean;
    featured?: boolean;
    label?: string;
    columns?: {
        xs?: number;
        sm?: number;
        md?: number;
    };
}

export function PackagesGrid({
    packages,
    onBuy,
    featured,
    loading = false,
    columns,
    label,
}: PackagesGridProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const vipPackages = packages.filter((pkg) => pkg.featured);
    const normalPackages = packages.filter((pkg) => !pkg.featured);

    // Define a função de verificação (useCallback para otimização)
    const onSelect = useCallback((carouselApi: CarouselApi) => {
        if (!carouselApi) {
            return;
        }
        // API.canScrollPrev() -> Retorna true se houver slides para a esquerda
        setCanScrollPrev(carouselApi.canScrollPrev());

        // API.canScrollNext() -> Retorna true se houver slides para a direita
        setCanScrollNext(carouselApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!api) {
            return;
        }

        // 1. Executa a verificação imediatamente na inicialização
        onSelect(api);

        // 2. Escuta o evento 'reInit' (quando o tamanho muda) e 'select' (quando o slide muda)
        api.on("reInit", onSelect);
        api.on("select", onSelect);

        // Limpa os listeners ao desmontar o componente
        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api, onSelect]);

    const handleNext = () => {
        if (api) api.scrollNext();
    };

    const handlePrev = () => {
        if (api) api.scrollPrev();
    };

    const gridClasses = columns
        ? `grid gap-3 py-3 px-2 grid-cols-${columns.xs || 2} sm:grid-cols-${
              columns.sm || 3
          } md:grid-cols-${columns.md || 4}`
        : "grid gap-3 py-3 px-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4";

    if (loading) {
        return (
            <div className={gridClasses}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-gradient-to-b from-[#0f1724] to-[#071022] rounded-xl shadow-lg ring-1 ring-[#0b2a38] overflow-hidden"
                    >
                        <div className="aspect-[3/4] p-4 flex flex-col">
                            <Skeleton className="w-20 h-6 mb-2 bg-slate-700" />
                            <Skeleton className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-700" />
                            <Skeleton className="w-full h-5 mb-2 bg-slate-700" />
                            <Skeleton className="w-full h-4 mb-4 bg-slate-700" />
                            <Skeleton className="w-full h-16 mb-2 bg-slate-700" />
                            <Skeleton className="w-full h-10 bg-slate-700" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (packages.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px] text-slate-400">
                <div className="text-center">
                    <p className="text-lg mb-2">
                        Nenhum pacote disponível no momento
                    </p>
                    <p className="text-sm">
                        Volte mais tarde para ver novas oportunidades
                    </p>
                </div>
            </div>
        );
    }

    const iconSection = featured
        ? `url(${asset("/assets/images/icons/vip.svg")})`
        : `url(${asset("/assets/images/icons/money-coin.svg")})`;

    return (
        <div className="flex w-full flex-col">
            <div className="w-full flex items-center">
                <div className="w-[75%] rounded-tl-lg relative bg-no-repeat p-2 flex items-center gap-2 text-white font-semibold bg-cover bg-left">
                    <div
                        className="w-10 h-10 bg-cover bg-center bg-no-repeat opacity-70"
                        style={{
                            backgroundImage: iconSection,
                        }}
                    ></div>
                    {label ? label : "Investimentos"}
                </div>

                <div className="w-[25%] flex items-center justify-end gap-2 p-2">
                    <button
                        className="w-7 h-7 flex items-center bg-secondary-gradient shadow-top-inset shadow-tradyx-100 border border-tradyx-900 text-white justify-center rounded-full hover:bg-orange-gradient hover:border-cream-can-900 disabled:bg-main-gradient disabled:border-tradyx-700 disabled:opacity-40"
                        onClick={handlePrev}
                        disabled={!canScrollPrev}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </button>

                    <button
                        className="w-7 h-7 flex items-center bg-secondary-gradient shadow-top-inset shadow-tradyx-100 border border-tradyx-900 text-white justify-center rounded-full hover:bg-orange-gradient hover:border-cream-can-900 disabled:bg-main-gradient disabled:border-tradyx-700 disabled:opacity-40"
                        onClick={handleNext}
                        disabled={!canScrollNext}
                    >
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="flex w-full px-2 py-4">
                <Carousel
                    className="w-full"
                    setApi={setApi}
                    opts={{
                        slidesToScroll: 2,
                    }}
                >
                    <CarouselContent className="-ml-2">
                        {featured ? (
                            <>
                                {vipPackages.map((pkg) => (
                                    <CarouselItem
                                        key={`pkg-${pkg.id}`}
                                        className="basis-1/2 pl-2"
                                    >
                                        <PackageCard pkg={pkg} onBuy={onBuy} />
                                    </CarouselItem>
                                ))}
                            </>
                        ) : (
                            <>
                                {normalPackages.map((pkg) => (
                                    <CarouselItem
                                        key={`pkg-${pkg.id}`}
                                        className="basis-1/2 pl-2"
                                    >
                                        <PackageCard
                                            key={pkg.id}
                                            pkg={pkg}
                                            onBuy={onBuy}
                                        />
                                    </CarouselItem>
                                ))}
                            </>
                        )}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
}
