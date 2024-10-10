import { getClients } from "@/actions/clients";
import { ClientsTable } from "./(components)/Clients";

export default async function ClientsPage() {
  const data = await getClients();

  return <ClientsTable data={data} />;
}
