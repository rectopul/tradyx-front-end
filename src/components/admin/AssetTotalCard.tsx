import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { TrendingUp, Eye } from "lucide-react";

// Dados para o gráfico de linha do Asset Total
const assetData = [
    { month: "Jan", value: 25000 },
    { month: "Feb", value: 22000 },
    { month: "Mar", value: 28000 },
    { month: "Apr", value: 30000 },
    { month: "May", value: 32000 },
    { month: "Jun", value: 32499 },
];

// Dados para o gráfico de membros
const membersData = [
    { name: "Alex Jo", value: 10, color: "#8B5CF6" },
    { name: "John Smith", value: 15, color: "#EC4899" },
    { name: "Jane Doe", value: 30, color: "#F59E0B" },
    { name: "Harry Doe", value: 5, color: "#3B82F6" },
    { name: "Mary Smith", value: 40, color: "#6366F1" },
];

interface AssetTotalCardProps {
    totalValue?: number;
    percentageChange?: number;
    className?: string;
}

interface MembersCardProps {
    members?: typeof membersData;
    className?: string;
}

const AssetTotalCard: React.FC<AssetTotalCardProps> = ({
    totalValue = 32499.93,
    percentageChange = 18.2,
    className = "",
}) => {
    return (
        <Card className={`w-full max-w-md ${className}`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Asset Total
                    </CardTitle>
                    <Eye className="h-4 w-4 text-gray-400" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900">
                        $
                        {totalValue.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                        })}
                    </div>
                </div>

                <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={assetData}>
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={false}
                            />
                            <YAxis hide />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#8B5CF6"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 4, fill: "#8B5CF6" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex items-center space-x-1 text-sm">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500 font-medium">
                        {percentageChange}%
                    </span>
                    <span className="text-gray-500">
                        Compared to last month
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

const MembersCard: React.FC<MembersCardProps> = ({
    members = membersData,
    className = "",
}) => {

    return (
        <Card className={`w-full max-w-md ${className}`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Members
                    </CardTitle>
                    <button className="text-xs text-blue-500 hover:text-blue-600">
                        See All
                    </button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={members}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={35}
                                    outerRadius={60}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {members.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-2">
                    {members.map((member, index) => (
                        <div
                            key={`${member.name}-${index}`}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: member.color }}
                                />
                                <span className="text-sm text-gray-700">
                                    {member.name}
                                </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                                {member.value}%
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export { AssetTotalCard, MembersCard };
