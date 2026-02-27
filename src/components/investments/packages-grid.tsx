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
        ? asset("/assets/images/icons/vip.svg")
        : asset("/assets/images/icons/money-coin.svg");

    return (
        <div className="flex w-full flex-col gap-6 px-2">
            <div className="w-full flex items-center justify-between px-1">
                <h2 className="text-2xl font-bold text-gray-900">
                    {label ? label : "Investimentos"}
                </h2>

                <button
                    onClick={() => {}}
                    className="text-brand font-bold text-sm hover:underline transition-colors"
                >
                    Ver Todos
                </button>
            </div>

            {/* Category Icons similar to the circular ones in the image */}
            {!featured && (
                <div className="flex items-center w-full overflow-x-auto pb-2 scrollbar-hide gap-5">
                    {[
                        { label: "Tudo", active: true },
                        { label: "Cripto", active: false },
                        { label: "Imóveis", active: false },
                        { label: "Tech", active: false },
                        { label: "Energia", active: false },
                    ].map((cat) => (
                        <div key={cat.label} className="flex flex-col items-center gap-2 min-w-[70px]">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                                cat.active
                                ? "bg-brand text-gray-900 shadow-lg shadow-brand/20"
                                : "bg-white border border-gray-100 shadow-sm"
                            }`}>
                                <span className={`text-lg font-bold ${cat.active ? "text-gray-900" : "text-gray-300"}`}>
                                    {cat.label.charAt(0)}
                                </span>
                            </div>
                            <span className={`text-xs font-bold ${cat.active ? "text-gray-900" : "text-gray-400"}`}>
                                {cat.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex w-full py-2">
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
