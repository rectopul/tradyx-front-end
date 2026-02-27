import {
    fetchListPackages,
    getThemeSettings,
    handleFetchDeposits,
    listCustommers,
} from "@/services/adminServices";
import { Setting, UserData, Deposit } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Package } from "@/components/admin/packages/columns";
import { ReferralConfig } from "@/types/admin/referral";
import { fetchListReferralConfig } from "@/services/admin/referral";
import { Purchase } from "@/types/purchase";
import { useNavigate } from "react-router-dom";
import { adminAuth } from "@/hooks/adminAuth";
import { AdminContext } from "@/contexts/admin/admin-context";

interface AdminProviderProps {
    children: React.ReactNode;
}

export function AdminProvider({ children, ...props }: AdminProviderProps) {
    const [settings, setSettings] = useState<Setting | null>(null);
    const [customers, setCustomers] = useState<UserData[]>([]);
    const [isLoadingSettings, setIsLoadingSettings] = useState(true);
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const [packages, setPackages] = useState<Package[]>([]);
    const [investments, setInvestments] = useState<Purchase[]>([]);
    const { isAuthenticated, logout, login, admin } = adminAuth();
    const [referralConfigs, setReferralConfigs] = useState<ReferralConfig[]>(
        []
    );
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const addInvestmentPackage = (p: Purchase) => {
        setInvestments((olds) => [...olds, p]);
    };

    const setInvestimentsList = (il: Purchase[]) => setInvestments(il);

    const updateInvestmentPackage = (p: Purchase) => {
        setInvestments((olds: Purchase[]) =>
            olds.map((old) => {
                if (old.id === p.id) {
                    return p;
                }

                return old;
            })
        );
    };

    const deleteInvestmentPackage = (id: number) => {
        const filtred = investments.filter((p) => p.id !== id);
        setInvestments(filtred);
    };

    const updateDeposits = (data: Deposit[]) => setDeposits(data);

    // Pacotes
    const deletePackage = (id: number) => {
        const filtred = packages.filter((p) => p.id !== id);
        setPackages(filtred);
    };

    const updatePackage = (p: Package) => {
        setPackages((olds: Package[]) =>
            olds.map((old) => {
                if (old.id === p.id) {
                    return p;
                }

                return old;
            })
        );
    };

    const addPackage = (p: Package) => {
        setPackages((olds) => [...olds, p]);
    };

    // Referral Configs
    const addReferralConfig = (r: ReferralConfig) => {
        setReferralConfigs((olds) => [...olds, r]);
    };

    const deleteReferralConfig = (id: number) => {
        setReferralConfigs((olds) => olds.filter((r) => r.id !== id));
    };

    const handleUpdateSetting = (data: Setting) => setSettings(data);
    const handleUpdateCustomer = (data: UserData) =>
        setCustomers((olds: UserData[]) =>
            olds.map((old) => {
                if (old.id === data.id) {
                    return data;
                }

                return old;
            })
        );

    useEffect(() => {
        // Usar uma ref para rastrear se já carregou
        let isMounted = true;

        const fetchUserData = async () => {
            if (!isAuthenticated) {
                setIsLoadingSettings(false);
                navigate("/admin/login", { replace: true });
                return;
            }

            // Evita recarregar se já tem settings
            if (settings && !error) {
                setIsLoadingSettings(false);
                return;
            }

            try {
                setIsLoadingSettings(true);
                setError(null);

                // REMOVIDO listWithdraws() daqui - React Query cuida disso
                const [
                    setting,
                    customers,
                    depositsData,
                    packages,
                    referralConfigs,
                ] = await Promise.all([
                    getThemeSettings(),
                    listCustommers({ currentPage: 1, perPage: 10 }),
                    handleFetchDeposits(1, 10),
                    fetchListPackages(),
                    fetchListReferralConfig(),
                ]);

                if (isMounted) {
                    setSettings(setting);
                    setReferralConfigs(referralConfigs);
                    setCustomers(customers.data);
                    setDeposits(depositsData.deposits.data);
                    setPackages(packages);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Erro ao carregar dados do usuário");
                    toast.dismiss();
                    toast.error("Erro ao carregar dados do usuário");
                    console.error("Erro ao carregar dados:", err);
                    logout();
                }
            } finally {
                if (isMounted) {
                    setIsLoadingSettings(false);
                }
            }
        };

        fetchUserData();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const value = {
        settings,
        updateSettings: handleUpdateSetting,
        isLoadingSettings,
        isAuthenticated: isAuthenticated || false,
        error,
        admin,
        customers,
        updateCustomer: handleUpdateCustomer,
        deposits,
        updateDeposits,
        investments,
        setInvestimentsList,
        addInvestmentPackage,
        updateInvestmentPackage,
        deleteInvestmentPackage,
        packages,
        deletePackage,
        addPackage,
        updatePackage,
        referralConfigs,
        addReferralConfig,
        deleteReferralConfig,
        login,
        logout,
    };

    return (
        <AdminContext.Provider {...props} value={value}>
            {children}
        </AdminContext.Provider>
    );
}
