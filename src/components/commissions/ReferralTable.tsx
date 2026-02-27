import React, { useState } from "react";
import { Referral } from "../../types/referral.types";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface ReferralTableProps {
    referrals: Referral[];
}

const ReferralTable: React.FC<ReferralTableProps> = ({ referrals }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<keyof Referral>("created_at");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

    const handleSort = (field: keyof Referral) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const sortedReferrals = [...referrals]
        .filter(
            (referral) =>
                referral.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                referral.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortField === "created_at") {
                return sortDirection === "asc"
                    ? new Date(a.created_at).getTime() -
                          new Date(b.created_at).getTime()
                    : new Date(b.created_at).getTime() -
                          new Date(a.created_at).getTime();
            }

            if (
                sortField === "investments_sum_amount" ||
                sortField === "commissions_sum_amount"
            ) {
                return sortDirection === "asc"
                    ? a[sortField] - b[sortField]
                    : b[sortField] - a[sortField];
            }

            const aValue = String(a[sortField]).toLowerCase();
            const bValue = String(b[sortField]).toLowerCase();

            return sortDirection === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });

    return (
        <div>
            <div className="p-4 border-b border-slate-200">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-700">
                    <thead className="text-xs text-slate-600 uppercase bg-slate-50">
                        <tr>
                            <th className="px-6 py-3">
                                <button
                                    className="font-medium flex items-center"
                                    onClick={() => handleSort("name")}
                                >
                                    Nome
                                    {sortField === "name" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="inline-block ml-1 w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="inline-block ml-1 w-4 h-4" />
                                        ))}
                                </button>
                            </th>
                            <th className="px-6 py-3">
                                <button
                                    className="font-medium flex items-center"
                                    onClick={() => handleSort("email")}
                                >
                                    Email
                                    {sortField === "email" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="inline-block ml-1 w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="inline-block ml-1 w-4 h-4" />
                                        ))}
                                </button>
                            </th>
                            <th className="px-6 py-3">
                                <button
                                    className="font-medium flex items-center"
                                    onClick={() => handleSort("created_at")}
                                >
                                    Data
                                    {sortField === "created_at" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="inline-block ml-1 w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="inline-block ml-1 w-4 h-4" />
                                        ))}
                                </button>
                            </th>
                            <th className="px-6 py-3">
                                <span className="font-medium">Status</span>
                            </th>
                            <th className="px-6 py-3">
                                <button
                                    className="font-medium flex items-center"
                                    onClick={() =>
                                        handleSort("commissions_sum_amount")
                                    }
                                >
                                    Comissão
                                    {sortField === "commissions_sum_amount" &&
                                        (sortDirection === "asc" ? (
                                            <ChevronUp className="inline-block ml-1 w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="inline-block ml-1 w-4 h-4" />
                                        ))}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReferrals.length > 0 ? (
                            sortedReferrals.map((referral) => (
                                <tr
                                    key={referral.id}
                                    className="bg-white border-b hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-medium">
                                                {referral.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-800">
                                                    {referral.name}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    Nível {referral.level}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {referral.email}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {formatDate(referral.created_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {referral.investor === 1 ? (
                                            <span className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                Investidor
                                            </span>
                                        ) : referral.active_member === 1 ? (
                                            <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                Ativo
                                            </span>
                                        ) : (
                                            <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                Registrado
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-emerald-600">
                                        {formatCurrency(
                                            referral.commissions_sum_amount
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-10 text-center text-slate-500"
                                >
                                    {searchTerm ? (
                                        <>
                                            <div className="text-lg mb-1">
                                                Nenhum resultado encontrado
                                            </div>
                                            <div className="text-sm">
                                                Tente buscar por outro termo
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-lg mb-1">
                                                Sem indicados ainda
                                            </div>
                                            <div className="text-sm">
                                                Compartilhe seu link de
                                                referência para começar!
                                            </div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReferralTable;
