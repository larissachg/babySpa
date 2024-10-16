export const dynamic = 'force-dynamic'
import { getClients } from "@/actions/clients";
import { columns } from "./(components)/Columns";
import { DataTable } from "@/components/layout/DataTable";

export default async function ClientsPage() {
  const data = await getClients();

  return <DataTable data={data} columns={columns} inputSearch="NombreBebe"/>;
}
