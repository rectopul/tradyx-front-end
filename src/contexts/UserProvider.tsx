import { Package } from "@/components/admin/packages/columns";
import { useAuth } from "@/hooks/useAuth";
import { fetchProcessCheckin, getCheckinStore } from "@/services/checkins";
import { getThemeSetting, getUserData } from "@/services/referralService";
import {
    fetchPackages,
    listAllTransactionTypes,
} from "@/services/transactionsService";
import {
    Deposit,
    Setting,
    UserData,
    UserLedger,
    Withdrawal,
    Chart,
} from "@/types";
import { Checkin } from "@/types/checkin";
import { Purchase } from "@/types/purchase";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface UserProviderProps {
    children: React.ReactNode;
}

interface UserContextType {
    settings: Setting | null;
    user: UserData | null;
    updateUser: (data: UserData) => void;
    addBalance: (data: number) => void;
    subtractBalance: (data: number) => void;
    isLoadingSettings: boolean;
    packages: Package[];
    purchases: Purchase[];
    addPurchase: (data: Purchase) => void;
    updatePurchase: (data: Purchase) => void;
    refreshPurchases: () => void;
    deposits: Deposit[];
    ledgers: UserLedger[];
    withdraws: Withdrawal[];
    comissions: UserLedger[];
    error: string | null;
    processCheckin: () => void;
    checkinData: Checkin.CheckinData | null;
    transactionsChart: {
        monthly: Chart.Transaction[];
        weekly: Chart.Transaction[];
    };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, ...props }: UserProviderProps) {
    const [settings, setSettings] = useState<Setting | null>(null);
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoadingSettings, setIsLoadingSettings] = useState(true);
    const [packages, setPackages] = useState<Package[]>([]);
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [ledgers, setLedgers] = useState<UserLedger[]>([]);
    const [withdraws, setWithdraws] = useState<Withdrawal[]>([]);
    const [comissions, setComissions] = useState<UserLedger[]>([]);
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [checkinData, setCheckin] = useState<Checkin.CheckinData | null>(
        null
    );
    const { isAuthenticated } = useAuth();
    const [transactionsChart, setTransactionChart] = useState<{
        monthly: Chart.Transaction[];
        weekly: Chart.Transaction[];
    }>({
        monthly: [],
        weekly: [],
    });

    const addPurchase = (data: Purchase) =>
        setPurchases((old) => [...old, data]);

    const refreshPurchases = async () => {
        const transactions = await listAllTransactionTypes();

        const { purchases } = transactions;

        setPurchases(purchases);
    };
    const updatePurchase = async (data: Purchase) => {
        if (!purchases) return;

        const updated = purchases.map((p) =>
            p.id === data.id ? { ...p, ...data } : p
        );

        setPurchases(updated);
    };

    const processCheckin = async () => {
        if (!isAuthenticated) return;
        try {
            setError(null);
            setIsLoadingSettings(true);
            const checkinData = await fetchProcessCheckin();

            if (user) {
                const userData: UserData = {
                    ...user,
                    profit_balance:
                        user?.profit_balance + checkinData.reward_amount,
                };

                setUser(userData);
            }

            const currentCheckin = await getCheckinStore();

            setCheckin(currentCheckin);

            // setCheckin(checkinData);
            toast.dismiss();
            toast.success("Check-in realizado com sucesso!");
        } catch (err) {
            setError("Erro ao realizar check-in");
            toast.dismiss();
            toast.error("Erro ao realizar check-in");
            console.error("Erro ao realizar check-in:", err);
        } finally {
            setIsLoadingSettings(false);
        }
    };

    const addBalance = (data: number) => {
        if (user) {
            setUser({ ...user, balance: user.balance + data });
        }
    };

    const subtractBalance = (data: number) => {
        if (user) {
            setUser({ ...user, balance: user.balance - data });
        }
    };

    const handleUpdateUser = (data: UserData) => setUser(data);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!isAuthenticated) return;

            try {
                setIsLoadingSettings(true);
                setError(null);

                const [setting, userData, packages, allTransactions] =
                    await Promise.all([
                        getThemeSetting(),
                        getUserData(),
                        fetchPackages(),
                        listAllTransactionTypes(),
                    ]);

                const checkinData = await getCheckinStore();

                console.log("Dados de checkin:", checkinData);

                setCheckin(checkinData);

                const {
                    deposits,
                    ledgers,
                    purchases,
                    withdraws,
                    transactions,
                    comissions,
                } = allTransactions;

                setDeposits(deposits);
                setWithdraws(withdraws);
                setComissions(comissions);
                setUser({
                    ...userData.user,
                });
                setSettings(setting);
                setPackages(packages);
                setPurchases(purchases);
                setLedgers(ledgers);
                setTransactionChart(transactions);
            } catch (err) {
                setError("Erro ao carregar dados do usuário");
                window.location.reload();
                toast.dismiss();
                toast.error("Erro ao carregar dados do usuário");
                console.error("Erro ao carregar dados:", err);
            } finally {
                setIsLoadingSettings(false);
            }
        };

        fetchUserData();
    }, [isAuthenticated]);

    const value = {
        settings,
        checkinData,
        isLoadingSettings,
        processCheckin,
        error,
        user,
        updateUser: handleUpdateUser,
        addBalance,
        subtractBalance,
        packages,
        purchases,
        addPurchase,
        refreshPurchases,
        updatePurchase,
        ledgers,
        withdraws,
        deposits,
        comissions,
        transactionsChart,
    };

    return (
        <UserContext.Provider {...props} value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
