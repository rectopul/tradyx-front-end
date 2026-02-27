import { Setting, UserData, Admin, Deposit } from "@/types";
import { createContext, useContext } from "react";
import { Package } from "@/components/admin/packages/columns";
import { ReferralConfig } from "@/types/admin/referral";
import { Purchase } from "@/types/purchase";

export interface AdminContextType {
    settings: Setting | null;
    updateSettings: (data: Setting) => void;
    admin: Admin.Data | null;
    customers: UserData[];
    updateCustomer: (data: UserData) => void;
    isLoadingSettings: boolean;
    error: string | null;
    deposits: Deposit[];
    updateDeposits: (data: Deposit[]) => void;
    investments: Purchase[];
    setInvestimentsList: (p: Purchase[]) => void;
    addInvestmentPackage: (p: Purchase) => void;
    updateInvestmentPackage: (p: Purchase) => void;
    deleteInvestmentPackage: (id: number) => void;
    packages: Package[];
    deletePackage: (id: number) => void;
    updatePackage: (p: Package) => void;
    addPackage: (p: Package) => void;
    referralConfigs: ReferralConfig[];
    addReferralConfig: (r: ReferralConfig) => void;
    deleteReferralConfig: (r: number) => void;
    isAuthenticated: boolean;
    login: (payload: { email: string; password: string }) => void;
    logout: () => void;
}

export const AdminContext = createContext<AdminContextType | undefined>(
    undefined
);

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context)
        throw new Error("useAdmin must be used within a AdminProvider");
    return context;
};
