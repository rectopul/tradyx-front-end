import { Package } from "@/components/admin/packages/columns";
import { Button } from "@/components/ui/button";
import { fetchInsertPackageToUser } from "@/services/admin/package";
import { UserData } from "@/types";
import { asset, formatCurrency } from "@/utils/helpers";
import { toast } from "sonner";

interface IncrementPackageCardProps {
    user: UserData;
    pkg: Package;
    onSuccess: (data: boolean) => void;
}

export function IncrementPackageCard({
    pkg,
    user,
    onSuccess,
}: IncrementPackageCardProps) {
    const returnValue = pkg.return_amount / pkg.total_duration;

    const handleAddPackageToUser = async () => {
        toast.loading("Adicionando Plano...");
        try {
            await fetchInsertPackageToUser(user.id, pkg.id);
            onSuccess(true);
            toast.dismiss();
            toast.success(
                `Plano ${pkg.name} adicionado ao usuário ${user.phone}`
            );
        } catch (error) {
            toast.dismiss();
            toast.error(`Erro ao adicionar plano`);
        }
    };
    return (
        <>
            <div className="w-full grid grid-cols-[60px_auto_60px] gap-2">
                <figure className="flex justify-center items-center rounded-md">
                    <img
                        src={asset(pkg.photo)}
                        alt={pkg.name}
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400";
                        }}
                        className="w-full object-cover rounded-md"
                    />
                </figure>

                <div className="flex flex-col text-slate-900">
                    <div className="flex items-center font-semibold">
                        {pkg.name}
                    </div>
                    <div className="flex items-center text-sm">
                        <div className="flex items-center">
                            Preço: {formatCurrency(pkg.total_investment)}
                        </div>
                        <div className="flex items-center">
                            Retorno: {formatCurrency(returnValue)}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end items-center h-full">
                    <Button
                        variant="green"
                        className="!text-xs rounded-md !h-7"
                        onClick={handleAddPackageToUser}
                    >
                        Adicionar
                    </Button>
                </div>
            </div>
        </>
    );
}
