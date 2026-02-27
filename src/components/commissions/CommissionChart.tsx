import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { formatCurrency, formatMonth } from "../../utils/formatters";
import { MonthlyData } from "../../types/referral.types";

interface CommissionChartProps {
    monthlyData: MonthlyData[];
}

const CommissionChart: React.FC<CommissionChartProps> = ({ monthlyData }) => {
    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-md">
                    <p className="font-semibold text-slate-800">
                        {formatMonth(label)}
                    </p>
                    <p className="text-blue-600 font-medium">
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => {
                            const [year, month] = value.split("-");
                            return new Date(
                                parseInt(year),
                                parseInt(month) - 1
                            ).toLocaleDateString("pt-BR", { month: "short" });
                        }}
                        className="text-xs text-slate-500"
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) =>
                            formatCurrency(value).split(",")[0]
                        }
                        className="text-xs text-slate-500"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="total"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1500}
                        className="transition-all duration-300 hover:opacity-80"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CommissionChart;
