import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserLedger } from "@/types";
import { columns } from "@/components/ComissionsTable/columns";
import { DataTable } from "@/components/ComissionsTable/data-table";

const CommissionList = ({ commissions }: { commissions: UserLedger[] }) => {
    // Filtra apenas as comissões
    const filteredCommissions = commissions.filter(
        (com) => com.reason === "commission"
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Histórico de Comissões</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={filteredCommissions} />
            </CardContent>
        </Card>
    );
};

export default CommissionList;
