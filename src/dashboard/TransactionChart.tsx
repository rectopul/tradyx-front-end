import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs";
import { useUser } from "@/contexts/UserProvider";
import { useTheme } from "@/lib/theme-provider";

export function TransactionChart() {
    const { transactionsChart } = useUser();
    const { theme } = useTheme();

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>Análise de Transações</CardTitle>
                <CardDescription>
                    Visão geral das suas atividades financeiras
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="monthly" className="w-full">
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="weekly">Semanal</TabsTrigger>
                            <TabsTrigger value="monthly">Mensal</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="monthly" className="mt-4">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={transactionsChart.monthly}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        stroke={
                                            theme === "dark"
                                                ? "#FFFFFF"
                                                : "#000000"
                                        }
                                        fontSize={12}
                                    />
                                    <YAxis
                                        stroke={
                                            theme === "dark"
                                                ? "#FFFFFF"
                                                : "#000000"
                                        }
                                        fontSize={12}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        formatter={(value) => [
                                            `$ ${value}`,
                                            undefined,
                                        ]}
                                        contentStyle={{
                                            backgroundColor:
                                                "var(--background)",
                                            borderColor: "var(--border)",
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="depositos"
                                        name="Depósitos"
                                        stroke="#10b981"
                                        activeDot={{ r: 8 }}
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="saques"
                                        name="Saques"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="investimentos"
                                        name="Investimentos"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="weekly" className="mt-4">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={transactionsChart.weekly}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        stroke={
                                            theme === "dark"
                                                ? "#FFFFFF"
                                                : "#000000"
                                        }
                                        fontSize={12}
                                    />
                                    <YAxis
                                        stroke={
                                            theme === "dark"
                                                ? "#FFFFFF"
                                                : "#000000"
                                        }
                                        fontSize={12}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        formatter={(value) => [
                                            `$ ${value}`,
                                            undefined,
                                        ]}
                                        contentStyle={{
                                            backgroundColor:
                                                "var(--background)",
                                            borderColor: "var(--border)",
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="depositos"
                                        name="Depósitos"
                                        stroke="#10b981"
                                        activeDot={{ r: 8 }}
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="saques"
                                        name="Saques"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="investimentos"
                                        name="Investimentos"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
