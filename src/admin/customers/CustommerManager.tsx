import { CustomerDataTable } from "./data-table";
import { column } from "./columns";
import { useAdmin } from "@/contexts/admin/admin-context";

export function CustomersManager() {
    const { customers } = useAdmin();

    return <CustomerDataTable columns={column} data={customers} />;
}
