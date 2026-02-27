import { PackageCard } from "@/components/package/PackageCard";
import { useUser } from "@/contexts/UserProvider";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageCardVip } from "@/components/package/package-card-vip";

export function PackagesPage() {
    const { packages, user } = useUser();

    const vipPackages = packages.filter((pkg) => pkg.featured);
    const commonPackages = packages.filter((pkg) => !pkg.featured);

    if (!user) {
        return (
            <>
                <Spinner />
            </>
        );
    }

    return (
        <>
            <div className="container mx-auto py-6 space-y-8 mb-12">
                <Tabs defaultValue="commom" className="w-full">
                    <TabsList className="w-full bg-transparent gap-2">
                        <TabsTrigger
                            value="commom"
                            className="basis-1/2 transition-all duration-300 data-[state=active]:bg-gradient-to-b rounded-md h-10 data-[state=active]:from-pacific-blue-500 data-[state=active]:to-pacific-blue-400 data-[state=active]:text-white text-white font-semibold bg-gray-300 data-[state=active]:shadow-none"
                        >
                            Produtos comuns
                        </TabsTrigger>
                        <TabsTrigger
                            value="vip"
                            className="basis-1/2 transition-all duration-300 data-[state=active]:bg-gradient-to-b rounded-md h-10 data-[state=active]:from-pacific-blue-500 data-[state=active]:to-pacific-blue-400 data-[state=active]:text-white text-white font-semibold bg-gray-300 data-[state=active]:shadow-none"
                        >
                            Planos VIP
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="commom">
                        <div className="flex flex-col gap-3">
                            {commonPackages &&
                                commonPackages.map((pkg, key) => (
                                    <PackageCard
                                        pkg={pkg}
                                        key={`packages-listing-${key}`}
                                    />
                                ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="vip">
                        <div className="flex flex-col gap-3 pt-7">
                            {vipPackages &&
                                vipPackages.map((pkg, key) => (
                                    <PackageCardVip
                                        pkg={pkg}
                                        key={`packages-vip-listing-${key}`}
                                    />
                                ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
