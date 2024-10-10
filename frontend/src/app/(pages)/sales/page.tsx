import { getSales } from "@/actions/sales";
import { SalesTable } from "./(components)/Sales";

export default async function SalesPage() {
  const data = await getSales();

  return <SalesTable data={data} />;
}
